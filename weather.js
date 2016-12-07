$(document).ready(function() {
	$.ajax({
		url: "http://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid=b1b15e88fa797225412429c1c50c122a1",
		dataType: 'jsonp',
		method: 'GET',
	}).done(function(data) {
		console.log(data);
	});
});