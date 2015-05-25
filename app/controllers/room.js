var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Room = mongoose.model('Room');

exports.get = function(req, res, next) {
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
}

exports.create = function(req, res, next) {
  var room = new Room();
  room.save(function(err) {
    if (err) {
      res.json('500', {
        'error': 'Error creating room'
      });
      return false;
    } else {
      res.json({
        'room': room
      });
    }
  })
}

exports.connectUser = function(roomId, cb) {
  Room.findById(roomId, function(err, room) {
    if (err) {
      cb(true);
    }
    if (!room.people) {
      room.people = 1;
    } else {
      room.people++;
    }
    if (room.save()) {
      cb(false, room.people);
    } else {
      cb(true);
    }
  });
}

exports.disconnectUser = function(roomId, cb) {
  if (roomId) {
    Room.findById(roomId, function(err, room) {
      if (err) {
        cb(true);
      }
      if (!room.people) {
        room.people = 0;
      } else {
        room.people = room.people - 1;
      }

      room.save(function(err) {
        if (err) {
          cb(true);
        } else {
          cb(false, room.people);
        }
      });
    });
  } else {
    cb(true);
  }
}

exports.addVote = function(roomId, number, cb) {
  Room.findById(roomId, function(err, room) {
    if (err) {
      cb(true);
    }
    room.votes.push(number);
    if (room.save()) {
      if(room.votes.length === room.people){
        cb(false, room.votes, true);
      }else{
        cb(false, room.votes);
      }

    } else {
      cb(false);
    }
  });
}
