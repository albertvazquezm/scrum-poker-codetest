

var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose');

  var app = express();
  var server = require('http').Server(app);
  var io = require('socket.io')(server);


mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});

require('./config/express')(app, config);

require(config.root + '/app/sockets/pokerSocket.js')(io);

server.listen(config.port);
