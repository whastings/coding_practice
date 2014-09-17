(function(document) {
  'use strict';

  var ACTIVE_CLASS = 'thumbs-active',
      THUMB_CLASS = 'thumbs-thumb-image';

  var ThumbnailsUI = {};

  ThumbnailsUI.init = function(element) {
    this.element = element;
    element.classList.add('thumbs-ui');
    this.images = Array.prototype.slice.call(element.querySelectorAll('img'));
    this.activeIndex = 0;
    this.tempActiveIndex = null;
    this.images[0].classList.add(ACTIVE_CLASS);
    this.thumbImages = [];
    this.imageWidth = this.images[0].offsetWidth;
    this.element.style.width = (this.imageWidth + 70) + 'px';
    this.lastShownThumb = 4;

    processImages.call(this);
    createThumbs.call(this);
    if (this.images.length > 4) {
      addNavLinks.call(this);
    }
    bindEvents.call(this, element);
  };

  window.thumbnails = function(element) {
    var ui = Object.create(ThumbnailsUI);
    ui.init(element);
    return ui;
  };

  var addNavLinks = function() {
    var link,
        span,
        listWrapper = this.element.querySelector('.thumbs-list-wrapper');

    for (var i = 0; i < 2; i++) {
      link = document.createElement('a');
      span = document.createElement('span');
      span.classList.add((i === 0) ? 'icon-chevron-left' : 'icon-chevron-right');
      link.appendChild(span);
      link.classList.add((i === 0) ? 'thumbs-nav-left' : 'thumbs-nav-right');
      link.setAttribute('href', 'javascript:void(0)');
      if (i === 0) {
        listWrapper.parentNode.insertBefore(link, listWrapper);
        link.classList.add('thumbs-nav-disabled');
      } else {
        this.element.appendChild(link);
      }
    }
  };

  var bindEvents = function(element) {
    element.addEventListener('click', setActive.bind(this));
    var mouseOverHandler = setTempActive.bind(this),
        mouseOutHandler = unsetTempActive.bind(this);

    this.thumbImages.forEach(function(thumbImage) {
      thumbImage.addEventListener('mouseover', mouseOverHandler);
      thumbImage.addEventListener('mouseleave', mouseOutHandler);
    }, this);

    element.addEventListener('click', slideThumbs.bind(this));
  };

  var calculateThumbWidth = function() {
    if (!this.thumbWidth) {
      var imageWidth = this.images[0].offsetWidth;
      this.thumbWidth = Math.floor(imageWidth / 4 - (30 / 4));
    }
    return this.thumbWidth;
  };

  var copyImage = function(image) {
    var newImage = new Image();
    newImage.src = image.src;
    return newImage;
  };

  var createThumb = function(image, index, thumbWidth) {
    var thumbImage = copyImage(image);
    if (index === 0) {
      thumbImage.classList.add(ACTIVE_CLASS);
    }
    thumbImage.classList.add(THUMB_CLASS);
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
    this.listEl = listEl;

    var listElWrapper = document.createElement('div');
    listElWrapper.classList.add('thumbs-list-wrapper');
    listElWrapper.style.width = this.imageWidth + 'px';
    listElWrapper.appendChild(listEl);
    this.element.appendChild(listElWrapper);
  };

  var processImages = function() {
    this.images.forEach(function(image) {
      image.classList.add('thumbs-image');
    });
  };

  var setActive = function(event) {
    var thumbImage = event.target;
    if (!thumbImage.classList.contains(THUMB_CLASS)) {
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
      image.classList.add(ACTIVE_CLASS);
    });
  };

  var setTempActive = function(event) {
    var thumbImage = event.target,
        tempIndex = thumbImage.getAttribute('data-index');
    unsetOldImage.call(this, this.activeIndex);
    setActiveImage.call(this, tempIndex);

    this.tempActiveIndex = tempIndex;
  };

  var slideThumbs = function(event) {
    var link = event.target.parentNode,
        targetClassList = link.classList;
    if (!targetClassList.contains('thumbs-nav-left') &&
        !targetClassList.contains('thumbs-nav-right')) {
      return;
    }
    if (targetClassList.contains('thumbs-nav-disabled')) {
      return;
    }

    var direction = (targetClassList.contains('thumbs-nav-right')) ? 1 : -1;
    transitionThumbs.call(this, direction);
    this.lastShownThumb += direction;
    toggleNavsDisabled.call(this);
  };

  var toggleNavsDisabled = function() {
    this.leftNav = this.leftNav || this.element.querySelector('.thumbs-nav-left');
    this.rightNav = this.rightNav || this.element.querySelector('.thumbs-nav-right');

    [[this.leftNav, 4], [this.rightNav, this.images.length]].forEach(function(combo) {
      var nav = combo[0],
          lastShown = combo[1];
      if (this.lastShownThumb === lastShown) {
        nav.classList.add('thumbs-nav-disabled');
      } else {
        nav.classList.remove('thumbs-nav-disabled');
      }
    }, this);
  };

  var transitionThumbs = function(direction) {
    var thumbWidth = calculateThumbWidth.call(this);
    this.slideOffest = this.slideOffest || 0;
    this.slideOffest += (thumbWidth + 10) * direction * -1;
    this.listEl.style.transform = 'translateX(' + this.slideOffest + 'px)';
  };

  var unsetOldImage = function(oldIndex) {
    var oldImages = [this.images[oldIndex], this.thumbImages[oldIndex]];
    oldImages.forEach(function(image) {
      image.classList.remove(ACTIVE_CLASS);
    });
  };

  var unsetTempActive = function(event) {
    unsetOldImage.call(this, this.tempActiveIndex);
    this.tempActiveIndex = null;

    setActiveImage.call(this, this.activeIndex);
  };

})(document);
