(function () {
    // Load the script
    var script;
    script = document.createElement("SCRIPT");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
    script.type = 'text/javascript';
    if (document.querySelector('script[src*="importForm_c2.js"]').getAttribute('src').indexOf('v=1.12.4') > -1) {
        script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js'
    }
    document.getElementsByTagName("head")[0].appendChild(script);
    script.onload = function () {
        var $ = window.jQuery;
        InnitializeVersion();
        $.when(
            InnitializeForm()
        ).done(function () {
            setTimeout(function () {
                innitializeEvents();
            }, 3000);
        });
    };
})();

function InnitializeVersion() {
    var sciptMask = document.createElement("SCRIPT");
    sciptMask.src = "https://www.2net.com.br/Scripts/jquery.mask.js";
    sciptMask.type = 'text/javascript';
    document.getElementsByTagName("head")[0].appendChild(sciptMask);
    return;
    var parametros = $("[src*='importForm_c2.js']").attr("src").split("?")[1].split("&");
    for (var i = 0; i < parametros.length; i++) {
        var item = parametros[i].toLowerCase().split("=");
        if (item[0] == "bs") {
            if (item[1] == "v3") {
                var linkCSS_Bootstrap = document.createElement("LINK");
                linkCSS_Bootstrap.rel = "stylesheet";
                linkCSS_Bootstrap.href = "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css";
                document.getElementsByTagName("head")[0].appendChild(linkCSS_Bootstrap);

                var scriptJS_Bootstrap = document.createElement("SCRIPT");
                scriptJS_Bootstrap.src = "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"
                document.getElementsByTagName("head")[0].appendChild(scriptJS_Bootstrap);
            }
            if (item[1] == "v4") {
                var linkCSS_Bootstrap = document.createElement("LINK");
                linkCSS_Bootstrap.rel = "stylesheet";
                linkCSS_Bootstrap.href = "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css";
                document.getElementsByTagName("head")[0].appendChild(linkCSS_Bootstrap);

                var scriptJS_Pooper = document.createElement("SCRIPT");
                scriptJS_Pooper.src = "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js";
                document.getElementsByTagName("head")[0].appendChild(scriptJS_Pooper);

                var scriptJS_Bootstrap = document.createElement("SCRIPT");
                scriptJS_Bootstrap.src = "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
                document.getElementsByTagName("head")[0].appendChild(scriptJS_Bootstrap);
            }
        }
    }
}

function innitializeEvents() {
    $(document).ready(function () {
        document.getElementsByTagName("head")[0].insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"https://2net.com.br/Sistema/Formularios/importFormCSS.css\" />");
        //document.getElementsByTagName("head")[0].insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"http://localhost:55329/Sistema/Formularios/importFormCSS.css\" />");

        $('.item_formulario div[data-type="1"] .form-control').mask('00/00/0000');
        $('.item_formulario div[data-type="2"] .form-control').mask('00:00:00');
        $('.item_formulario div[data-type="3"] .form-control').mask('00/00/0000 00:00:00');
        $('.item_formulario div[data-type="4"] .form-control').mask('00000-000');
        $('.item_formulario div[data-type="5"] .form-control').mask('000.000.000-00', { reverse: true });
        //$('.item_formulario div[data-type="6"] .form-control').mask('00.000.000/0000-00', { reverse: true });
		$('.item_formulario div[data-type="6"] .form-control').mask("SS.SSS.SSS/SSSS-00", { translation: { 'S': { pattern: /[A-Za-z0-9]/ } } });

        $('.item_formulario div[data-type="6"] .form-control').on('input', function () {
            this.value = this.value.toUpperCase();
        });
		
		
        var maskBehavior = function (val) { return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009'; },
            options = { onKeyPress: function (val, e, field, options) { field.mask(maskBehavior.apply({}, arguments), options); } };
        $('.item_formulario div[data-type="7"] .form-control').mask(maskBehavior, options);
        $('.item_formulario div[data-type="8"] .form-control').mask('0ZZ.0ZZ.0ZZ.0ZZ', { translation: { 'Z': { pattern: /[0-9]/, optional: true } } });
        $('.item_formulario div[data-type="10"]').each(function () {
            var mask = $(this).data('custommask');
            if (mask && mask != '')
                $(this).find('.form-control').mask(mask);
        });
        $('.item_formulario div[data-type="11"] .form-control').mask('00000000000000000');
        $('.item_formulario div[data-type="12"] .form-control').mask("#.##0,00", { reverse: true });

        $('.modal-politicas--close').click(() => {
            $('.modal-politicas--layer').hide();
            $('.modal-politicas').removeClass('show');
        });
        $('a[data-modal]').click(function () {
            $('div[data-modal-target="' + $(this).data('modal') + '"]').show();
            $('.modal-politicas').addClass('show');
        });
    });
    $(".col-verification").each(function () {
        $(this).find(".verificationQuestion").data("val-1", (Math.random() * 10).toFixed());
        $(this).find(".verificationQuestion").data("val-2", (Math.random() * 10).toFixed());
        $(this).find(".verificationQuestion").text($(this).find(".verificationQuestion").data("val-1") + " + " + $(this).find(".verificationQuestion").data("val-2"));
    });
}

