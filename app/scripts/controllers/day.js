'use strict';

/**
 * @ngdoc function
 * @name lessonsApp.controller:DayCtrl
 * @description
 * # DayCtrl
 * Controller of the lessonsApp
 */
angular.module('lessonsApp')
	.controller('DayCtrl', ['$scope', 'dayDetails', 'dayCode', 'dataService', 'yearCode', 'monthCode', function ($scope, dayDetails, dayCode, dataService, yearCode, monthCode) {
		$scope.dayCode = dayCode;
        $scope.yearCode = yearCode;
        $scope.monthCode = monthCode;
  		$scope.dayDetails = dayDetails;
		$scope.submit = function(){
			var oldData = dataService.getDataResponse(yearCode, monthCode);
			oldData[$scope.dayCode] = $scope.dayDetails;
			dataService.saveDataResponse(yearCode, monthCode, oldData);
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
        $scope.clear = function(event){
            event.preventDefault();
            dayDetails.student = null;
            dayDetails.time = null;
            dayDetails.instrument = null;
            var oldData = dataService.getDataResponse(yearCode, monthCode);
            oldData[$scope.dayCode] = $scope.dayDetails;
            dataService.saveDataResponse(yearCode, monthCode, oldData);
            if (window.navigate) {
                window.navigate ("#");
            }
            else {
                location.assign ("#");
            };
        };
  }]);
