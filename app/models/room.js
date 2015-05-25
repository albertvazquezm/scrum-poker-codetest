// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var RoomSchema = new Schema({
  code: String,
  people: Number,
  votes: []
});

mongoose.model('Room', RoomSchema);