function InnitializeForm() {
    $(".form-importer").each(function () {
        if (typeof $(this).attr("idf") == "undefined" || typeof $(this).attr("iit") == "undefined") {
            $(this).html("erro no carregamento, confira os parâmetros!");
        } else {
            var idf = $(this).attr("idf");
            var iit = $(this).attr("iit");
            RequestFormulario($(this), idf, iit);
        }
    });
}

function RequestFormulario(elem, f, s) {
    $.ajax({
        //url: "http://localhost:55329/Sistema/Formularios/HandlerCamposFormularios.ashx",
        url: "https://2net.com.br/Sistema/Formularios/HandlerCamposFormularios.ashx",
        data: { idf: f, iit: s }, success: function (result) {
            elem.html(result);
        }
    });
}

function InnitializeEvents() {
    $('.item_formulario div[data-type="1"] .form-control').mask('00/00/0000');
    $('.item_formulario div[data-type="2"] .form-control').mask('00:00:00');
    $('.item_formulario div[data-type="3"] .form-control').mask('00/00/0000 00:00:00');
    $('.item_formulario div[data-type="4"] .form-control').mask('00000-000');
    $('.item_formulario div[data-type="5"] .form-control').mask('000.000.000-00', { reverse: true });
    $('.item_formulario div[data-type="6"] .form-control').mask('00.000.000/0000-00', { reverse: true });
    var maskBehavior = function (val) { return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009'; },
        options = { onKeyPress: function (val, e, field, options) { field.mask(maskBehavior.apply({}, arguments), options); } };
    $('.item_formulario div[data-type="7"] .form-control').mask(maskBehavior, options);
    $('.item_formulario div[data-type="8"] .form-control').mask('0ZZ.0ZZ.0ZZ.0ZZ', { translation: { 'Z': { pattern: /[0-9]/, optional: true } } });
    $('.item_formulario div[data-type="10"]').each(function () {
        var mask = $(this).data('custommask');
        if (mask && mask != '')
            $(this).find('.form-control').mask(mask);
    });
    $('.item_formulario div[data-type="11"] .form-control').mask('00000000000000000');
}

function formatArquivo(arquivo) {
    while (arquivo.indexOf("-") >= 0) {
        arquivo = arquivo.replace("-", "_");
    }
    while (arquivo.indexOf(" ") >= 0) {
        arquivo = arquivo.replace(" ", "__");
    }
    return arquivo;
}

function enviarFormularioIncorporado(element) {
    var mensagem = '';
    //Só continuar se os campos obrigatórios foram preenchidos
    if (this.verificarCamposObrigatorios(element)) {
        $(element).closest('.container_formulario').find('.item_formulario').each(function () {
            var id = $(this).find('div').data('id');
            if (typeof id == "undefined") {
                id = $(this).find('h3').data('id');
            }
            var titulo = $(this).find('label').text();
            var valor = "";
            if ($(this).find('input:checkbox').length > 0) {
                valor = ($(this).find('input:checkbox').attr('checked') || $(this).find('input:checkbox').prop('checked')) ? 'Sim' : 'Não';
            }
            else if ($(this).find('.form-control').length > 0) {
                valor = $.trim($(this).find('.form-control').val());
            }
            else if ($(this).find('input[type=file]').length > 0) {
                var container = $(this);

                container.find('.list-group-item').each(function (count_media) {

                    var index = parseInt($(this).data('index'), 10);
                    console.log(files, index, files[index]);

                    if (!files || !files[index]) return;

                    var file = files[index];

                    if (!file.uploadComplete) return;

                    if (valor.length > 0) valor += " ";
                    valor +=
                        "https://c2tiapps.com/Repositorio/Uploads/" +
                        $(element).closest('.container_formulario').find(".id_formulario").val() + "/" +
                        container.children("div").data("id") + "/" +
                        formatArquivo($(this).find('.col-xs-6').text());
                });
            }
            else if ($(this).find('h3').length > 0) {
                valor = $(this).find('h3').text();
            }
            mensagem += (id + '- ' + encodeURIComponent(valor) + ' ;');
        });

        while (mensagem.indexOf("&") > -1) {
            mensagem = mensagem.replace("&", "#ecom#");
        }

        $(element).closest('.container_formulario').find('.item_formulario').find('.form-control').css('border-color', '');
        $(element).closest('.container_formulario').find('.item_formulario .checkbox > label').css('border', '');
        var nomeFormulario = $(element).closest('.container_formulario').find('.titulo_formulario').val();
        var emailDestino = $(element).closest('.container_formulario').find('.emailDestino_formulario').val();
        var logo = $(element).closest('.container_formulario').find('.logo_formulario').val();
        var idSite = $(element).closest('.container_formulario').find('.emp_formulario').val();
        var idFomulario = $(element).closest('.container_formulario').find(".id_formulario").val();
        var parametroX = $(element).closest('.container_formulario').find(".parametroX_formulario").val();
        var url =
            ("https://2net.com.br/Email/SendEmail.aspx?enviar_formulario=T"
                + "&titulo_formulario=" + (nomeFormulario)
                + "&mensagem_formulario=" + (mensagem)
                + "&email_destino=" + (emailDestino)
                + "&idSite=" + (idSite)
                + "&idFormulario=" + (idFomulario)
                + "&logo=" + (logo)
                + "&parametroX=" + (parametroX)
                + "&urlRefer=" + (window.location.origin + window.location.pathname));
        console.log(url);

        if (typeof GoogleAds_HashFormularios != "undefined" && GoogleAds_HashFormularios.length > 0) {
            GoogleAds_gtag_report_conversion(url, GoogleAds_HashFormularios)
        } else {
            window.location.href = url;
        }

    } else {
        alert('Preencha os campos obrigatórios corretamente!');
    }
}

function verificarCamposObrigatorios(element) {
    var retorno = true;
    var primeiroCampoNaoPreenchido = null;
    $(element).closest('.container_formulario').find('.item_formulario div[data-obrigatorio="1"]').each(function () {
        var preenchido = true;
        var campo = null;
        //checkbox
        if ($(this).hasClass('checkbox')) {
            preenchido = $(this).find('input:checkbox').attr('checked') || $(this).find('input:checkbox').prop('checked');
            if (!preenchido) {
                campo = $(this).find('label').first();
                campo.css('border', '1px solid red');
                retorno = false;
            } else {
                $(this).find('label').first().css('border', '')
            }
        }
        //Campos de formulário (text,textarea,drodown)
        else if ($(this).find('.form-control').length > 0) {
            var valor = $.trim($(this).find('.form-control').val());
            var preenchido = (valor && $.trim(valor) != '');
            preenchido = $(this).attr('data-type') == "7" ? $(this).find('.form-control').val().length > 13 : preenchido;

            if (!preenchido) {
                campo = $(this).find('.form-control');
                campo.css('border-color', 'red');
                retorno = false;
            } else {
                $(this).find('.form-control').css('border-color', '');
            }
        }
        //Upload
        else if ($(this).find('input[type=file]').length > 0) {
            if (!isFileUploaded($(this).find('.div_upload'))) {
                campo = $(this).find('label').first();
                campo.css('border', '1px solid red');
                retorno = false;
            } else {
                $(this).find('label').first().css('border', '');
            }
        }
        else if ($(this).find('.checkBox')) {
            preenchido = $(this).find('input:checkbox').attr('checked') || $(this).find('input:checkbox').prop('checked');
            if (!preenchido) {
                campo = $(this).find('label').first();
                campo.css('border', '1px solid red');
                retorno = false;
            } else {
                $(this).find('label').first().css('border', '')
            }
        }
        //Se não foi preenchido corretamente
        if (!preenchido && primeiroCampoNaoPreenchido == null) {
            primeiroCampoNaoPreenchido = campo;
            campo.focus();
        }
    });

    //Campos de e-mail
    $(element).closest('.container_formulario').find('.item_formulario div[data-type="9"] .form-control').each(function () {
        var valor = $.trim($(this).val());
        if ((valor && $.trim(valor) != '' && !isEmail(valor))) {
            $(this).css('border-color', 'red');
            if (primeiroCampoNaoPreenchido == null) {
                primeiroCampoNaoPreenchido = $(this);
                $(this).focus();
                retorno = false;
            }
        }
    });

    if (retorno && (($(element).closest('.container_formulario').find(".verificationQuestion").data("val-1") * 1) + ($(element).closest('.container_formulario').find(".verificationQuestion").data("val-2") * 1)) != $(element).closest('.container_formulario').find(".verificationInput").val() * 1) {
        alert("Verificação de robô inválida");
        retorno = false;
        $(element).closest('.container_formulario').find(".verificationInput").focus();
    }


    return retorno;
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

var files = []; // Lista global de arquivos
var uploadRequests = []; // Lista global para controlar uploads ativos
var tamanhoTotalUpload = 0;
var bytesProcessados = 0;
var reenviarArquivos = true;

function openFileUpload(element) {
    $(element).closest('.div_upload').find('input[type=file]').trigger('click');
}

function prepareUpload(element, event) {
    for (let i = 0; i < event.target.files.length; i++) {
        adicionarArquivo(event.target.files[i], element);
    }
    refreshCountArquivos(element);
}

function refreshCountArquivos(element) {
    const divUpload = $(element).closest('.div_upload');
    const fileContainer = divUpload.find('.file_container .list-group-item:visible');
    const qtd = fileContainer.length;

    // Atualiza o texto do contador
    const texto = qtd === 0 ? '' : qtd === 1 ? '1 arquivo' : `${qtd} arquivos`;
    divUpload.find('.count_arquivos').text(texto);

    // Referências aos botões
    const btnUpload = divUpload.find('.btn_realizar_upload');
    const btnLimpar = divUpload.find('.btn_limpar_lista');

    // Desabilita os botões por padrão
    btnUpload.prop('disabled', true);
    btnLimpar.prop('disabled', true);

    if (qtd > 0) {
        btnUpload.prop('disabled', false);

        if (isAnyRequestInProgress()) {
            // Caso uploads estejam em progresso
            btnUpload.find('i').removeClass('fa-upload').addClass('fa-refresh fa-spin');
            btnUpload.find('span').text('aguarde...');
        } else {
            // Caso não haja uploads em progresso
            btnUpload.find('i').removeClass('fa-refresh fa-spin').addClass('fa-upload');
            btnUpload.find('span').text('Realizar upload');
            btnLimpar.prop('disabled', false);

            if (isExistsFileToProcess(element)) {
                btnUpload.prop('disabled', false);
            }
        }
    }
}

function adicionarArquivo(arquivo, element) {
    const divUpload = $(element).closest('.div_upload');
    const uploadSingle = divUpload.data('upload-type') === 'single';
    const extensoes = divUpload.data('upload-extension');

    // Validação de extensão
    if (extensoes) {
        const extensoesPermitidas = extensoes.split(',');
        const extensaoArquivo = arquivo.name.toLowerCase().split('.').pop();
        if (!extensoesPermitidas.includes(extensaoArquivo)) {
            alert(`Apenas arquivos ${extensoesPermitidas.join(', ')} são permitidos.`);
            return;
        }
    }

    // Validação de tamanho
    if (arquivo.size > 20 * 1024 * 1024) { // 20MB
        alert('O tamanho do arquivo excede o limite de 20MB.');
        return;
    }

    // Limpar arquivos caso seja upload único
    if (uploadSingle) {
        clearUploadFiles(element);
    }

    // Adicionar arquivo à lista
    const index = files.length;
    files.push(arquivo);

    // Atualizar a interface
    const fileContainer = divUpload.find('.file_container');
    const novoItem = `
        <a class="list-group-item" data-index="${index}">
            <div class="row align-items-center">
                <div class="col-xs-6 col-sm-6">${arquivo.name}</div>
                <div class="col-xs-3 col-sm-3"><span class="badge_file_upload">${(arquivo.size / 1024).toFixed(2)} KB</span></div>
                <div class="col-xs-3 col-sm-3 text-end">
                    <button type="button" class="btn btn-danger btn-sm btn_excluir" onclick="removerArquivo(${index}, this)">Remover</button>
                </div>
            </div>
            <div class='progress'>
                <div role='progressbar' style='width:20%' class='progress-bar progress-bar-primary'></div>
            </div>
        </a>`;
    fileContainer.append(novoItem);

    refreshCountArquivos(element);
}

function removerArquivo(index, button) {
    //Removendo da fila de requests
    if (uploadRequests.length > index) {
        uploadRequests[index].abort();
        uploadRequests.splice(index, 1);
    }
    //Removendo da fila de arquivos
    files.splice(index, 1);

    $(button).closest('.list-group-item').hide('fade', function () {
        $(this).remove();
        refreshCountArquivos(button);
    });
}

function getTamanhoFormatadoArquivo(tamanhoBytes) {
    var aux = 'bytes';
    while (tamanhoBytes > 1024) {
        tamanhoBytes = (tamanhoBytes / 1024);
        if (aux == 'bytes')
            aux = 'KB';
        else if (aux == 'KB')
            aux = 'MB';
        else if (aux == 'MB')
            aux = 'GB';
        else if (aux == 'GB')
            aux = 'TB';
    }
    return tamanhoBytes.toFixed(2) + ' ' + aux;
}

function clearUploadFiles(element) {
    $(element).closest('.div_upload').find('.list-group-item .btn_excluir').each(function () {
        $(this).trigger('click');
    });
}

function adicionarErro(element, erro) {
    $(element).find('.informacao_complementar').remove();
    $(`<span class="btn btn-warning btn-xs informacao_complementar"><i class="fa fa-warning"></i></span>`).insertBefore(element.find('.row .col-xs-4 .btn_excluir'));
    $(element).find('.informacao_complementar').attr('title', erro);
    $(element).find('.informacao_complementar').click(function () { alert(erro) });
}

function adicionarSucesso(element) {
    $(element).find('.informacao_complementar').remove();
    $(`<span style="color:#52ab52" class="informacao_complementar"><i class="fa fa-check"></i></span>`).insertBefore(element.find('.row .col-xs-4 .btn_excluir'));
    $(element).find('.informacao_complementar').attr('title', 'Upload realizado com sucesso!');
}

function isAnyRequestInProgress() {
    for (indexRequest = 0; indexRequest < uploadRequests.length; indexRequest++)
        if (uploadRequests[indexRequest].readyState == 1) {
            return true;
            break;
        }
    return false;
}

function isAllFilesUploaded(element) {
    if (files.length < 1 || $(element).closest('.div_upload').find('.list-group-item').length < 1)
        return false;

    $(element).closest('.div_upload').find('.list-group-item').each(function () {
        var index = eval($(this).data('index'));
        if (files[index] && !files[index].uploadComplete) {
            return false;
        }
    });
    return true;
}

function isFileUploaded(div_upload) {
    if (files.length < 1 || $(div_upload).find('.list-group-item').length < 1)
        return false;

    var retorno = false;
    $(div_upload).find('.list-group-item').each(function () {
        var index = eval($(this).data('index'));
        if (files[index] && files[index].uploadComplete) {
            retorno = true;
            return false;
        }
    });
    return retorno;
}

function isExistsFileToProcess(element) {
    if (files.length < 1 || $(element).closest('.div_upload').find('.list-group-item').length < 1) {
        return false;
    }
    var retorno = false;
    $(element).closest('.div_upload').find('.list-group-item').each(function () {
        var index = $(this).data('index');
        if (files[index] && !files[index].processada) {
            retorno = true;
            return false;
        }
    });
    return retorno;
}

function uploadFiles(element) {
    $(element).closest('.div_upload').find('.btn_realizar_upload').prop('disabled', true);
    $(element).closest('.div_upload').find('.btn_realizar_upload i').removeClass('fa-upload').addClass('fa-refresh fa-spin');
    $(element).closest('.div_upload').find('.btn_limpar_lista').prop('disabled', true);

    console.log("1 - Inicio do laço de itens para upload");
    $(element).closest('.div_upload').find('.list-group-item').each(function () {
        console.log("Inicio de um item");
        var index = $(this).data('index');
        console.log(index);
        if (files[index]) {
            console.log("Acessou o if");
            enviarArquivo($(this), index);
        }
        console.log("Final de um item");
    });
    console.log("2 - Fim do laço de itens para upload");
}

function enviarArquivo(element, index) {
    console.log("Inicio do Processo de Envio");
    var idFomulario = $(element).closest('.container_formulario').find('.id_formulario').val();
    var fileToUpload = files[index];
    if (fileToUpload.uploadComplete)
        return;
    var domElement = $(element);
    var progressBar = domElement.find('.progress-bar');
    $(domElement).find('.btn_excluir').prop('disabled', true);
    
    progressBar.css('width', '0%');
    progressBar.removeClass('progress-bar-success').removeClass('progress-bar-danger').addClass('progress-bar-primary');
    var tamanhoTotalArquivo = fileToUpload.size;
    var data = new FormData();
    data.append('file-' + index, fileToUpload);
    data.append('formulario', idFomulario);
    data.append('campo', domElement.closest('form').attr('idcampo'));
    //Enviando
    var request = jQuery.ajax({
        url: 'https://c2tiapps.com/sites/UploadArquivo.ashx',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        crossDomain: true,
        type: 'POST',
        xhr: function () {
            //Progresso do upload
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) {
                myXhr.upload.addEventListener('progress', function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = ((evt.loaded / evt.total) * 100).toFixed(1) + '%';
                        progressBar.css('width', percentComplete);
                        progressBar.html(percentComplete);
                    }
                }, false);
            }
            return myXhr;
        },
        beforeSend: function () {
            domElement.find('.progress').show();
            console.log("Exibindo a barra de Progress");
        },
        success: function (data, textStatus, jqXHR) {
            $(element).find('.col-xs-6').text(data);
            fileToUpload.processada = true;
            fileToUpload.uploadComplete = true;
            progressBar.css('width', '100%');
            progressBar.html('100%');
            progressBar.removeClass('progress-bar-primary').addClass('progress-bar-success bg-success');
            adicionarSucesso(domElement);
            refreshCountArquivos(domElement);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            fileToUpload.processada = true;
            fileToUpload.uploadComplete = false;
            var erro = thrownError;
            if (xhr && xhr.responseText)
                erro = xhr.responseText;
            progressBar.css('width', '100%');
            progressBar.removeClass('progress-bar-primary').addClass('progress-bar-danger bg-danger');
            adicionarErro(domElement, erro);
            refreshCountArquivos(domElement);
        },
        timeout: function () {
            fileToUpload.processada = true;
            fileToUpload.uploadComplete = false;
            progressBar.removeClass('progress-bar-primary').addClass('progress-bar-danger bg-danger');
            adicionarErro(domElement, 'Limite de tempo para upload atingido, tente novamente!');
            refreshCountArquivos(domElement);
        }
    });
    uploadRequests[uploadRequests.length] = request;
    refreshCountArquivos(domElement);
}
