var CalendarRange={DAY:864e5,prepareDate:function(a){a=new Date(a);var b=a.getDay();return{date:a,weekday:0!==b&&6!==b,day:a.getDate(),month:a.getMonth(),year:a.getFullYear()}},getMonthlyRange:function(a,b){var c=a.getMonth(),d=new Date(a);d.setDate(1);var e=new Date(d);e.getDay()>0&&e.setDate(e.getDate()-e.getDay());var f=new Date(d);11===c?(f.setMonth(0),f.setYear(f.getFullYear()+1)):f.setMonth(c+1),f.setDate(f.getDate()-1);var g=new Date(f);g.setDate(g.getDate()+(6-f.getDay()));for(var h=new Date(e),i=[],j=[],k=a.getFullYear(),l=new Date,m=l.getFullYear(),n=[],o=m-20,p=o;m+20>=p;p++)n.push(p);for(var q=n.indexOf(k),r=b.getDataResponse(q,c),s=0;g>=h;){var t=h.getDate(),u=h.getMonth()+1,m=h.getFullYear();i.push(this.prepareDate(h));var v=null;j.push(r[s]||{displayDate:u+"/"+t+"/"+m,student:"",time:v,instrument:""}),h.setDate(h.getDate()+1),s++}return b.saveDataResponse(q,c,j),{first:e,start:d,end:f,last:g,days:i,appointments:j}}};angular.module("lessonsApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.timepicker"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"AppCtrl",resolve:{yearCode:["$route",function(){var a=new Date,b=a.getFullYear();return b}],monthCode:["$route",function(){var a=new Date,b=a.getMonth();return b}]}}).when("/:yearCode/:monthCode",{templateUrl:"views/main.html",controller:"AppCtrl",resolve:{yearCode:["$route",function(a){for(var b=a.current.params.yearCode,c=new Date,d=c.getFullYear(),e=[],f=d-20,g=f;d+20>=g;g++)e.push(g);var h=e[b];return h}],monthCode:["$route",function(a){var b=a.current.params.monthCode;return b}]}}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/day/:dayCode/:yearCode/:monthCode",{templateUrl:"views/day.html",controller:"DayCtrl",resolve:{dayDetails:["$rootScope","$route","dataService",function(a,b,c){var d=b.current.params.dayCode,e=b.current.params.yearCode,f=b.current.params.monthCode,g=c.getDataResponse(e,f);return g[d]}],dayCode:["$route",function(a){var b=a.current.params.dayCode;return b}],yearCode:["$rootScope","$route",function(a,b){var c=b.current.params.yearCode;return c}],monthCode:["$rootScope","$route",function(a,b){var c=b.current.params.monthCode;return c}]}}).otherwise({redirectTo:"/"})}]),angular.module("lessonsApp").factory("dataService",function(){var a=12,b=41,c=new Array,d=0,e=0;for(d=0;b>d;d++)for(c[d]=new Array,e=0;a>e;e++)c[d][e]=0;return{saveDataResponse:function(a,b,d){c[a][b]=d},getDataResponse:function(a,b){return c[a][b]}}}).controller("AppCtrl",["$scope","yearCode","monthCode",function(a,b,c){var d=new Date,e=b||d.getFullYear(),f=c||d.getMonth();a.date={year:e,month:f},a.isCurrentMonth=function(b){return b.getMonth()==a.date.month},a.months="january,february,march,april,may,june,july,august,september,october,november,december".split(",");for(var g=[],h=e-20,i=h;e+20>=i;i++)g.push(i);a.years=g,a.$watchCollection("date",function(b){a.currentDate=new Date(b.year,b.month,1);for(var c=a.currentDate,d=c.getMonth(),e=c.getFullYear(),f=new Date,g=f.getFullYear(),h=[],i=g-20,j=i;g+20>=j;j++)h.push(j);var k=h.indexOf(e);a.monthKey=d,a.yearKey=k}),a.moveBack=function(){var b=Number(a.monthKey),c=Number(a.yearKey);(b>0||c>0)&&(b-=1,0>b&&(b=11,c-=1)),window.navigate?window.navigate("#/"+c+"/"+b):location.assign("#/"+c+"/"+b)},a.moveForward=function(){var b=Number(a.monthKey),c=Number(a.yearKey);(11>=b||40>=c)&&(b+=1,b>11&&(b=0,c+=1)),window.navigate?window.navigate("#/"+c+"/"+b):location.assign("#/"+c+"/"+b)}}]).directive("myCalendar",["dataService",function(a){return{terminal:!0,priority:1e3,transclude:"element",link:function(b,c,d,e,f){var g=b.$new(),h=angular.element("<div></div>");h.addClass("calendar-container"),c.after(h),b.$watch(d.myCalendar,function(c,d){if(c){var e=CalendarRange.getMonthlyRange(c,a),i=e.appointments;d.appointments=e.appointments,g.$destroy(),g=b.$new(),h.html("");for(var j=c.getMonth(),k=c.getFullYear(),l=new Date,m=l.getFullYear(),n=[],o=m-20,p=o;m+20>=p;p++)n.push(p);var q=n.indexOf(k);angular.forEach(e.days,function(a,b){var c=g.$new();c.day=a,c.dayKey=b,c.monthKey=j,c.yearKey=q,c.appointments=i[b],f(c,function(a){a.addClass("calendar-cell"),h.append(a)})})}})}}}]),angular.module("lessonsApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("lessonsApp").controller("DayCtrl",["$scope","dayDetails","dayCode","dataService","yearCode","monthCode",function(a,b,c,d,e,f){a.timePickerOptions={step:20,timeFormat:"g:ia",appendTo:"body",minTime:"8:00am",maxTime:"6:00pm"};var g=[];g.push("Brown, Charlie","Brown, Sally","Pen, Pig","Van Pelt, Lucille"),a.students=g;var h=[];h.push("Accordian","Banjo","Fiddle","Guitar"),a.instruments=h,a.dayCode=c,a.yearCode=e,a.monthCode=f,a.dayDetails=b,a.submit=function(){var b=d.getDataResponse(e,f);b[a.dayCode]=a.dayDetails,d.saveDataResponse(e,f,b),window.navigate?window.navigate("#/"+e+"/"+f):location.assign("#/"+e+"/"+f)},a.cancel=function(a){a.preventDefault(),window.navigate?window.navigate("#/"+e+"/"+f):location.assign("#/"+e+"/"+f)},a.clear=function(c){c.preventDefault(),b.student=null,b.time=null,b.instrument=null;var g=d.getDataResponse(e,f);g[a.dayCode]=a.dayDetails,d.saveDataResponse(e,f,g),window.navigate?window.navigate("#/"+e+"/"+f):location.assign("#/"+e+"/"+f)}}]);