var async = require('async'),
    http = require('http');

var host = process.argv[2],
    port = process.argv[3],
    reqOptions = {hostname: host, port: port, path: '/users/create', method: 'POST'},
    user = {user_id: 1},
    noop = function() {};

async.series([
  function(seriesNext) {
    async.times(5, function(iter, next) {
      var body = JSON.stringify(user);
      reqOptions.headers = {
        'Content-Length': body.length
      };
      var req = http.request(reqOptions, function(res) {
        res.on('data', noop);
        res.on('end', next);
      });

      req.on('error', next);

      req.write(body);
      req.end();
      user.user_id += 1;
    }, function(error) {
      if (error) {
        return seriesNext(error);
      }
      seriesNext(null, 'done');
    });
  },
  function(next) {
    http.get('http://' + host + ':' + port + '/users', function(res) {
      var body = '';
      res.on('data', function(data) {
        body += data;
      });
      res.on('end', function() {
        next(null, body);
      });
    }).on('error', next);
  }
], function(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results[1]);
});
