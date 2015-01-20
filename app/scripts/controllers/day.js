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

        // Available Hours
        $scope.timePickerOptions = {
            step: 20,
            timeFormat: 'g:ia',
            appendTo: 'body',
            minTime: '8:00am',
            maxTime: '6:00pm'
        };
        
        // Students collection
        var students = [];
        students.push("Brown, Charlie","Brown, Sally","Pen, Pig","Van Pelt, Lucille");
        $scope.students = students;
        // Instruments collection
        var instruments = [];
        instruments.push("Accordian","Banjo","Fiddle","Guitar","Xylophone");
        $scope.instruments = instruments;

		$scope.dayCode = dayCode;
        $scope.yearCode = yearCode;
        $scope.monthCode = monthCode;
  		$scope.dayDetails = dayDetails;
		$scope.submit = function(){
			var oldData = dataService.getDataResponse(yearCode, monthCode);
			oldData[$scope.dayCode] = $scope.dayDetails;
			dataService.saveDataResponse(yearCode, monthCode, oldData);
			if (window.navigate) {
                window.navigate ("#/"+yearCode+"/"+monthCode);
            }
            else {
                location.assign ("#/"+yearCode+"/"+monthCode);
            };
		};
		$scope.cancel = function(event){
            event.preventDefault();
            if (window.navigate) {
                window.navigate ("#/"+yearCode+"/"+monthCode);
            }
            else {
                location.assign ("#/"+yearCode+"/"+monthCode);
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
                window.navigate ("#/"+yearCode+"/"+monthCode);
            }
            else {
                location.assign ("#/"+yearCode+"/"+monthCode);
            };
        };
  }]);
