var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Room = mongoose.model('Room');

module.exports = function(app) {
  app.use('/', router);
};

router.get('/api/room/:code', function(req, res, next) {
  Room.findById(req.params.code, function(err, room) {
    if (err) {
      res.json('404', {
        'error': 'Not found'
      });
    }
    res.json({
      'room': room
    });
  });
});

router.post('/api/room', function(req, res, next) {
  var room = new Room();
  room.save(function(err) {
    if (err) {
      res.json('500',{
        'error': 'Error creating room'
      });
      return false;
    } else {
      res.json({
        'room': room
      });
    }
  })
});

// io.sockets.on('connection', function (socket) {
//     socket.emit('message', { message: 'welcome to the chat' });
//     // socket.on('send', function (data) {
//     //     io.sockets.emit('message', data);
//     // });
// });

// router.post('/api/room/:code/open', function(req, res, next) {
//   var room = new Room();
//   room.save(function(err) {
//     if (err) {
//       res.json('500',{
//         'error': 'Error creating room'
//       });
//       return false;
//     } else {
//       res.json({
//         'room': room
//       });
//     }
//   })
// });
