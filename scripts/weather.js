$(document).ready(function() {



  var city;
  var country;
  var $main = $('#main');



  $.ajax({
    url: "http://ip-api.com/json/?callback=?",
    dataType: 'json',
    method: 'GET',
  }).done(function(loc) {
    var lat = loc.lat;
    var lon = loc.lon;
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=072a42af4eb157714427a895c8f71581&units=imperial";
    var forcastUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=072a42af4eb157714427a895c8f71581&units=imperial" ;

//this will correctly identify your current location for <h2>
    $main.append("<h2>" + loc.city + ", " + loc.region +"</h2>");


   $.ajax({
     url: url,
     dataType: 'json',
     method: 'GET',
   }).done(function(data) {
     $main.append("<h3>Today</h3>");
     $main.append("Weather: " + data.weather[0].main + "<br>")
     $main.append("Temp: " + data.main.temp.toFixed(1) + "&deg; F<br>");
     $main.append("Humidity: " + data.main.humidity + "%<br>");
     $main.append("Wind: " + data.wind.speed + " MPH<br>");
     $main.append("Clouds: " + data.clouds.all + "<br>");

   });

   $.ajax({
      url: forcastUrl,
      dataType: 'jsonp',
      method: 'GET',
    }).done(function(data) {
      var one = $('#1');
      var two = $('#2');
      for (var i = 0; i < data.list.length; i += 8) {
        //console.log(data.list[i]);
        $main.append("<h3>" + data.list[i].dt_txt.substring(5, 10) + "</h3>");
        $main.append("Weather: " + data.list[i].weather[0].main + "<br>");
        $main.append("Temp: " + data.list[i].main.temp.toFixed(1) + "&deg; F<br>");
        $main.append("Humidity: " + data.list[i].main.humidity + "%<br>");
        $main.append("Wind: " + data.list[i].wind.speed + " MPH<br>");
        $main.append("Clouds: " + data.list[i].clouds.all + "<br>");
      }



    });
  });
});
