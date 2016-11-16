$(document).ready(function() {


        $('.grid-item-content').imagefill();

        $('.grid-item-content').imagesLoaded(function() {

            $('.grid').masonry({
                itemSelector: '.grid-item',
                columnWidth: '.grid-sizer',
                percentPosition: true
            });


            $('.open-popup-link').magnificPopup({
                gallery: {
                    enabled: true,

                    navigateByImgClick: true,

                    arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',

                    tPrev: 'Предыдущая',
                    tNext: 'Следующая'
                },
                type: 'inline',
                mainClass: 'mfp-fade',
                midClick: true,
                fixedContentPos: true
            });


        });

        $('.main-slider').owlCarousel({
            autoplay: true,
            loop: true,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            items: 1,
            smartSpeed: 950
        });

        $('.reviews-slider').owlCarousel({
            items: 1,
            loop: true,
            smartSpeed: 200,
            nav: true,
            navText: ['', ''],
            touchDrag: true,
            // autoHeight: true,
            dots: true
        });

        $('.popup').magnificPopup({
            type: 'image',
            midClick: true
        });

        $(".datepicker").datepicker({
            showOtherMonths: true,
            selectOtherMonths: true,
            dateFormat: 'dd.mm.yy'
        });

        $("iframe[width]").attr("width", function() {
            return $(this).attr("width").replace("", "100%");
        });
        $("iframe[height]").attr("height", function() {
            return $(this).attr("height").replace("", "300px");
        });

        $(".scroll-to-top").click(function() {

            $("body, html").animate({
                scrollTop: $("body").offset().top
            }, 1200);
        });

        $('#btn-scroll-to-form').click(function(event) {
            event.preventDefault();
            $("body, html").animate({
                scrollTop: ($("#date-empty").offset().top)
            }, 1000);
        });

        var latData = Number($("#google-map").data("lat")),
            lngData = Number($("#google-map").data("lng")),
            myLatLng = { lat: latData, lng: lngData },
            isDraggable = $(window).innerWidth > 480 ? true : false;


        google.maps.event.addDomListener(window, 'load', init);
        var map;

        function init() {
            var mapOptions = {
                center: new google.maps.LatLng(myLatLng),
                zoom: 14,
                zoomControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.DEFAULT,
                },
                disableDoubleClickZoom: true,
                mapTypeControl: true,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                },
                scaleControl: true,
                scrollwheel: false,
                panControl: true,
                streetViewControl: true,
                draggable: isDraggable,
                overviewMapControl: true,
                overviewMapControlOptions: {
                    opened: false,
                },
                mapTypeId: google.maps.MapTypeId.ROADMAP,
            };
            var mapElement = document.getElementById('google-map');
            var map = new google.maps.Map(mapElement, mapOptions);
            var image = 'images/map-marker.png',
                marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    animation: google.maps.Animation.DROP,
                    icon: image,
                    id: 'map-marker'
                });
        }

    $('#mobile-nav-button').click(function(e) {
            e.preventDefault();
            if ($('.mobile-nav').hasClass('opened')) {

                $('.mobile-nav').css({
                    'transform': 'translateX(0)'
                });

                $('.mobile-nav').removeClass('opened');
            } else {
                $('.mobile-nav').css({
                    'transform': 'translateX(-270px)'
                });

                $('.mobile-nav').addClass('opened')
            }

        });

        $(".nav-wrapp").swipe({
                swipeRight: function(event, direction, distance, duration, fingerCount) {
                    $('.mobile-nav').css({
                        'transform': 'translateX(0)'
                    });
                }
        });

        (function() {

            var magnificPopup = $.magnificPopup.instance;
            $(".open-popup-link").click(function(e) {

                setTimeout(function() {
                    $(".mfp-container").swipe({
                        swipeLeft: function(event, direction, distance, duration, fingerCount) {
                            magnificPopup.next();
                        },

                        swipeRight: function(event, direction, distance, duration, fingerCount) {
                            magnificPopup.prev();
                        },
                    });
                }, 500);
            });

        }).call(this);


        
    });

    
