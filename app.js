var app = angular.module('myApp', ['ngMaterial', 'ngRoute'])
.config(function($routeProvider){
    $routeProvider.when('/add-project',
    {
        templateUrl:'templates/add-project.html',
        controller:'appController'
    });
    $routeProvider.when('/add-task',
    {
        templateUrl:'templates/add-task.html',
        controller:'appController'
    });
    $routeProvider.when('/open-task',
    {
        templateUrl:'templates/open-task.html',
        controller:'appController'
    });
});
