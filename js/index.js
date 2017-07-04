var $portfolio = $('.portfolio');
        if ($.fn.imagesLoaded && $portfolio.length > 0) {
            imagesLoaded($portfolio, function () {
                $portfolio.isotope({
                    itemSelector: '.portfolio-item',
                    filter: '*'
                });
                $(window).trigger("resize");
            });
        }

        $('.portfolio-filter').on('click', 'a', function (e) {
            e.preventDefault();
            $(this).parent().addClass('active').siblings().removeClass('active');
            var filterValue = $(this).attr('data-filter');
            $portfolio.isotope({filter: filterValue});
        });

//

 $('#portfolio-loader').on('click', function(e) {
            e.preventDefault();
            var handler = $(this);
            handler.find('i').removeClass('fa-repeat').addClass('fa-spinner tb-spinner');
            $.get(
                creek.ajax_url,
                {
                    action: 'get_portfolio',
                    offset: $portfolio.find('.portfolio-item').length,
                    items: handler.data('items'),
                    image_size: handler.data('image-size')
                },
                function( data ) {
                    $portfolio = $('.portfolio');
                    handler.find('i').removeClass('fa-spinner tb-spinner').addClass('fa-repeat');
                    var items = $(data);
                    $portfolio.append(items);
                    $portfolio.imagesLoaded(function(){
                      $portfolio.isotope('appended',items);
                      $(window).trigger('resize');
                    });

                    if(items.length < handler.data('items')) {
                        handler.find('i').parent().hide();
                    }
                }
            );
        });