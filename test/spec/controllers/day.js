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
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
