/**
 * 
 */
(function ($) {

    'use strict';

    $.fn.magnifier = function(options) {

        options = $.extend({
            width: 300,
            height: 300,
            lensBackground: 'rgba(0,0,0,0.6)',
            detailBackgroundColor: 'transparent',
            wrapperClassName: 'magnifier-wrapper',
            lensClassName: 'magnifier-lens',
            detailClassName: 'magnifier-detail'
        }, options);

        this.each(function() {

            var $wrapper,
                $magnifierDetail,
                $magnifierLens,
                $el,
                isActive,
                detailWidth,
                detailHeight,
                elWidth,
                elHeight,
                wrapperOffset,
                zoomLevel,
                zoomRatio,
                ppzrWidth,
                ppzrHeight;

            $el = $(this);

            // create the wrapper and save it into the variable $wrapper
            // wrapper is needed to place the lens and the detailed image
            $el.wrap('<div class="' + options.wrapperClassName + '"></div>');
            $wrapper = $el.parent();

            // positioned elements must be relative to the wrapper
            $wrapper.css({
                'position': 'relative'
            });

            // detail view by default is inactive
            isActive = false;

            $el.on('mousedown', function(ev) {

                ev.preventDefault();
                activate(ev);
                showDetails(ev);

            });

            $(document).on('mouseup', function(ev) {
                if(isActive) {
                    cleanUp(ev);
                }
            });

            $(document).on('mousemove', function(ev) {

                if(isActive) {
                    changePos(ev);
                }

            });

            function showDetails(ev) {

                // create elements for dom insetion
                $magnifierDetail = $('<div class="' + options.detailClassName + '"></div>');
                $magnifierLens = $('<div class="' + options.lensClassName + '"></div>');

                // store offset positions
                wrapperOffset = $wrapper.offset();

                // create hidden image to get height and width of the full image
                var src = $el.attr('data-magnifier-src') || $el.attr('src');
                var img = new Image();
                img.setAttribute('src', src);

                img.onload = function(imgEvent) {
                    initVars(imgEvent);
                    changePos(ev);

                    // set dimensions and positions of the created elements
                    $magnifierDetail.css({
                        'background-image': 'url(' + src + ')',
                        'background-repeat': 'no-repeat',
                        'background-color': options.detailBackgroundColor,
                        'height': options.height,
                        'width': options.width
                    });

                    $magnifierLens.css({
                        'height': Math.min(ppzrHeight, elHeight),
                        'width': Math.min(ppzrWidth, elWidth),
                        'background-color': options.lensBackground,
                        'position': 'absolute'
                    });

                    // insert into dom after the image element
                    $wrapper.append([$magnifierDetail, $magnifierLens]);

                };

            }

            function initVars(ev) {
                // save height and width of image
                detailWidth = ev.target.width;
                detailHeight = ev.target.height;

                elWidth = $el.width();
                elHeight = $el.height();

                // get zoom level and ratio
                zoomLevel = detailWidth / elWidth;
                zoomRatio = elWidth / detailWidth;

                // pixel per zoom ratio
                ppzrHeight = zoomRatio * options.height;
                ppzrWidth = zoomRatio * options.width;
            }

            function changePos(ev) {

                // get the value and check if it is between 0
                // and the size of the image minor the with of the lens
                // to be sure just the image is showen
                var offsetX = Math.max(0, Math.min(elWidth - ppzrWidth, ev.pageX - wrapperOffset.left));
                var offsetY = Math.max(0, Math.min(elHeight - ppzrHeight, ev.pageY - wrapperOffset.top));

                // get related position of the original image
                var posX = offsetX * zoomLevel;
                var posY = offsetY * zoomLevel;
                // center element in container if image is bigger than detail container
                if(options.width > detailWidth) {
                    posX -= (options.width - detailWidth) / 2;
                }
                if(options.height > detailHeight) {
                    posY -= (options.height - detailHeight) / 2;
                }

                $magnifierDetail.css({
                    'background-position': -posX + 'px ' + -posY + 'px'
                });

                $magnifierLens.css({
                    left: offsetX,
                    top: offsetY
                });

            }

            function activate() {

                isActive = true;

            }

            function cleanUp(ev) {
                isActive = false;
                $magnifierDetail.remove();
                $magnifierLens.remove();
            }

        });

        // return self for chaining
        return this;

    };

})(jQuery || Zepto || ender || $);