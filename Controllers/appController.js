app.controller('appController', function($scope, $timeout, $mdSidenav, $log, $location, $routeParams, dataService) {
  $scope.sidenav_type_url = "templates/";

  $scope.toggleRight = buildToggler('right');
  $scope.projects = dataService.projects;
  $scope.selected = 0;
  $scope.currentProjectId = 0;
  $scope.currentProjectObject = {};
  $scope.selectedTaskObject = {};
  $scope.selectedTask = 0;

  $scope.select= function(index, id) {
      $location.path("projects/" + id);
     $scope.selected = index;
  };


  $scope.$on("$routeChangeSuccess", function () {
      var id = $routeParams["id"];

      if(id!=='undefined'){
        console.log("Project id: " + id);
        $scope.currentProjectId = id;

        angular.forEach($scope.projects, function (value, key) {
          if(value.id == id) {
            $scope.currentProjectObject = value;
            console.log(value);
          }
        });
      }
  });

  $scope.toggleSidenav = function(type, date, task_id) {
    $scope.selectedTask = task_id;
    console.log(date);

    //ищем выбраный нами тас
    //проходим по дням текущего проекта
    angular.forEach($scope.currentProjectObject.days, function (value, key) {
      if(date == value.date) {
        //далее по таском в нужом дне, получаем объект при совпадении
        angular.forEach(value.tasks, function(val, ke) {
          if(val.id_task == task_id) {
            $scope.selectedTaskObject = val;
            console.log($scope.selectedTaskObject.task_name);
          }
        });
      }
    });

    switch (type) {
      case 'add-project':
       $location.path("add-project");
        break;
      case 'add-task':
       $location.path("add-task");
        break;
      case 'open-task':
      {
        $location.path("open-task");
        console.log($scope.selectedTaskObject.task_name);
      }
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
