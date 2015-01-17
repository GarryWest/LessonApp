'use strict';

/**
 * @ngdoc function
 * @name lessonsApp.controller:DayCtrl
 * @description
 * # DayCtrl
 * Controller of the lessonsApp
 */
angular.module('lessonsApp')
	.controller('DayCtrl', ['$scope', 'dayDetails', 'dayCode', 'dataService', function ($scope, dayDetails, dayCode, dataService) {
		$scope.dayCode = dayCode;
  		$scope.dayDetails = dayDetails;
		$scope.submit = function(){
			var oldData = dataService.getDataResponse();
			oldData[$scope.dayCode] = $scope.dayDetails;
			dataService.saveDataResponse(oldData);
			if (window.navigate) {
                window.navigate ("#");
            }
            else {
                location.assign ("#");
            };
		};
		$scope.cancel = function(event){
            event.preventDefault();
            if (window.navigate) {
                window.navigate ("#");
            }
            else {
                location.assign ("#");
            };
        };
  }]);
