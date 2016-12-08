$(document).ready(function() {
  var city;
	var country;
	var $main = $('#main');

  $.ajax({
  	url: "http://ip-api.com/json",
  	dataType: 'json',
  	method: 'GET',
	}).done(function(locInfo){
	 var city = locInfo.city;
	 var data = locInfo.countryCode;
   var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + country + "&appid=072a42af4eb157714427a895c8f71581&units=imperial";
   var forcastUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + country + "&appid=072a42af4eb157714427a895c8f71581&units=imperial";

   $.ajax({
     url: url,
     dataType: 'jsonp',
     method: 'GET',
   }).done(function(data) {
     $main.append("Location " + data.name + "<br>");
     $main.append("Weather " + data.weather[0].main + "<br>")
     $main.append("Temp " + data.main.temp + "<br>");
     $main.append("Humidity " + data.main.humidity + "<br>");
     $main.append("Wind " + data.wind.speed + "<br>");
     $main.append("Clouds " + data.clouds.all);
   });

   $.ajax({
      url: forcastUrl,
      dataType: 'jsonp',
      method: 'GET',
    }).done(function(data) {
      console.log(data);
    });


	});











});
