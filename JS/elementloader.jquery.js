/**
 * JQuery element loading plugin
 * @author Sam Waters <sam@samwaters.com>
 * @date 09/12/13
 * 
 * To use:
 * $("#someElement").elementLoader();
 * To stop:
 * $(".someElement").elementLoader("stop");
 *
 * CSS used by this plugin:
 * loader.gif is a gif similar to this one: http://www.ajaxload.info/cache/FF/FF/FF/00/00/00/38-1.gif
 * If the image size is different to 16x11px, you will need to adjust the width, height and margins of the .elementLoadingSpinner class
 * .elementLoading { position:relative ; }
 * .elementLoading .elementLoadingOverlay { position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(255,255,255,0.2); }
 * .elementLoading .elementLoadingSpinner { position:absolute; top:50%; left:50%; width:16px; height:11px; margin-left:-8px; margin-top:-5px; background: url("{IMAGES_PATH}/loader.gif") no-repeat; }
 */
(function($) {
  $.fn.elementLoader = function(method) {
    var methods = {
      init : function(options) {
        this.elementLoader.settings = $.extend({}, this.elementLoader.defaults, options);
        this.each(function() {
          var $this = $(this);
          $this.css("position", "relative").attr("disabled", "disabled").addClass($.fn.elementLoader.settings.loadingClass);
          var $loader = $("<span></span>").addClass($.fn.elementLoader.settings.loadingOverlay);
          $loader.on("click", function(e) {
            e.preventDefault();
          });
          var $spinner = $("<span></span>").addClass($.fn.elementLoader.settings.loadingImage);
          $this.append($loader);
          $this.append($spinner);
        });
      },
      stop: function() {
        this.each(function() {
          var $this = $(this);
          $this.removeAttr("disabled").removeClass($.fn.elementLoader.settings.loadingClass);
          $this.find("." + $.fn.elementLoader.settings.loadingOverlay).remove();
          $this.find("." + $.fn.elementLoader.settings.loadingImage).remove();
        });
      }
    };
    //Work out what to call
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method "' +  method + '" does not exist in Loading plugin!');
      return "";
    }
  };
  //Default settings for the plugin
  $.fn.elementLoader.defaults = {
    loadingClass:   "elementLoading",          /* The class of the element loading */
    loadingOverlay: "elementLoadingOverlay",   /* The class of the overlay put over the top of the element */
    loadingImage:   "elementLoadingSpinner"    /* The class of the loading image (animated gif) */
  };
  //This will be populated on init
  $.fn.elementLoader.settings = {}
})(jQuery);