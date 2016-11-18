app.controller('appController', function($scope, $timeout, $mdDialog, $mdSidenav, $log, $location, $routeParams, dataService) {
  $scope.sidenav_type_url = "templates/";

  $scope.toggleRight = buildToggler('right');
  $scope.projects = dataService.projects;
  $scope.selected = 0;
  $scope.currentProjectId = 0;
  $scope.currentProjectObject = {};
  $scope.selectedTaskObject = {};
  $scope.selectedTask = 0;
  $scope.haveTasks = true;

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
            angular.forEach(value.days, function (v, k) {
              if(!v.tasks.length !== 0)
                  $scope.haveTasks = true;
            })
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
      $location.path("projects/" + newProject.id);
    }
  }

  $scope.deleteProject = function () {
    angular.forEach($scope.projects, function(value, key) {
      if (value.id == $scope.currentProjectObject.id) {
        $scope.projects.splice(key, 1);
        $scope.currentProjectObject = $scope.projects[0];
        console.log($scope.currentProjectObject);
        if($scope.currentProjectObject !== undefined) {
            $location.path("projects/" + $scope.currentProjectObject.id);
        } else {
            $scope.haveTasks = false;
        }

      }
    });
  }

  $scope.editProject = function (name) {
    console.log(name);
    angular.forEach($scope.projects, function(value, key) {
      if (value.id == $scope.currentProjectObject.id) {
        value.name = name;
      }
    });
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
      if ($scope.currentProjectObject.days.length !== 0) {
        $scope.haveTasks = true;
      }
    }
  }

  $scope.deleteTask = function (task_id) {
    let taskDay;
    angular.forEach($scope.currentProjectObject.days, function (value, key) {
      angular.forEach(value.tasks, function (val, ke) {
        if (val.id_task == task_id) {
          value.tasks.splice(ke, 1);
          taskDay = value.date;
          $scope.currentProjectObject.taskCount -= 1;
        }
        if (value.tasks.length == 0) {
          console.log(taskDay);
          angular.forEach($scope.currentProjectObject.days, function (v, k) {
            if(v.date == taskDay) {
              $scope.currentProjectObject.days.splice(k, 1);
            }
          });
        }
      });
    });

    if ($scope.currentProjectObject.days.length == 0) {
      $scope.haveTasks = false;
    }

    $scope.close();
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
    if(date !== undefined) {
      $scope.selectedTask = task_id;
      console.log(date);

      //ищем выбраный нами тасk
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
    }


    switch (type) {
      case 'add-project':
       $location.path("/projects/" + $scope.currentProjectId + "/add-project");
        break;
      case 'add-task':
       $location.path("/projects/" + $scope.currentProjectId + "/add-task");
        break;
      case 'open-task':
      {
        $location.path("/projects/" + $scope.currentProjectId + "/" + $scope.selectedTaskObject.id_task );
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

  $scope.status = '  ';
  $scope.customFullscreen = false;
  $scope.showPrompt = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
      .title('Edit yout project')
      .textContent('Write a new name')
      .placeholder('Project name')
      .ariaLabel('Project name')
      .initialValue('')
      .targetEvent(ev)
      .ok('Okay!')
      .cancel('No, thanks!');

    $mdDialog.show(confirm).then(function(result) {
      $scope.editProject(result)
    }, function() {
      //no
    });
  };

});
