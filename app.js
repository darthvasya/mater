var app = angular.module('myApp', ['ngMaterial', 'ngRoute'])
.config(function($routeProvider){
    $routeProvider.when('/projects/:id/add-project',
    {
        templateUrl:'templates/add-project.html'
    });
    $routeProvider.when('/projects/:id/add-task',
    {
        templateUrl:'templates/add-task.html'
    });
    $routeProvider.when('/projects/:id/:task_id',
    {
        templateUrl:'templates/open-task.html'
    });
    $routeProvider.when('/projects/:id',
    {
        templateUrl:'templates/task-list.html',
        controller:'appController'
    });
 
});
