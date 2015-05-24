// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var RoomSchema = new Schema({
  code: String,
  people: Number
});

// RoomSchema.pre('create', function(next) {
//   this.people
//   next();
// })

mongoose.model('Room', RoomSchema);
