'use strict';

/**
 * @ngdoc overview
 * @name lessonsApp
 * @description
 * # lessonsApp
 *
 * Main module of the application.
 */
angular
  .module('lessonsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'AppCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/day/:dayCode', {
        templateUrl: 'views/day.html',
        controller: 'DayCtrl',
        resolve : {
               dayDetails : ['$rootScope', '$route', 'dataService', function($rootScope, $route, dataService) {
                 var dayIndex = $route.current.params.dayCode; //arrayObjectIndexOf($rootScope.countries, $route.current.params.dayCode);
                 var dayData = dataService.getDataResponse();
                 return dayData[dayIndex];
               }],
               dayCode : ['$route', function($route) {
                 var dayIndex = $route.current.params.dayCode;
                 return dayIndex;
               }]
         }
      })
      .otherwise({
        redirectTo: '/'
      });
  });

