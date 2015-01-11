(function() {
  var storage = window.localStorage,
      usersKey = 'tweet_filter_allowed_users',
      topicsKey = 'tweet_filter_allowed_topics',
      allowedUsers = storage.getItem(usersKey) || [],
      allowedTopics = storage.getItem(topicsKey) || [],
      isMobile = window.location.host === 'mobile.twitter.com',
      ITEM_SELECTOR,
      CONTENT_SELECTOR,
      LIST_SELECTOR,
      USERNAME_ATTR,
      observer;

  if (isMobile) {
    ITEM_SELECTOR = '.stream-tweet';
    CONTENT_SELECTOR = '.tweet-text-inner > div';
    LIST_SELECTOR = '.stream-items';
    USERNAME_ATTR = 'screen_name';
  } else {
    ITEM_SELECTOR = '.tweet';
    CONTENT_SELECTOR = '.tweet-text';
    LIST_SELECTOR = '#stream-items-id';
    USERNAME_ATTR = 'data-screen-name';
  }

  if (typeof allowedUsers === 'string') {
    allowedUsers = JSON.parse(allowedUsers);
  }
  if (typeof allowedTopics === 'string') {
    allowedTopics = JSON.parse(allowedTopics);
  }

  function addAllowedTopic(topic) {
    setAllowedTopics(allowedTopics.concat([topic]));
  }

  function addAllowedUser(user) {
    allowedUsers.push(user);
    storage.setItem(usersKey, JSON.stringify(allowedUsers));
  }

  function attachObserver() {
    var stream = document.querySelector(LIST_SELECTOR);
    observer = new MutationObserver(processNewTweets);
    observer.observe(stream, {childList: true});
  }

  function filterTweets(tweets) {
    var length = tweets.length,
        currentTweet,
        i;

    for (i = 0; i < length; i++) {
      currentTweet = tweets[i];
      processTweet(currentTweet);
    }
  }

  function getAllowedTopics() {
    return allowedTopics;
  }

  function getAllowedUsers() {
    return allowedUsers;
  }

  function hasAllowedTopic(tweet) {
    var contentEl = tweet.querySelector(CONTENT_SELECTOR),
        content;
    if (!contentEl) {
      return false;
    }
    content = contentEl.textContent.toLowerCase();

    return allowedTopics.some(function(string) {
      return content.indexOf(string.toLowerCase()) > -1;
    });
  }

  function isByAllowedUser(tweet) {
    var user = tweet.getAttribute(USERNAME_ATTR);
    return allowedUsers.indexOf(user) > -1;
  }

  function processTweet(tweet) {
    if (isByAllowedUser(tweet) || hasAllowedTopic(tweet)) {
      return;
    }
    tweet.style.display = 'none';
  }

  function processNewTweets(observerRecords) {
    var tweets = observerRecords[0].addedNodes;

    tweets = Array.prototype.map.call(tweets, function(tweet) {
      return tweet.querySelector(ITEM_SELECTOR) || tweet;
    });

    filterTweets(tweets);
  }

  function run() {
    var tweets = document.querySelectorAll(ITEM_SELECTOR);
    filterTweets(tweets);
    attachObserver();
  }

  function setAllowedTopics(topics) {
    sortInsensitive(topics);
    allowedTopics = topics;
    storage.setItem(topicsKey, JSON.stringify(allowedTopics));
  }

  function setAllowedUsers(users) {
    sortInsensitive(users);
    allowedUsers = users;
    storage.setItem(usersKey, JSON.stringify(allowedUsers));
  }

  function sortInsensitive(array) {
    return array.sort(function(string1, string2) {
      var lowerSorted = [string1.toLowerCase(), string2.toLowerCase()].sort();
      return string1.toLowerCase() === lowerSorted[0] ? -1 : 1;
    });
  }

  window.tweetFilter = {
    addTopic: addAllowedTopic,
    addUser: addAllowedUser,
    getTopics: getAllowedTopics,
    getUsers: getAllowedUsers,
    run: run,
    setTopics: setAllowedTopics,
    setUsers: setAllowedUsers
  };
})();
