function goTranslate(id_elemento) {
    var arquivoAtual = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1).toLocaleLowerCase();
    if (arquivoAtual == "index.html" || arquivoAtual == "index.aspx" || arquivoAtual == "" || arquivoAtual == "home") {
        goToAnchor(id_elemento);
        $(".menu-mobile-button.aberto").click();
    }
    else {
        Cookies.set('anchor', id_elemento);
        if (location.href.indexOf(".aspx") >= 0) {
            window.location.href = location.href.replace(location.href.substring(location.href.lastIndexOf("/"), location.href.length), "") + "/index.aspx";
        }
        else if (location.href.indexOf(".html") >= 0) {
            window.location.href = location.href.replace(location.href.substring(location.href.lastIndexOf("/"), location.href.length), "") + "/index.html";
        }
        else {
            window.location.href = location.href.replace(location.href.substring(location.href.lastIndexOf("/"), location.href.length), "") + "/";
        }
    }
}

function goToAnchor(id_elemento) {
    $('html,body').animate({ scrollTop: ($(id_elemento).offset().top - $('.navbar').height()) }, 'slow');
}
$(function () {
    // MENU DESKTOP
    $('.nav-item.dropdown').each(function () {
        $(this).hover(() => { $(this).find('> .dropdown-menu').show() })
        $(this).mouseleave(() => { $(this).find('> .dropdown-menu').hide() })
    });

    // MENU MOBILE
    $('#nbm-03 .nbm-03-menu').click(() => {
        $('.nav-side').toggleClass('open');
        $('.nbm-03-menu i').toggleClass('fa-bars fa-arrow-right');
        $('.nbm-03-menu').toggleClass('open');
    });
    /*$('.nav-side .nav-link').each(function () {
        $(this).click(function () {
            $(this).next('.submenu').toggle();
            $(this).toggleClass('active');
        });
    });*/
	$(".navbar-menu .nav-item").click(function(){
		$(this).find(".submenu").slideToggle();
	});
    $('#nbm-03 .nbm-03-options').click(() => {
        $('.nbm-03-options').toggleClass('open');
        $('.nbm-03-nav-options').toggleClass('open');
    })

    $('#nbm-02 .search-dropdown i').click(() => {
        window.location.href = 'Pesquisa.aspx?pesquisa=' + $('#nbm-02 .search-dropdown input').val();
    })

    $('#nbm-02 .search-dropdown input').keydown((e) => {
        if (e.keyCode == 13) {
            window.location.href = 'Pesquisa.aspx?pesquisa=' + $('#nbm-02 .search-dropdown input').val();
        }
    })

    $(window).scroll(function () {
        if (window.scrollY >= $('#nm-01').height() + 20) {
            if ($('#form-layer').length > 0) {
                $('#nm-01').css('margin-bottom', $('#nbm-02').height() + 'px')
            } else {
                $('#nm-01').css('margin-bottom', $('#nbm-02').height() + 24 + 'px')
            }
            $('#nbm-02').css('position', 'fixed')
        } else {
            $('#nm-01').css('margin-bottom', '0px')
            $('#nbm-02').css('position', 'relative')
        }
    })

})