$(document).ready(function() {
  var city;
	var country;
	var $main = $('#main');

  $.ajax({
  	url: "http://ip-api.com/json",
  	dataType: 'json',
  	method: 'GET',
	}).done(function(data){
		city = data.city;
		country = data.countryCode;
	});

  var url = "http://api.openweathermap.org/data/2.5/weather?q="+city+country+"&appid=072a42af4eb157714427a895c8f71581&units=imperial";

	$.ajax({
		url: url,
		dataType: 'jsonp',
		method: 'GET',
	}).done(function(data) {
		console.log(data);
		console.log(data.main.temp)
    $main.append("Location " + data.name + "<br>");
    $main.append("Weather " + data.weather[0].main + "<br>")
		$main.append("Temp " + data.main.temp + "<br>");
    $main.append("Humidity " + data.main.humidity + "<br>");
		$main.append("Wind " + data.wind.speed + "<br>");
		$main.append("Clouds " +data.clouds.all);
    
	});

});
