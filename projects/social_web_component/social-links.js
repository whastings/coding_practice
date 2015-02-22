(function(document) {
  'use strict';

  var importer = document.querySelector('#social-links-import'),
      importContent = importer.import,
      template = importContent.querySelector('#social-links-template'),
      proto = Object.create(HTMLElement.prototype),
      SocialLinks;

  var LINKS = {
    twitter: {
      name: 'Twitter',
      url: 'https://twitter.com/'
    },
    linkedin: {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/'
    },
    github: {
      name: 'GitHub',
      url: 'https://github.com/'
    }
  };

  proto.createdCallback = function() {
    var shadowRoot = this.createShadowRoot();
    shadowRoot.appendChild(template.content.cloneNode(true));
    addLinks(shadowRoot.querySelector('.social-links-list'), this.attributes);
  };

  SocialLinks = document.registerElement('social-links', {
    prototype: proto
  });

  function addLinks(listEl, linksMap) {
    var listItems = document.createDocumentFragment();
    Object.keys(LINKS).forEach(function(link) {
      var linkAttr = linksMap.getNamedItem(link);
      if (!linkAttr) {
        return;
      }
      var linkEl = document.createElement('a'),
          linkData = LINKS[link],
          listItem = document.createElement('li');
      linkEl.textContent = linkData.name;
      linkEl.href = linkData.url + linkAttr.value;
      listItem.appendChild(linkEl);
      listItems.appendChild(listItem);
    });
    listEl.appendChild(listItems);
  }
})(document);
