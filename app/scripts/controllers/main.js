'use strict';

/**
 * @ngdoc function
 * @name lessonsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the lessonsApp
 */
angular.module('lessonsApp')
	.factory('dataService', function () {
        var dataResponse = [];
        return {
            saveDataResponse:function (data) {
                dataResponse = data;
            },
            getDataResponse:function () {
                return dataResponse;
            }
        };
    })
    .controller('AppCtrl', function($scope) {
	    var today = new Date();
	    var year = today.getFullYear();
	    var month = today.getMonth();

	    $scope.date = {
	      year : year,
	      month : month
	    };

	    $scope.isCurrentMonth = function(date) {
	      return date.getMonth() == $scope.date.month;
	    }

	    $scope.months = ('january,february,march,april,' +
	                    'may,june,july,august,' +
	                    'september,october,november,december').split(',');

	    var years = [];
	    var then = year - 20;
	    for(var i=then;i<=year + 20;i++) {
	      years.push(i);
	    }

	    $scope.years = years;

	    $scope.$watchCollection('date', function(date) {
	      $scope.currentDate = new Date(date.year, date.month, 1);
	    });
  	})
  	.directive('myCalendar', ['dataService', function(dataService) {
	    return {
	      terminal: true,
	      priority : 1000,
	      transclude : 'element',
	      link : function(scope, element, attrs, ctrl, transclude) {
	        var containerScope = scope.$new(); 
	        var container = angular.element('<div></div>');
	        container.addClass('calendar-container');
	        element.after(container);

	        scope.$watch(attrs.myCalendar, function(date, $rootscope) {
	          if(!date) return;

	          var range = CalendarRange.getMonthlyRange(date, dataService);
	          var appointments = range.appointments;
	          $rootscope.appointments = range.appointments;
	          dataService.saveDataResponse(range.appointments);

	          containerScope.$destroy();
	          containerScope = scope.$new();
	          container.html('');

	          angular.forEach(range.days, function(day, dayKey) {
	            var newScope = containerScope.$new();
	            newScope.day = day;
	            newScope.dayKey = dayKey;
	            newScope.appointments = appointments[dayKey];	

	            transclude(newScope, function(newElement) {
	              newElement.addClass('calendar-cell');
	              container.append(newElement);
	            });
	          });

	        });
	      }
	    }
	}]);
