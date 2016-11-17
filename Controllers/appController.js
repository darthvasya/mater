app.controller('appController', function($scope, $timeout, $mdSidenav, $log, $location) {

  $scope.sidenav_type_url = "templates/";

  $scope.toggleRight = buildToggler('right');

  $scope.toggleSidenav = function(type) {
    switch (type) {
      case 'add-project':
       $location.path("add-project")
        break;
      case 'add-task':
       $location.path("add-task")
        break;
      case 'open-task':
       $location.path("open-task")
        break;
    }
    $scope.toggleRight();
  }

  $scope.isOpenRight = function(){
    return $mdSidenav('right').isOpen();
  };

  function debounce(func, wait, context) {
    var timer;

    return function debounced() {
      var context = $scope,
          args = Array.prototype.slice.call(arguments);
      $timeout.cancel(timer);
      timer = $timeout(function() {
        timer = undefined;
        func.apply(context, args);
      }, wait || 10);
    };
  }

  function buildDelayedToggler(navID) {
    return debounce(function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }, 200);
  }

  function buildToggler(navID) {
    return function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }
  }

  $scope.close = function () {
    // Component lookup should always be available since we are not using `ng-if`
    $mdSidenav('right').close()
      .then(function () {
        $log.debug("close RIGHT is done");
      });
  };


});
