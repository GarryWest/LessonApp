var CalendarRange = {

  DAY : 24 * 60 * 60 * 1000,

  prepareDate : function(date) {
    date = new Date(date);
    var day = date.getDay();
    return {
      date : date,
      weekday : day !== 0 && day !== 6,
      day : date.getDate(),
      month : date.getMonth(),
      year : date.getFullYear()
    };
  },

  getMonthlyRange : function(date, dataService) {
    var month = date.getMonth();
    var startDay = new Date(date);
    startDay.setDate(1);

    var firstDay = new Date(startDay);
    if (firstDay.getDay() > 0) { //Not Sunday
      firstDay.setDate(firstDay.getDate() - (firstDay.getDay()));
    }

    var endDay = new Date(startDay);
    if(month === 11) {
      endDay.setMonth(0);
      endDay.setYear(endDay.getFullYear() + 1);
    } else {
      endDay.setMonth(month + 1);
    }

    endDay.setDate(endDay.getDate() - 1);

    var lastDay = new Date(endDay);
    lastDay.setDate(lastDay.getDate() + (6 - endDay.getDay()));

    var day = new Date(firstDay);
    var days = [];
    var appointments = [];

    var selectedYear = date.getFullYear(); //getFullYear();
    var today = new Date();
    var thisYear = today.getFullYear();
    var years = [];
      var then = thisYear - 20;
      for(var i=then;i<=thisYear + 20;i++) {
        years.push(i);
      };
console.log(selectedYear);
console.log(month);      
    var yearPos = years.indexOf(selectedYear);
    var savedData = dataService.getDataResponse(yearPos, month);

    var iCount = 0;
    while(day <= lastDay) {
      //var thisDate = day.getDate();
      var thisDay = day.getDate();
      var thisMonth = day.getMonth()+1;
      var thisYear = day.getFullYear();

      days.push(this.prepareDate(day));
      var thisDate = null;
//console.log(yearPos);
//console.log(month);
//console.log(iCount);
      appointments.push( savedData[iCount] || {displayDate:(thisMonth+'/' + thisDay + '/' + thisYear), student:'', time: thisDate, instrument:''});

      day.setDate(day.getDate() + 1);
      
      iCount ++;
    };
    dataService.saveDataResponse(yearPos, month, appointments);



    return {
      first : firstDay,
      start : startDay,
      end : endDay,
      last : lastDay,
      days : days,
      appointments : appointments
    };
  }

};