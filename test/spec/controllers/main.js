'use strict';

describe('Controller: AppCtrl', function () {

  // load the controller's module
  beforeEach(module('lessonsApp'));

  var AppCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AppCtrl = $controller('AppCtrl', {
      $scope : scope,
      yearCode : function() { return true; },
      monthCode : function() { return true; }
    });
  }));

  it('should attach a list of months to the scope', function () {
    expect(scope.months.length).toBe(12);
  });
});
