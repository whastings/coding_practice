(function(document) {
  var el,
      tweetFilter,
      topicButton,
      userButton,
      form,
      textBox,
      submitButton,
      manageType,
      STYLES,
      TEXT_BOX_STYLES;

  STYLES = {
    backgroundColor: 'rgb(59, 207, 226)',
    left: 0,
    padding: '15px',
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 10000
  };

  TEXT_BOX_STYLES = {
    display: 'block',
    height: '200px',
    margin: '10px 0',
    width: '100%'
  };

  function addButtons() {
    topicButton = document.createElement('button');
    userButton = document.createElement('button');
    topicButton.textContent = 'Manage Topics';
    userButton.textContent = 'Manager Users';
    topicButton.classList.add('btn');
    userButton.classList.add('btn');
    el.appendChild(userButton);
    el.appendChild(topicButton);
  }

  function addTextBox() {
    form = document.createElement('form');
    hideForm();
    textBox = document.createElement('textarea');
    submitButton = document.createElement('button');
    submitButton.classList.add('btn');
    submitButton.textContent = 'Save';
    form.appendChild(textBox);
    form.appendChild(submitButton);
    el.appendChild(form);
  }

  function applyStyles(element, styles) {
    for (var style in styles) {
      if (styles.hasOwnProperty(style)) {
        element.style[style] = styles[style];
      }
    }
  }

  function attachListeners() {
    topicButton.addEventListener('click', manageTopics);
    userButton.addEventListener('click', manageUsers);
    submitButton.addEventListener('click', save);
  }

  function createUI() {
    el = document.createElement('div');
    addButtons();
    addTextBox();
    setStyles();
    document.body.insertBefore(el, document.body.firstChild);
    attachListeners();
  }

  function hideForm() {
    form.style.display = 'none';
  }

  function init(filter) {
    tweetFilter = filter;
  }

  function manageTopics() {
    manageType = 'topic';
    showForm();
  }

  function manageUsers() {
    manageType = 'user';
    showForm();
  }

  function save(event) {
    var type = manageType === 'topic' ? 'Topics' : 'Users',
        data = textBox.value.split('\n');

    event.preventDefault();
    tweetFilter['set' + type](data);
    hideForm();
  }

  function showForm() {
    var type = manageType === 'topic' ? 'Topics' : 'Users',
        data = tweetFilter['get' + type]();

    textBox.value = data.join('\n');
    form.style.display = 'block';
  }

  function setStyles() {
    applyStyles(el, STYLES);
    applyStyles(textBox, TEXT_BOX_STYLES);
  }

  window.tweetFilterUI = {
    create: createUI,
    init: init
  };
})(document);
