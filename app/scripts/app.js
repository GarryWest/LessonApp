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
    'ngTouch',
    'ui.timepicker'
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
      .when('/day/:dayCode/:yearCode/:monthCode', {
        templateUrl: 'views/day.html',
        controller: 'DayCtrl',
        resolve : {
               dayDetails : ['$rootScope', '$route', 'dataService', function($rootScope, $route, dataService) {
                 var dayIndex = $route.current.params.dayCode; //arrayObjectIndexOf($rootScope.countries, $route.current.params.dayCode);
                 var yearCode = $route.current.params.yearCode;
                 var monthCode = $route.current.params.monthCode;
                 var dayData = dataService.getDataResponse(yearCode, monthCode);
                 return dayData[dayIndex];
               }],
               dayCode : ['$route', function($route) {
                 var dayIndex = $route.current.params.dayCode;
                 return dayIndex;
               }],
               yearCode : ['$rootScope', '$route', function($rootScope, $route) {
                 var yearCode = $route.current.params.yearCode;
                 return yearCode;
               }],
               monthCode : ['$rootScope', '$route', function($rootScope, $route) {
                 var monthCode = $route.current.params.monthCode;
                 return monthCode;
               }]
         }
      })
      .otherwise({
        redirectTo: '/'
      });
  });

