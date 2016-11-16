(function () {
  'use strict';
  var app = angular.module('myApp', ['ngMaterial']);

//
  app.controller('appController', function($scope, $timeout, $mdSidenav) {

    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
      return function() {
        console.log(componentId);
        $mdSidenav(componentId).toggle();
      }
    }

  });
//

})();
