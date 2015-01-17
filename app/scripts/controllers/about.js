'use strict';

/**
 * @ngdoc function
 * @name lessonsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the lessonsApp
 */
angular.module('lessonsApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
