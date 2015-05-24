angular
  .module('poker', ['ngMaterial'])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('amber')
      .accentPalette('green', {
        'default' : '500'
      })
      .warnPalette('red');
  });
