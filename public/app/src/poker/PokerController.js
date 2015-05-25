(function() {

  angular
    .module('poker')
    .controller('PokerController', [
      'pokerService', '$mdSidenav', '$mdBottomSheet', '$http', '$q','socket',
      UserController
    ]);

  function UserController(userService, $mdSidenav, $mdBottomSheet, $http, $q, socket) {

    var vm = this;

    vm.code = '';
    vm.room = {};
    vm.cards = generateCards();
    vm.goToCode = goToCode;
    vm.newRoom = newRoom;
    vm.choose = choose;
    vm.votes = [];
    vm.connectedClients = 0;
    vm.err = null;
    vm.end = false;

    socket.on('clients', function(clients){
      vm.connectedClients = clients;
    });

    socket.on('votes', function(votes){
      vm.votes = votes;
    });

    socket.on('end', end)

    function goToCode() {
      resetErr();
      resetRoom();
      closeRoom();
      $http.get('/api/room/' + vm.code).then(function(data) {
        openRoom(data.data.room);
      }, function(err) {
        vm.err = err.data.error;
      })
    }

    function newRoom(){
      resetErr();
      resetRoom();
      $http.post('/api/room').then(function(data) {
        openRoom(data.data.room);
      }, function(err) {
        vm.err = err.data.error;
      })
    }

    function openRoom(room){
      vm.room = room;
      socket.emit('open',room._id);
    }

    function closeRoom(){
      if(vm.room._id){
        socket.emit('close',vm.room._id);
      }
    }

    function choose(idx){
      if(!vm.end && !vm.choosed){
        vm.choosed = idx;
        socket.emit('vote',vm.cards[idx]);
      }
    }

    function resetErr(){
      vm.err = null;
    }

    function resetRoom(){
      vm.room = {};
      vm.end = false;
      vm.connectedClients = 0;
      vm.votes = [];
      vm.choosed = null;
    }

    function generateCards(){
      return [
        0,
        0.5,
        1,
        2,
        3,
        5,
        8,
        13,
        20,
        40,
        100
      ]
    }

    function end(){
      vm.end = true;
    }
  }

})();
