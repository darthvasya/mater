var app = angular.module('myApp', ['ngMaterial', 'ngRoute'])
.config(function($routeProvider){
    $routeProvider.when('/add-project',
    {
        templateUrl:'templates/add-project.html'
    });
    $routeProvider.when('/add-task',
    {
        templateUrl:'templates/add-task.html'
    });
    $routeProvider.when('/open-task',
    {
        templateUrl:'templates/open-task.html'
    });
    $routeProvider.when('/projects/:id',
    {
        templateUrl:'templates/task-list.html',
        controller:'appController'
    });
});
