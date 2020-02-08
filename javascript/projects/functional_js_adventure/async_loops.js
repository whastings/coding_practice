function loadUsers(userIds, load, done) {
  var users = {},
      usersLoaded = 0;

  var doneCallback = function() {
    var orderedUsers = [];
    userIds.forEach(function(userId) {
      orderedUsers.push(users[userId]);
    });
    done(orderedUsers);
  };

  var loadCallback = function(id, user) {
    users[id] = user;
    usersLoaded += 1;
    if (usersLoaded === userIds.length) {
      doneCallback();
    }
  };

  userIds.forEach(function(userId) {
    load(userId, loadCallback.bind(null, userId));
  });
}

module.exports = loadUsers;
