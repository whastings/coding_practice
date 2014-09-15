(function(document) {
  'use strict';

  var ThumbnailsUI = {};

  ThumbnailsUI.init = function(element) {
    this.element = element;
    element.classList.add('thumbnails-ui');
    this.images = Array.prototype.slice.call(element.querySelectorAll('img'));
    this.activeImage = this.images[0];
    this.activeImage.classList.add('thumbs-active');

    createThumbs.call(this);
    bindEvents.call(this);
  };

  var bindEvents = function() {

  };

  var copyImage = function(image) {
    var newImage = new Image();
    newImage.src = image.src;
    return newImage;
  };

  var createThumbs = function() {
    var listEl = document.createElement('ul');
    listEl.classList.add('thumbs-list');

    this.images.forEach(function(image) {
      var li = document.createElement('li'),
          thumbImage = copyImage(image);
      thumbImage.classList.add('thumbs-thumb-img');
      li.appendChild(thumbImage);
      listEl.appendChild(li);
    });

    this.element.appendChild(listEl);
  };

  window.thumbnails = function(element) {
    var ui = Object.create(ThumbnailsUI);
    ui.init(element);
  };
})(document);
