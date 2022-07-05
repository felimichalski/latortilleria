$(document).ready(function(){

    // Show email message
    if($('.email-success-message')) {
        if($('#email').text() == 'El mail ha sido verificado correctamente') {
            $(".email-success-msg").css('visibility', 'visible');
            $(".email-success-msg").css('color', 'black');
            $(".email-success-msg").css('background', 'rgba(92, 184, 92, .8)');
            setTimeout(() => {
                $(".email-success-msg").css('visibility', 'hidden');
                $(".email-success-msg").css('color', 'transparent');
                $(".email-success-msg").css('background', '');
            }, 2000)
        } else {
            $(".email-success-msg").css('visibility', 'visible');
            $(".email-success-msg").css('color', 'black');
            $(".email-success-msg").css('background', 'rgba(217, 83, 79, .8)');
            setTimeout(() => {
                $(".email-success-msg").css('visibility', 'hidden');
                $(".email-success-msg").css('color', 'transparent');
                $(".email-success-msg").css('background', '');
            }, 2000)
        }
    }

    // Check the device
    mobileAndTabletCheck = function() {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };

    // Owl Carousel configuration
    $(".title-background").owlCarousel({
        items: 1,
        loop: true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        freeDrag: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplaySpeed: 100,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut'
    });

    $(".featured-carousel").owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000
    });


    // Circle title effect
    new CircleType(document.querySelector('#title')).radius(1000);

    // Nav items scroll
    $("#btn-home, #s-btn-home").click(() => {
        if(mobileAndTabletCheck()) {
            $('.sidebar').removeClass('show');
            $('.sidebar-overlay').css('visibility', 'hidden');
            $('.sidebar-overlay').css('background', '');
            $('.open-sidebar-btn').css('display', '');
        }
        $('html, body').animate({
            scrollTop: $("section.title").offset().top
        }, 1200, 'easeOutQuint');
        $('html, body').on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
            $('html, body').stop();
        });
    });

    $("#btn-us, #s-btn-us").click(() => {
        if(mobileAndTabletCheck()) {
            $('.sidebar').removeClass('show');
            $('.sidebar-overlay').css('visibility', 'hidden');
            $('.sidebar-overlay').css('background', '');
            $('.open-sidebar-btn').css('display', '');
        }
        $('html, body').animate({
            scrollTop: $("section.about-us").offset().top
        }, 1200, 'easeOutQuint');
        $('html, body').on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
            $('html, body').stop();
        });
    });

    $("#btn-menu, #s-btn-menu").click(() => {
        if(mobileAndTabletCheck()) {
            $('.sidebar').removeClass('show');
            $('.sidebar-overlay').css('visibility', 'hidden');
            $('.sidebar-overlay').css('background', '');
            $('.open-sidebar-btn').css('display', '');
        }
        $('html, body').animate({
            scrollTop: $("section.menu").offset().top
        }, 1200, 'easeOutQuint');
        $('html, body').on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
            $('html, body').stop();
        });
    });

    $("#btn-featured, #s-btn-featured").click(() => {
        if(mobileAndTabletCheck()) {
            $('.sidebar').removeClass('show');
            $('.sidebar-overlay').css('visibility', 'hidden');
            $('.sidebar-overlay').css('background', '');
            $('.open-sidebar-btn').css('display', '');
        }
        $('html, body').animate({
            scrollTop: $("section.featured").offset().top
        }, 1200, 'easeOutQuint');
        $('html, body').on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
            $('html, body').stop();
        });
    });
    
    $("#btn-gallery, #s-btn-gallery").click(() => {
        if(mobileAndTabletCheck()) {
            $('.sidebar').removeClass('show');
            $('.sidebar-overlay').css('visibility', 'hidden');
            $('.sidebar-overlay').css('background', '');
            $('.open-sidebar-btn').css('display', '');
        }
        $('html, body').animate({
            scrollTop: $("section.gallery").offset().top
        }, 1200, 'easeOutQuint');
        $('html, body').on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
            $('html, body').stop();
        });
    });

    $("#btn-location, #s-btn-location").click(() => {
        if(mobileAndTabletCheck()) {
            $('.sidebar').removeClass('show');
            $('.sidebar-overlay').css('visibility', 'hidden');
            $('.sidebar-overlay').css('background', '');
            $('.open-sidebar-btn').css('display', '');
        }
        $('html, body').animate({
            scrollTop: $("section.location").offset().top
        }, 1200, 'easeOutQuint');
        $('html, body').on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
            $('html, body').stop();
        });
    });
    
    $("#btn-contact, #s-btn-contact").click(() => {
        if(mobileAndTabletCheck()) {
            $('.sidebar').removeClass('show');
            $('.sidebar-overlay').css('visibility', 'hidden');
            $('.sidebar-overlay').css('background', '');
            $('.open-sidebar-btn').css('display', '');
        }
        $('html, body').animate({
            scrollTop: $("section.contact").offset().top
        }, 1200, 'easeOutQuint');
        $('html, body').on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
            $('html, body').stop();
        });
    });

    // Change gallery images
    $('.pagination .item').click((e) => {
        $('.pagination').find('.active').removeClass('active');
        e.target.classList.add('active');
        switch(e.target.textContent) {
            case '1':
                $('#gallery-1').attr('href', 'img/gallery/1.webp');
                $('#gallery-1 img').attr('src', 'img/gallery/preview/1.webp');
                $('#gallery-2').attr('href', 'img/gallery/2.webp');
                $('#gallery-2 img').attr('src', 'img/gallery/preview/2.webp');
                $('#gallery-3').attr('href', 'img/gallery/3.webp');
                $('#gallery-3 img').attr('src', 'img/gallery/preview/3.webp');
                $('#gallery-4').attr('href', 'img/gallery/4.webp');
                $('#gallery-4 img').attr('src', 'img/gallery/preview/4.webp');
                $('#gallery-5').attr('href', 'img/gallery/5.webp');
                $('#gallery-5 img').attr('src', 'img/gallery/preview/5.webp');
                $('#gallery-6').attr('href', 'img/gallery/6.webp');
                $('#gallery-6 img').attr('src', 'img/gallery/preview/6.webp');
                break;
            case '2':
                $('#gallery-1').attr('href', 'img/gallery/7.webp');
                $('#gallery-1 img').attr('src', 'img/gallery/preview/7.webp');
                $('#gallery-2').attr('href', 'img/gallery/8.webp');
                $('#gallery-2 img').attr('src', 'img/gallery/preview/8.webp');
                $('#gallery-3').attr('href', 'img/gallery/9.webp');
                $('#gallery-3 img').attr('src', 'img/gallery/preview/9.webp');
                $('#gallery-4').attr('href', 'img/gallery/10.webp');
                $('#gallery-4 img').attr('src', 'img/gallery/preview/10.webp');
                $('#gallery-5').attr('href', 'img/gallery/11.webp');
                $('#gallery-5 img').attr('src', 'img/gallery/preview/11.webp');
                $('#gallery-6').attr('href', 'img/gallery/12.webp');
                $('#gallery-6 img').attr('src', 'img/gallery/preview/12.webp');
                break;
            case '3':
                $('#gallery-1').attr('href', 'img/gallery/13.webp');
                $('#gallery-1 img').attr('src', 'img/gallery/preview/13.webp');
                $('#gallery-2').attr('href', 'img/gallery/14.webp');
                $('#gallery-2 img').attr('src', 'img/gallery/preview/14.webp');
                $('#gallery-3').attr('href', 'img/gallery/15.webp');
                $('#gallery-3 img').attr('src', 'img/gallery/preview/15.webp');
                $('#gallery-4').attr('href', 'img/gallery/16.webp');
                $('#gallery-4 img').attr('src', 'img/gallery/preview/16.webp');
                $('#gallery-5').attr('href', 'img/gallery/17.webp');
                $('#gallery-5 img').attr('src', 'img/gallery/preview/17.webp');
                $('#gallery-6').attr('href', 'img/gallery/18.webp');
                $('#gallery-6 img').attr('src', 'img/gallery/preview/18.webp');
                break;
        }
    });

    // AJAX request to send client message
    $('.contact-form').submit((e) => {
        e.preventDefault();

        $.ajax({
            url: "/message",
            dataType: 'json',
            data: $(".contact-form").serialize(),
            beforeSend: () => {
                $('.loader-container').css('display', 'flex');
            },
            type: 'POST',
        })
        .done((result) => {
            $('.loader-container').css('display', 'none');
            $(".error-msg").css('display', 'none');
            $(".success-msg").css('visibility', 'visible');
            $(".success-msg").css('color', 'black');
            $(".success-msg").css('background', 'rgba(92, 184, 92, .8)');
            $(".success-msg").text(result.msg);
            $(".contact-form .input-field input").val('').blur();
            $(".contact-form textarea").val('').blur();
            setTimeout(() => {
                $(".success-msg").css('visibility', 'hidden');
                $(".success-msg").css('color', 'transparent');
                $(".success-msg").css('background', '');
            }, 2000)
        })
        .fail((result) => {
            $('.loader-container').css('display', 'none');
            $(".contact-error-msg").css('display', 'block');
            $(".contact-error-msg").text(result.responseJSON.msg);
        })
    })
});