var express = require('express'),
  router = express.Router(),
  room = require('./controllers/room');

module.exports = function(app) {
  app.use('/', router);
};

router.get('/api/room/:code', room.get);
router.post('/api/room', room.create);
