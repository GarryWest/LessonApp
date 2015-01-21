describe('Test Pages', function() {
  
  var ROOT = "http://localhost:9001/#";

  it ('should display current month and year', function() {
  
    browser.get(ROOT);

    expect(element(by.model('date.month')).$('option:checked').getText()).toEqual('January');
    expect(element(by.model('date.year')).$('option:checked').getText()).toEqual('2015');
    
  });

  it ('should move to the next month', function() {
  
    var forwardButton = element(by.css('[ng-click="moveForward()"]'));
    forwardButton.click();

    expect(element(by.model('date.month')).$('option:checked').getText()).toEqual('February');
    expect(element(by.model('date.year')).$('option:checked').getText()).toEqual('2015');
    
  });


  it ('should move back to current month and year', function() {
  
    var backButton = element(by.css('[ng-click="moveBack()"]'));
    backButton.click();

    expect(element(by.model('date.month')).$('option:checked').getText()).toEqual('January');
    expect(element(by.model('date.year')).$('option:checked').getText()).toEqual('2015');
    
  });


});
