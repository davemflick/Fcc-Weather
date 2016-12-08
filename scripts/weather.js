$(document).ready(function() {
  var city;
	var country;
	var $main = $('#main');

  $.ajax({
  	url: "//ip-api.com/json",
  	dataType: 'json',
  	method: 'GET',
	}).done(function(loc) {
    var city = loc.city;
    var data = loc.countryCode;
    var url = "//api.openweathermap.org/data/2.5/weather?q=" + city + country + "&appid=072a42af4eb157714427a895c8f71581&units=imperial";
    var forcastUrl = "//api.openweathermap.org/data/2.5/forecast?q=" + city + country + "&appid=072a42af4eb157714427a895c8f71581&units=imperial";

   $.ajax({
     url: url,
     dataType: 'jsonp',
     method: 'GET',
   }).done(function(data) {
     $main.append("<h2>" + data.name + "</h2>");
     $main.append("<h3>Today</h3>");
     $main.append("Weather: " + data.weather[0].main + "<br>")
     $main.append("Temp: " + data.main.temp + "<br>");
     $main.append("Humidity: " + data.main.humidity + "<br>");
     $main.append("Wind: " + data.wind.speed + "<br>");
     $main.append("Clouds: " + data.clouds.all + "<br>");
   });

   $.ajax({
      url: forcastUrl,
      dataType: 'jsonp',
      method: 'GET',
    }).done(function(data) {
      for (var i = 0; i < data.list.length; i += 8) {
        // console.log(data.list[i]);
        $main.append("<h3>" + data.list[i].dt_txt.substring(5, 10) + "</h3>");
        $main.append("Weather: " + data.list[i].weather[0].main + "<br>");
        $main.append("Temp: " + data.list[i].main.temp + "<br>");
        $main.append("Humidity: " + data.list[i].main.humidity + "<br>");
        $main.append("Wind: " + data.list[i].wind.speed + "<br>");
        $main.append("Clouds: " + data.list[i].clouds.all + "<br>");
      }
    });

	});
});
