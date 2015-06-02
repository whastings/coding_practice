(function() {
  'use strict';

  var body = document.body,
      dragEl = document.querySelector('.drag-el'),
      dragElOffsetX = dragEl.clientWidth / 2,
      dragElOffsetY = dragEl.clientHeight / 2,
      isMovePending = false,
      parentPos = dragEl.parentNode.getBoundingClientRect();

  function addMouseListeners() {
    body.addEventListener('mousemove', scheduleMove);
  }

  function removeMouseListeners() {
    body.removeEventListener('mousemove', scheduleMove);
  }

  function scheduleMove(event) {
    if (!isMovePending) {
      window.requestAnimationFrame(moveEl.bind(null, event));
      isMovePending = true;
    }
  }

  function moveEl(event) {
    var mouseX = event.clientX + window.scrollX,
        mouseY = event.clientY + window.scrollY,
        offsetX = mouseX - parentPos.left - dragElOffsetX,
        offsetY = mouseY - parentPos.top - dragElOffsetY;

    dragEl.style.transform = 'translate3d(' + offsetX + 'px, ' + offsetY + 'px, 0)';
    isMovePending = false;
  }

  dragEl.addEventListener('mousedown', addMouseListeners);
  body.addEventListener('mouseup', removeMouseListeners);
})();
