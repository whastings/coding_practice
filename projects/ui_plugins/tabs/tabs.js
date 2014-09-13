(function() {
  'use strict';

  var TabsUI = {};

  TabsUI.init = function(element) {
    this.element = element;
    this.tabsContainer = document.querySelector(
      element.getAttribute('data-tabs-content')
    );
    this.activeLink = element.querySelector('a.tabs-active');
    this.activePane = this.tabsContainer.querySelector('.tabs-active');
    element.classList.add('tabs-links');
    this.tabsContainer.classList.add('tabs-container');
    bindEvents.call(this);
  };

  window.tabs = function(element) {
    var ui = Object.create(TabsUI);
    ui.init(element);
  };

  var animateTransition = function(oldPane, newPane) {
    var oldClasses = oldPane.classList,
        newClasses = newPane.classList;

    oldClasses.remove('tabs-active');
    oldClasses.add('tabs-transitioning');

    setTimeout(function() {
      oldClasses.remove('tabs-transitioning');
      newClasses.add('tabs-transitioning');
      newPane.offsetWidth; // Force relayout.
      newClasses.add('tabs-active');
      newClasses.remove('tabs-transitioning');
    }, 500);
  };

  var bindEvents = function() {
    this.element.addEventListener('click', handleLinkClick.bind(this));
  };

  var handleLinkClick = function(event) {
    var clickedLink = event.target;
    if (clickedLink.nodeName.toLowerCase() !== 'a') {
      return;
    }
    event.preventDefault();

    this.activeLink.classList.remove('tabs-active');

    var oldPane = this.activePane;
    this.activeLink = clickedLink;
    this.activePane = document.getElementById(
      clickedLink.getAttribute('href').substring(1)
    );
    clickedLink.classList.add('tabs-active');

    animateTransition(oldPane, this.activePane);
  };
})();
