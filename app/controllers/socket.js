console.log('eded');
//var room = require('./room');

// export function for listening to the socket
module.exports = function (socket, app) {
  socket.on('open', function (id) {
    room.open('alboooooooooooort');
  });
  // socket.emit('clients', { hello: 'world' });
  //
  // // clean up when a user leaves, and broadcast it to other users
  socket.on('disconnect', function () {
    room.substractClient();
  });
};
