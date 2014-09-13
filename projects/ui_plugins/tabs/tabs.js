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

  var bindEvents = function() {
    this.element.addEventListener('click', handleLinkClick.bind(this));
  };

  var handleLinkClick = function(event) {
    var clickedLink = event.target;
    if (clickedLink.nodeName.toLowerCase() !== 'a') {
      return;
    }
    event.preventDefault();

    [this.activeLink, this.activePane].forEach(function(element) {
      element && element.classList.remove('tabs-active');
    });

    this.activeLink = clickedLink;
    this.activePane = document.getElementById(
      clickedLink.getAttribute('href').substring(1)
    );
    [this.activeLink, this.activePane].forEach(function(element) {
      element && element.classList.add('tabs-active');
    });
  };
})();
