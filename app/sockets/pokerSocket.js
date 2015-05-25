
var room = require('../controllers/room');

// export function for listening to the socket
module.exports = function (io) {
  var roomId = null;
  io.on('connection', function(socket){
    socket.on('open', function(id){
      roomId = id;
      room.connectUser(id, function(err, clients){
        if(!err && clients){
          emitClients(clients);
        }
      });
    });
    socket.on('close', function(id){
      room.disconnectUser(id, emitClients);
    });
    socket.on('vote', function(number){
      room.addVote(roomId, number, function(err, votes, end){
        if(end){
          socket.broadcast.emit('votes', votes);
          socket.emit('votes', votes);

          socket.broadcast.emit('end');
          socket.emit('end');
        }else if(!err && votes){
          socket.broadcast.emit('votes', votes);
          socket.emit('votes', votes);
        }
      });
    });
    socket.on('disconnect', function () {
      room.disconnectUser(roomId, function(err, clients){
        if(!err && clients){
          emitClients(clients);
        }
      });
    });
    function emitClients(clients){
      socket.broadcast.emit('clients', clients);
      socket.emit('clients', clients);
    }
  });
};
