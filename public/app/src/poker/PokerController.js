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
    vm.err = null;

    socket.on('clients', function(data){
      console.log(data);
    })

    function goToCode() {
      resetErr();
      resetRoom();
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

    function choose(idx){
      vm.choosed = idx;
    }

    function resetErr(){
      vm.err = null;
    }

    function resetRoom(){
      vm.room = {};
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

    // var self = this;
    //
    // self.selected     = null;
    // self.users        = [ ];
    // self.selectUser   = selectUser;
    // self.toggleList   = toggleUsersList;
    // self.showContactOptions  = showContactOptions;
    //
    // // Load all registered users
    //
    // userService
    //       .loadAllUsers()
    //       .then( function( users ) {
    //         self.users    = [].concat(users);
    //         self.selected = users[0];
    //       });
    //
    // // *********************************
    // // Internal methods
    // // *********************************
    //
    // /**
    //  * First hide the bottomsheet IF visible, then
    //  * hide or Show the 'left' sideNav area
    //  */
    // function toggleUsersList() {
    //   var pending = $mdBottomSheet.hide() || $q.when(true);
    //
    //   pending.then(function(){
    //     $mdSidenav('left').toggle();
    //   });
    // }
    //
    // /**
    //  * Select the current avatars
    //  * @param menuId
    //  */
    // function selectUser ( user ) {
    //   self.selected = angular.isNumber(user) ? $scope.users[user] : user;
    //   self.toggleList();
    // }
    //
    // /**
    //  * Show the bottom sheet
    //  */
    // function showContactOptions($event) {
    //     var user = self.selected;
    //
    //     return $mdBottomSheet.show({
    //       parent: angular.element(document.getElementById('content')),
    //       templateUrl: '/src/users/view/contactSheet.html',
    //       controller: [ '$mdBottomSheet', ContactPanelController],
    //       controllerAs: "cp",
    //       bindToController : true,
    //       targetEvent: $event
    //     }).then(function(clickedItem) {
    //       clickedItem && $log.debug( clickedItem.name + ' clicked!');
    //     });
    //
    //     /**
    //      * Bottom Sheet controller for the Avatar Actions
    //      */
    //     function ContactPanelController( $mdBottomSheet ) {
    //       this.user = user;
    //       this.actions = [
    //         { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
    //         { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
    //         { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
    //         { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
    //       ];
    //       this.submitContact = function(action) {
    //         $mdBottomSheet.hide(action);
    //       };
    //     }
    // }

  }

})();
