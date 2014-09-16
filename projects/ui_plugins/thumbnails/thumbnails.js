(function(document) {
  'use strict';

  var ThumbnailsUI = {};

  ThumbnailsUI.init = function(element) {
    this.element = element;
    element.classList.add('thumbs-ui');
    this.images = Array.prototype.slice.call(element.querySelectorAll('img'));
    this.activeIndex = 0;
    this.tempActiveIndex = null;
    this.images[0].classList.add('thumbs-active');
    this.thumbImages = [];

    processImages.call(this);
    createThumbs.call(this);
    bindEvents.call(this, element);
  };

  window.thumbnails = function(element) {
    var ui = Object.create(ThumbnailsUI);
    ui.init(element);
    return ui;
  };

  var bindEvents = function(element) {
    element.addEventListener('click', setActive.bind(this));
    var mouseOverHandler = setTempActive.bind(this),
        mouseOutHandler = unsetTempActive.bind(this);

    this.thumbImages.forEach(function(thumbImage) {
      thumbImage.addEventListener('mouseover', mouseOverHandler);
      thumbImage.addEventListener('mouseleave', mouseOutHandler);
    }, this);
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

  var createThumb = function(image, index, thumbWidth) {
    var thumbImage = copyImage(image);
    if (index === 0) {
      thumbImage.classList.add('thumbs-active');
    }
    thumbImage.classList.add('thumbs-thumb-img');
    thumbImage.style.width = thumbWidth + 'px';
    thumbImage.setAttribute('data-index', index);
    this.thumbImages.push(thumbImage);
    return thumbImage;
  };

  var createThumbs = function() {
    var listEl = document.createElement('ul'),
        thumbWidth = calculateThumbWidth.call(this);
    listEl.classList.add('thumbs-list');

    this.images.forEach(function(image, index) {
      var li = document.createElement('li'),
          thumbImage = createThumb.call(this, image, index, thumbWidth);
      li.appendChild(thumbImage);
      listEl.appendChild(li);
    }, this);
    listEl.style.width = (this.images.length * (thumbWidth + 10)) + 'px';

    this.element.appendChild(listEl);
  };

  var processImages = function() {
    this.images.forEach(function(image) {
      image.classList.add('thumbs-image');
    });
  };

  var setActive = function(event) {
    var thumbImage = event.target;
    if (!thumbImage.classList.contains('thumbs-thumb-img')) {
      return;
    }

    var newIndex = thumbImage.getAttribute('data-index'),
        oldIndex = this.activeIndex;
    unsetOldImage.call(this, oldIndex);

    setActiveImage.call(this, newIndex);
    this.activeIndex = newIndex;
  };

  var setActiveImage = function(newIndex) {
    var newImages = [this.images[newIndex], this.thumbImages[newIndex]];
    newImages.forEach(function(image) {
      image.classList.add('thumbs-active');
    });
  };

  var setTempActive = function(event) {
    var thumbImage = event.target,
        tempIndex = thumbImage.getAttribute('data-index');
    unsetOldImage.call(this, this.activeIndex);
    setActiveImage.call(this, tempIndex);

    this.tempActiveIndex = tempIndex;
  };

  var unsetOldImage = function(oldIndex) {
    var oldImages = [this.images[oldIndex], this.thumbImages[oldIndex]];
    oldImages.forEach(function(image) {
      image.classList.remove('thumbs-active');
    });
  };

  var unsetTempActive = function(event) {
    unsetOldImage.call(this, this.tempActiveIndex);
    this.tempActiveIndex = null;

    setActiveImage.call(this, this.activeIndex);
  };

})(document);
