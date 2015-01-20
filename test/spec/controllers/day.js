'use strict';

describe('Controller: DayCtrl', function () {

  // load the controller's module
  beforeEach(module('lessonsApp'));

  var DayCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DayCtrl = $controller('DayCtrl', {
      $scope: scope,
      dayDetails : function() { return true; },
      dayCode : function() { return true; },
      yearCode : function() { return true; },
      monthCode : function() { return true; }
    });
  }));

  it('should attach a list of students to the scope', function () {
    expect(scope.students.length).toBe(4);
  });

  it('should attach a list of instruments to the scope', function () {
    expect(scope.instruments.length).toBe(5);
  });

});
