(function() {
  "use strict";

  var TabsUI = {};

  TabsUI.init = function(element) {
    this.element = element;
  };

  window.tabs = function(element) {
    var ui = Object.create(TabsUI);
    ui.init(element);
  };
})();
