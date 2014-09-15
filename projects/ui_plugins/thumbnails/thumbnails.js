(function() {
  'use strict';

  var ThumbnailsUI = {};

  ThumbnailsUI.init = function(element) {
    this.element = element;
  };

  window.thumbnails = function(element) {
    var ui = Object.create(ThumbnailsUI);
    ui.init(element);
  };
})();
