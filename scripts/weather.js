$(document).ready(function() {
  var city;
  var country;
  var $main = $('#main');
  var units = "imperial";
  var tempAbbr;
  var speedAbbr;

  // location
  function loadWeather() {
    if (units == "imperial") {
      $('#units').text("Convert to Metric");
      tempAbbr = "F";
      speedAbbr = "MPH";
    } else {
      $('#units').text("Convert to Imperial");
      tempAbbr = "C";
      speedAbbr = "km/h";
    }

    $.ajax({
      url: "http://ip-api.com/json/?callback=?",
      dataType: 'json',
      method: 'GET',
    }).done(function(loc) {
      var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + loc.lat + "&lon=" + loc.lon + "&appid=072a42af4eb157714427a895c8f71581&units=" + units;
      var forcastUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + loc.lat + "&lon=" + loc.lon + "&appid=072a42af4eb157714427a895c8f71581&units=" + units;
      $main.append("<h2>" + loc.city + ", " + loc.region +"</h2>");

     // today
     $.ajax({
       url: url,
       dataType: 'json',
       method: 'GET',
     }).done(function(data) {
       $main.append("<h3>Today</h3>");
       $main.append("Weather: " + data.weather[0].main + "<br>");
       $main.append("Temp: " + data.main.temp.toFixed(1) + "&deg; " + tempAbbr + "<br>");
       $main.append("Humidity: " + data.main.humidity + "%<br>");
       $main.append("Wind: " + data.wind.speed + " " + speedAbbr + "<br>");
       $main.append("Clouds: " + data.clouds.all + "<br>");
     });

     // forcast
     $.ajax({
        url: forcastUrl,
        dataType: 'jsonp',
        method: 'GET',
      }).done(function(data) {
        for (var i = 0; i < data.list.length; i += 8) {
          $main.append("<h3>" + data.list[i].dt_txt.substring(5, 10) + "</h3>");
          $main.append("Weather: " + data.list[i].weather[0].main + "<br>");
          $main.append("Temp: " + data.list[i].main.temp.toFixed(1) + "&deg; " + tempAbbr + "<br>");
          $main.append("Humidity: " + data.list[i].main.humidity + "%<br>");
          $main.append("Wind: " + data.list[i].wind.speed + " " + speedAbbr + "<br>");
          $main.append("Clouds: " + data.list[i].clouds.all + "<br>");
        }
        // background image
        $.getJSON(url, function(data) {
          var weatherId = data.weather[0].id;
          var imgUrl = {
          clear:"url(http://i.imgur.com/93py8g1.jpg)",
          rain:"url(http://i.imgur.com/VbPJhx7.jpg)",
          thunderstorm:"url(http://i.imgur.com/eutmkWK.jpg?1)",
          atmosphere:"url(http://i.imgur.com/gUG3cHy.jpg)",
          drizzle:"url(http://i.imgur.com/6JVtdbq.jpg)",
          snow:"url(http://i.imgur.com/xXVZtwU.jpg)",
          clouds:"url(http://i.imgur.com/QmcfvfD.jpg)",
          extreme:"url(http://i.imgur.com/4SURY5V.png)",
          additional:"url(http://i.imgur.com/l7dkX2p.jpg?1)",
          }
          var backgroundImg = "";
          function selectImg(weatherId){
            if(weatherId === 800) backgroundImg = imgUrl.clear;
            else if(weatherId >= 200 && weatherId <= 232) backgroundImg = imgUrl.thunderstorm;
            else if(weatherId >= 500 && weatherId <= 531) backgroundImg = imgUrl.drizzle;
            else if(weatherId >= 600 && weatherId <= 622) backgroundImg = imgUrl.snow;
            else if(weatherId >= 701 && weatherId <= 781) backgroundImg = imgUrl.atmosphere;
            else if(weatherId >= 801 && weatherId <= 804) backgroundImg = imgUrl.clouds;
            else if(weatherId >= 900 && weatherId <= 906) backgroundImg = imgUrl.extreme;
            else if(weatherId >= 951 && weatherId <= 962) backgroundImg = imgUrl.additional;
             else backgroundImg = '';
          }
          selectImg(weatherId);
          var cssProp = "background";
          var cssValue = backgroundImg + "no-repeat fixed";
          $("html").css(cssProp, cssValue);
          $("html").css("background-size", "cover");
          

          //text color dependent on background
          
        var white = {"color": "white", "text-shadow":"3px 3px black"};
        var red = {"color": "red", "text-shadow":"3px 3px white"};
        var black = {"color": "#black", "text-shadow":"3px 3px #ddd"};
        var $title = $('#title').css({'color': 'white', 'text-shadow': '3px 3px red'});

          if(backgroundImg === imgUrl.thunderstorm) $main.css(white) && $title;
          else if(backgroundImg === imgUrl.drizzle) $main.css(white) && $title;
          else if(backgroundImg === imgUrl.snow) $main.css(red) && $title;
          else if(backgroundImg === imgUrl.atmosphere) $main.css(white) && $title;
          else if(backgroundImg === imgUrl.clouds) $main.css(white) && $title;
          else if(backgroundImg === imgUrl.extreme) $main.css(black) && $title;
          else if(backgroundImg === imgUrl.additional) $main.css(white) && $title;
          else if(backgroundImg === imgUrl.clear) $main.css(red) && $title;


          //Icon code
          var iconUrl = "http://openweathermap.org/img/w/";
          var iconImg = iconUrl + data.weather[0].icon + '.png';
          $("img").attr("src", iconImg);

        });
      });
    });
  }

  loadWeather();
  $('#units').on('click', function() {
    $('#main').html('');
    units == "metric" ? units = "imperial" : units = "metric";
    loadWeather();
  });
 

});
