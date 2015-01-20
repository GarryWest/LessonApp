'use strict';

describe('Controller: AppCtrl', function () {

  // load the controller's module
  beforeEach(module('lessonsApp'));

  var AppCtrl,
    scope,
    $compile,
    $rootScope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _$rootScope_, _$compile_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
    scope = $rootScope.$new();
    AppCtrl = $controller('AppCtrl', {
      $scope : scope,
      yearCode : 2015,
      monthCode : 1
    });
  }));

  describe('$scope.months', function(){
    it('should attach a list of months to the scope', function () {
      expect(scope.months.length).toBe(12);
    });
  });

  describe('$scope.years', function(){
    it('should attach a list of years to the scope', function(){
      expect(scope.years.length).toBe(41);
    });
  });

  describe('Directive myCalendar', function(){
    it('Replaces the element with the appropriate content', function() {
      var html="";
      html += "<my-calendar>";
      html += "monkey";
      html += "</my-calendar>";

      var compiled = $compile(html)
      var element = compiled(scope);
      scope.$digest();

      // Check that the compiled element contains the templated content
      expect(element.html()).toContain("monkey");
    });
  });

});
