(function(document) {
  var links = document.querySelectorAll('link.bookmarklet-added'),
      head = document.head;
  links = Array.prototype.slice.call(links);
  links.forEach(function(link) {
    head.removeChild(link);
    head.appendChild(link.cloneNode());
  });
})(document);
