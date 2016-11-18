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

      if(id!==undefined){
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



  $scope.createNewProject = function (projectName) {
    if (projectName !== undefined) {
      let newProject = {
              id: makeid(),
              name: projectName,
              taskCount: 0,
              days:[]
      }
      console.log(newProject);
      $scope.projects.push(newProject);
      $scope.close();
    }
  }

  $scope.createNewTask = function (taskName, taskDesc) {
    console.log(123);
    if (taskName !== undefined && taskDesc !== undefined) {
      let projectId = 0;
      let day_date = '';

      let task = {
        id_task: makeid(),
        task_name: taskName,
        description: taskDesc
      };

      console.log(task);
      console.log($scope.currentProjectObject);
      if ($scope.currentProjectObject.days.length !== 0) {
        angular.forEach($scope.currentProjectObject.days, function (val, ke) {
          console.log(val.date);
          if(val.date == getCurrentDate()) {
            day_date = val.date;
            val.tasks.push(task);
            console.log(val);
            $scope.currentProjectObject.taskCount += 1;
          }
        });
      } else {
        let day ={
          date: getCurrentDate(),
          tasks: [task]
        };
        $scope.currentProjectObject.days.push(day);
        $scope.currentProjectObject.taskCount += 1;
        console.log($scope.currentProjectObject);
      }

    }
  }

  function getCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    today = dd+'.'+mm + '.' + yyyy;
    return today;
  }

  function makeid()
  {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i=0; i < 15; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
  }

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
