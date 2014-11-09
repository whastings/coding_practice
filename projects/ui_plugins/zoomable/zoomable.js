(function(document) {
  //'use strict';

  var CLASS_ZOOM_BOX = 'zoomable-zoom-box',
      CLASS_IMAGE_CONTAINER = 'zoomable-image-container',
      CLASS_ZOOMING = 'zoomable-zooming';

  var ZoomableUI = {};

  ZoomableUI.init = function(image, zoomArea) {
    this.image = image;
    this.zoomArea = zoomArea;
    this.container = image.parentNode;
    this.isBoxMoving = false;

    this.container.classList.add(CLASS_IMAGE_CONTAINER);
    image.addEventListener('load', addZoomBox.bind(this));
  };

  window.zoomable = function(image, zoomArea) {
    var ui = Object.create(ZoomableUI);
    ui.init(image, zoomArea);
    return ui;
  };

  ZoomableUI.attachEventListeners = function() {
    var image = this.image;

    image.addEventListener('mouseenter', zoomImage.bind(this));
    image.addEventListener('mouseleave', removeZoom.bind(this));
    image.addEventListener('mousemove', moveZoom.bind(this));
  };

  /* Event Listeners */

  function moveZoom(event) {
    if (this.isBoxMoving) {
      return;
    }
    window.requestAnimationFrame(setBoxPosition.bind(this, event));
  }

  function removeZoom(event) {
    if (event.relatedTarget === this.zoomBox) {
      return;
    }
    this.container.classList.remove(CLASS_ZOOMING);
  }

  function zoomImage(event) {
    this.container.classList.add(CLASS_ZOOMING);
  }

  /* Helpers */

  function addZoomBox() {
    var image = this.image,
        height = Math.floor(image.clientHeight * 0.25),
        width = Math.floor(image.clientWidth * 0.25),
        zoomBox = this.zoomBox = document.createElement('div');

    zoomBox.classList.add(CLASS_ZOOM_BOX);
    zoomBox.style.height = height + 'px';
    zoomBox.style.width = width + 'px';

    this.image.parentNode.appendChild(zoomBox);
  }

  function setBoxPosition(event) {
    var zoomBox = this.zoomBox,
        boxOrigPos,
        boxOffset,
        topDelta,
        leftDelta;

    this.boxOrigPos = this.boxOrigPos || zoomBox.getBoundingClientRect();
    boxOrigPos = this.boxOrigPos;
    this.boxOffset = this.boxOffset || {
      height: boxOrigPos.height / 2,
      width: boxOrigPos.width / 2
    };
    boxOffset = this.boxOffset;

    topDelta = (event.clientY - boxOrigPos.top - boxOffset.height) + 'px',
    leftDelta = (event.clientX - boxOrigPos.left - boxOffset.width) + 'px';
    zoomBox.style.transform = 'translate3d(' + leftDelta + ', ' + topDelta + ', 0)';
    this.isBoxMoving = false;
  }

})(document);
