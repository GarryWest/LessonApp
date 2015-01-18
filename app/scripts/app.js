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
        controller: 'AppCtrl',
        resolve : {
               yearCode : ['$route', function($route) {
                  var today = new Date();
                  var yearCode = today.getFullYear();
                  return yearCode;
               }],
               monthCode : ['$route', function($route) {
                  var today = new Date();
                  var monthCode = today.getMonth();
                  return monthCode;
               }]
        }
      })
      .when('/:yearCode/:monthCode', {
        templateUrl: 'views/main.html',
        controller: 'AppCtrl',
        resolve : {
         yearCode : ['$route', function($route) {
            var yearIndex = $route.current.params.yearCode;

            var today = new Date();
            var thisYear = today.getFullYear();
            var years = [];
            var then = thisYear - 20;
            for(var i=then;i<=thisYear + 20;i++) {
              years.push(i);
            };
            var yearCode = years[yearIndex];
           return yearCode;
         }],
         monthCode : ['$route', function($route) {
           var monthCode = $route.current.params.monthCode;
           return monthCode;
         }]
        }
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

