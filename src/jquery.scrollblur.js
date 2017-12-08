(function ($) {

    $.ScrollBlur = function (options) {

        var defaults = {
            scrollStopDelay: 200,             // how long, in milliseconds, it has to be since we stopped scrolling for the overlay to disappear
            scrollPoll     : 50,              // how often, in milliseconds, we poll the state of our scrolling
            onStart        : function() {},
            onStop         : function() {}
        };

        var plugin = this;

        plugin.settings = {};

        plugin.init = function () {
            plugin.settings = $.extend({}, defaults, options);

            // the overlay
            var $overlay = $("<div class='scrollblur-overlay'></div>");
            // the body
            var $body = $("body");

            // true if the document is currently being scrolled
            var isScrolling = false;
            // used to calculate how long it has been since we last verified that we were scrolling
            var lastScrollTime = 0;

            // add the overlay to the page
            $body.append($overlay);

            // update the body background color based on scroll depth
            $(document).on('scroll', function() {
                lastScrollTime = Date.now();
            });

            var scrollCheck = setInterval(function() {
                if (isScrolling && Date.now() - lastScrollTime > plugin.settings.scrollStopDelay) {
                    if (options.onStop) {
                        options.onStop.call(plugin);
                    }
                    isScrolling = false;
                    $body.removeClass('scrollblur-blur');
                    $overlay.removeClass('scrollblur-active');
                } else if (!isScrolling) {
                    if (options.onStart) {
                        options.onStart.call(plugin);
                    }
                    isScrolling = true;
                    $body.addClass('scrollblur-blur');
                    $overlay.addClass('scrollblur-active');
                }
           }, plugin.settings.scrollPoll);

        };

        plugin.init();
    };

}(jQuery));