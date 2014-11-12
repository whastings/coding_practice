(function(document) {
  //'use strict';

  var CLASS_ZOOM_BOX = 'zoomable-zoom-box',
      CLASS_IMAGE_CONTAINER = 'zoomable-image-container',
      CLASS_ZOOMING = 'zoomable-zooming',
      CLASS_ZOOMED_IMG = 'zoomable-zoomed-img',
      CLASS_ZOOM_AREA = 'zoomable-zoom-area';

  var BOUND_FUNCTIONS = {
    moveZoom: moveZoom,
    removeZoom: removeZoom,
    setBoxPosition: setBoxPosition,
    zoomImage: zoomImage
  };

  var ZoomableUI = {};

  ZoomableUI.init = function(image, zoomArea) {
    this.image = image;
    this.zoomArea = zoomArea;
    this.container = image.parentNode;
    this.isBoxMoving = false;
    this.boundFunctions = bindFunctions.call(this);
    this.deltas = {};

    this.container.classList.add(CLASS_IMAGE_CONTAINER);
    image.addEventListener('load', addZoomBox.bind(this));
    image.addEventListener('load', setZoomArea.bind(this));
  };

  window.zoomable = function(image, zoomArea) {
    var ui = Object.create(ZoomableUI);
    ui.init(image, zoomArea);
    return ui;
  };

  ZoomableUI.attachEventListeners = function() {
    var image = this.image,
        boundFunctions = this.boundFunctions;

    image.addEventListener('mouseenter', boundFunctions.zoomImage);
  };

  /* Event Listeners */

  function addZoomBox() {
    var image = this.image,
        height = Math.floor(image.clientHeight * 0.25),
        width = Math.floor(image.clientWidth * 0.25),
        zoomBox = this.zoomBox = document.createElement('div');

    zoomBox.classList.add(CLASS_ZOOM_BOX);
    zoomBox.style.height = height + 'px';
    zoomBox.style.width = width + 'px';

    this.image.parentNode.appendChild(zoomBox);
    this.imgRect = this.image.getBoundingClientRect();
  }

  function moveZoom(event) {
    if (this.isBoxMoving) {
      return;
    }
    this.lastEvent = event;
    window.requestAnimationFrame(this.boundFunctions.setBoxPosition);
    this.isBoxMoving = true;
  }

  function removeZoom() {
    var container = this.container;

    container.classList.remove(CLASS_ZOOMING);
    container.removeEventListener('mousemove', this.boundFunctions.moveZoom);
    container.removeEventListener('mouseleave', this.boundFunctions.removeZoom);

    this.zoomedImage.classList.remove(CLASS_ZOOMING);
  }

  function setZoomArea() {
    var image = this.image,
        zoomedImage = document.createElement('img'),
        zoomArea = this.zoomArea,
        zoomedImgWidth = zoomArea.offsetWidth * 4;

    zoomedImage.setAttribute('src', this.image.getAttribute('src'));
    zoomedImage.style.width = zoomedImgWidth + 'px';
    zoomedImage.classList.add(CLASS_ZOOMED_IMG);
    zoomArea.appendChild(zoomedImage);
    zoomArea.classList.add(CLASS_ZOOM_AREA);
    zoomArea.style.height =
      (zoomArea.offsetWidth / image.offsetWidth * image.offsetHeight) + 'px';

    this.zoomedImage = zoomedImage;
  }

  function zoomImage(event) {
    var container = this.container;

    container.classList.add(CLASS_ZOOMING);
    container.addEventListener('mousemove', this.boundFunctions.moveZoom);
    container.addEventListener('mouseleave', this.boundFunctions.removeZoom);

    this.zoomedImage.classList.add(CLASS_ZOOMING);
  }

  /* Helpers */

  function bindFunctions() {
    var boundFunctions = {};
    Object.keys(BOUND_FUNCTIONS).forEach(function(funcName) {
      boundFunctions[funcName] = BOUND_FUNCTIONS[funcName].bind(this);
    }, this);
    return boundFunctions;
  }

  function setBoxData() {
    this.boxOrigPos = this.boxOrigPos || this.zoomBox.getBoundingClientRect();
    this.boxOffset = this.boxOffset || {
      height: this.boxOrigPos.height / 2,
      width: this.boxOrigPos.width / 2
    };
  }

  function setDeltas() {
    var boxOrigPos = this.boxOrigPos,
        boxOffset = this.boxOffset,
        imgRect = this.imgRect,
        event = this.lastEvent,
        leftDelta,
        topDelta,
        fromImgBottom = imgRect.bottom - boxOrigPos.height,
        fromImgRight = imgRect.right - boxOrigPos.width;

    topDelta = event.clientY - boxOffset.height;
    leftDelta = event.clientX - boxOffset.width;

    if (topDelta > fromImgBottom) {
      topDelta = fromImgBottom;
    } else if (topDelta < imgRect.top) {
      topDelta = imgRect.top;
    }

    if (leftDelta > fromImgRight) {
      leftDelta = fromImgRight;
    } else if (leftDelta < imgRect.left) {
      leftDelta = imgRect.left;
    }

    this.deltas.top = topDelta;
    this.deltas.left = leftDelta;
    return this.deltas;
  }

  function isOutsideImage(x, y) {
    var imgRect = this.imgRect;

    return x > imgRect.right || x < imgRect.left ||
      y > imgRect.bottom || y < imgRect.top;
  }

  function setBoxPosition() {
    var event = this.lastEvent,
        boxOrigPos,
        deltas,
        leftDelta,
        topDelta;

    this.isBoxMoving = false;
    if (isOutsideImage.call(this, event.clientX, event.clientY)) {
      return removeZoom.call(this);
    }

    setBoxData.call(this);
    boxOrigPos = this.boxOrigPos;
    deltas = setDeltas.call(this);
    leftDelta = deltas.left - boxOrigPos.left;
    topDelta = deltas.top - boxOrigPos.top;
    this.zoomBox.style.transform =
      'translate3d(' + leftDelta + 'px, ' + topDelta + 'px, 0)';

    setZoomedPosition.call(this);
  }

  function setZoomedPosition() {
    var deltas = this.deltas,
        imgRect = this.imgRect,
        zoomedImage = this.zoomedImage,
        heightRatio = zoomedImage.offsetHeight / imgRect.height,
        widthRatio = zoomedImage.offsetWidth / imgRect.width,
        leftOffset = (deltas.left - imgRect.left) * -1 * widthRatio,
        topOffset = (deltas.top - imgRect.top) * -1 * heightRatio;

    zoomedImage.style.transform =
      'translate3d(' + leftOffset + 'px, ' + topOffset + 'px, 0)';
  }

})(document);
