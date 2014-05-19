var websocketStream = require('websocket-stream');

var stream = websocketStream('ws://localhost:8000');

stream.write('hello\n');
stream.end();
