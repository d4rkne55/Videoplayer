/**
 * jQuery plugin to bind both single and double click to objects
 * taken from: http://stackoverflow.com/a/26074376/3439786
 *
 * @callback clickCallback
 * @callback dblclickCallback
 
 * @param {string} delegateSelector - allows to delegate the events, optional
 * @param {clickCallback} clickFun
 * @param {dblclickCallback} dblclickFun
 * @param {number} dblclickWait - max timespan it listens for a double click, default 300, optional
 */
(function($) {
    $.fn.multipleClicks = function(delegateSelector, clickFun, dblclickFun, dblclickWait) {
        var obj;
        if (typeof(delegateSelector)==='function' && typeof(clickFun)==='function') {
            dblclickWait = dblclickFun; dblclickFun = clickFun; clickFun = delegateSelector; delegateSelector = null; // If 'delegateSelector' is missing reorder arguments
        } else if (!(typeof(delegateSelector)==='string' && typeof(clickFun)==='function' && typeof(dblclickFun)==='function')) {
            return false;
        }
        return $(this).each(function() {
            $(this).on('click', delegateSelector, function(event) {
                var self = this;
                clicks = ($(self).data('clicks') || 0)+1;
                $(self).data('clicks', clicks);
                if (clicks == 1) {
                    setTimeout(function(){
                        if ($(self).data('clicks') == 1) {
                            clickFun.call(self, event); // Single click action
                        } else {
                            dblclickFun.call(self, event); // Double click action
                        }
                        $(self).data('clicks', 0);
                    }, dblclickWait || 300);
                }
            });
        });
    };
})(jQuery);