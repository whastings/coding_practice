(function(document) {
  'use strict';

  var ThumbnailsUI = {};

  ThumbnailsUI.init = function(element) {
    this.element = element;
    element.classList.add('thumbs-ui');
    this.images = Array.prototype.slice.call(element.querySelectorAll('img'));
    this.activeImage = this.images[0];
    this.activeImage.classList.add('thumbs-active');

    processImages.call(this);
    createThumbs.call(this);
    bindEvents.call(this);
  };

  window.thumbnails = function(element) {
    var ui = Object.create(ThumbnailsUI);
    ui.init(element);
  };

  var bindEvents = function() {

  };

  var calculateThumbWidth = function() {
    var imageWidth = this.images[0].offsetWidth;
    return Math.floor(imageWidth / 4 - (30 / 4));
  };

  var copyImage = function(image) {
    var newImage = new Image();
    newImage.src = image.src;
    return newImage;
  };

  var createThumbs = function() {
    var listEl = document.createElement('ul'),
        thumbWidth = calculateThumbWidth.call(this);
    listEl.classList.add('thumbs-list');

    this.images.forEach(function(image, index) {
      var li = document.createElement('li'),
          thumbImage = copyImage(image);
      if (index === 0) {
        thumbImage.classList.add('thumbs-active');
      }
      thumbImage.classList.add('thumbs-thumb-img');
      thumbImage.style.width = thumbWidth + 'px';
      li.appendChild(thumbImage);
      listEl.appendChild(li);
    });
    listEl.style.width = (this.images.length * (thumbWidth + 10)) + 'px';

    this.element.appendChild(listEl);
  };

  var processImages = function() {
    this.images.forEach(function(image) {
      image.classList.add('thumbs-image');
    });
  };

})(document);
