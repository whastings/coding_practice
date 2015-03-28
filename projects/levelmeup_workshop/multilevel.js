var level = require('level'),
    multilevel = require('multilevel'),
    net = require('net'),
    connection = net.connect(4545),
    db = multilevel.client();

connection.pipe(db.createRpcStream()).pipe(connection);

db.get('multilevelmeup', function(err, value) {
  if (err) throw err;
  console.log(value);
  connection.close();
});
