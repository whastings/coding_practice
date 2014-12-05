(function() {
  var storage = window.localStorage,
      usersKey = 'tweet_filter_allowed_users',
      stringsKey = 'tweet_filter_allowed_strings',
      allowedUsers = storage.getItem(usersKey) || [],
      allowedStrings = storage.getItem(stringsKey) || [],
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
  if (typeof allowedStrings === 'string') {
    allowedStrings = JSON.parse(allowedStrings);
  }

  function addAllowedString(string) {
    allowedStrings.push(string);
    storage.setItem(stringsKey, JSON.stringify(allowedStrings));
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

  function hasAllowedString(tweet) {
    return allowedStrings.some(function(string) {
      var content = tweet.querySelector(CONTENT_SELECTOR).textContent;
      content = content.toLowerCase();
      return content.indexOf(string.toLowerCase()) > -1;
    });
  }

  function isByAllowedUser(tweet) {
    var user = tweet.getAttribute(USERNAME_ATTR);
    return allowedUsers.indexOf(user) > -1;
  }

  function processTweet(tweet) {
    if (isByAllowedUser(tweet) || hasAllowedString(tweet)) {
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

  window.tweetFilter = {
    addString: addAllowedString,
    addUser: addAllowedUser,
    run: run
  };
})();
