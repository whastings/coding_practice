(function(window, document) {
  var url = window.prompt('URL of stylesheet to add'),
      link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', url);
  link.className = 'bookmarklet-added';
  document.head.appendChild(link);
})(window, document);
