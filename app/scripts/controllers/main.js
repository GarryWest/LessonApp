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
		var iMonth = 12;
		var iYear = 41;
		var dataResponse = new Array();
		var i = 0;
		var j = 0;
		for (i=0;i<iYear;i++) {
		 	dataResponse[i]=new Array();
		 	for (j=0;j<iMonth;j++) {
		  		dataResponse[i][j]=0;
		 	}
		};
        return {
            saveDataResponse:function (year, month, data) {
                dataResponse[year][month] = data;
            },
            getDataResponse:function (year, month) {
                return dataResponse[year][month];
            }
        };
    })
    .controller('AppCtrl', function($scope, yearCode, monthCode) {
	    var today = new Date();

	    var year = yearCode || today.getFullYear();
	    var month = monthCode || today.getMonth();
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

      		var tmpDate = $scope.currentDate;
  			var month = tmpDate.getMonth();
		    var selectedYear = tmpDate.getFullYear(); //getFullYear();
			var today = new Date();
			var thisYear = today.getFullYear();
			var years = [];
			var then = thisYear - 20;
			for(var i=then;i<=thisYear + 20;i++) {
			    years.push(i);
			};
			var yearPos = years.indexOf(selectedYear);

			$scope.monthKey = month;
			$scope.yearKey = yearPos;


	    });

	    $scope.doMove = function(year, month){
        	if (window.navigate) {
                window.navigate ("#/"+year+"/"+month);
            }
            else {
                location.assign ("#/"+year+"/"+month);
            };
        };

	    $scope.moveBack = function(){
	    	
         	var tmpMonth = Number($scope.monthKey);
        	var tmpYear = Number($scope.yearKey);

        	if (tmpMonth > 0 || tmpYear > 0) {
        		tmpMonth = tmpMonth - 1;
        		if (tmpMonth < 0) {
        			tmpMonth = 11;
        			tmpYear = tmpYear - 1;
        		}
        	}
        	var result = $scope.doMove(tmpYear, tmpMonth);
        };

        $scope.moveForward = function(){

        	var tmpMonth = Number($scope.monthKey);
        	var tmpYear = Number($scope.yearKey);

        	if (tmpMonth <= 11 || tmpYear <= 40) {
        		tmpMonth = tmpMonth + 1;
        		if (tmpMonth > 11) {
        			tmpMonth = 0;
        			tmpYear = tmpYear + 1;
        		}
        	}
        	var result = $scope.doMove(tmpYear, tmpMonth);
        };
        
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

	        scope.$watch(attrs.myCalendar, function(date, $rootscope, attrs) {
	          if(!date) return;
	          var range = CalendarRange.getMonthlyRange(date, dataService);
	          var appointments = range.appointments;
	          $rootscope.appointments = range.appointments;

	          containerScope.$destroy();
	          containerScope = scope.$new();
	          container.html('');

				var month = date.getMonth();
			    var selectedYear = date.getFullYear(); //getFullYear();
				var today = new Date();
				var thisYear = today.getFullYear();
				var years = [];
				var then = thisYear - 20;
				for(var i=then;i<=thisYear + 20;i++) {
				    years.push(i);
				};
				var yearPos = years.indexOf(selectedYear);

		        angular.forEach(range.days, function(day, dayKey) {
		            var newScope = containerScope.$new();
		            newScope.day = day;
		            newScope.dayKey = dayKey;

		            newScope.monthKey = month;
		            newScope.yearKey = yearPos;


		            newScope.appointments = appointments[dayKey];	

		            transclude(newScope, function(newElement) {
		              newElement.addClass('calendar-cell');
		              container.append(newElement);
		            });
		          });

		        }
		      );
	      }
	    }
	}]);

