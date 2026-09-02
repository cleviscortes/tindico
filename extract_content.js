const fs = require('fs');
const cheerio = require('cheerio');
const TurndownService = require('turndown');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Remove garbage tags
$('script, style, noscript, input[type="hidden"], iframe, svg, jdiv').remove();

// Clean up specific CMS hidden panels
$('#denuncia-modal-overlay').remove();
$('#whats_flutuante').remove();
$('.traducao').remove();

// Extract the Menu
let mdContent = "# Estrutura do Site Original (Clube Tindico)\\n\\n";
mdContent += "## 1. Menu Principal\\n";
$('.navbar-nav .nav-item').each((i, el) => {
    const link = $(el).find('a, span.nav-link');
    const text = link.text().trim();
    const href = link.attr('href') || link.attr('onclick') || '#';
    mdContent += `- **${text}**: Aponta para \`${href}\`\n`;
});
const loginBtn = $('.btn_cta_topo');
if (loginBtn.length) {
    mdContent += `- **Botão Login (${loginBtn.text().trim()})**: Aponta para \`${loginBtn.attr('href')}\`\n`;
}
mdContent += "\\n---\\n\\n";

// We can just use Turndown for the rest of the body, but let's break it by sections if possible.
// Or just let Turndown do the entire body.
const turndownService = new TurndownService({
    headingStyle: 'atx',
    bulletListMarker: '-'
});

// Remove nav from body since we already parsed it manually
$('nav').remove();

const cleanBodyHtml = $('body').html();
let markdownBody = turndownService.turndown(cleanBodyHtml);

// Clean up excess empty lines
markdownBody = markdownBody.replace(/\\n{3,}/g, '\\n\\n');

mdContent += "## 2. Conteúdo da Página\\n\\n";
mdContent += markdownBody;

fs.writeFileSync('conteudo_original.md', mdContent);
console.log('Markdown extraction completed.');
