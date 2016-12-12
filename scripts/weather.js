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
          // clear:"url(http://leverhawk.com/wp-content/uploads/2013/09/iStock_000012580113Medium.jpg)",
          // rain:"url(http://www.savetherain.org/fp/users/1/pages/1/save-the-rain_bg-001.jpg)",
          // thunderstorm:"url(http://martinschmaltz.com/wp-content/uploads/thunderstorm.jpg)",
          // atmosphere:"url(http://all4desktop.com/data_images/original/4248124-fog.jpg)",
          // drizzle:"url(http://4.bp.blogspot.com/-my7Ku-_3ZXA/VAYu7mQue-I/AAAAAAAAChQ/Q48yH0L6OZU/s1600/Rain.JPG)",
          // snow:"url(http://cdn.paper4pc.com/images/nature-landscapes-trees-forest-winter-snow-seasons-snowing-snowfall-flakes-blizzard-storm-white-wallpaper-1.jpg)",
          // clouds:"url(http://cdn01.pelfusion.com/wp-content/uploads/2009/07/treeinclouds.jpg)",
          // extreme:"url(http://kidsahead.com/system/ka_heros/6/original/Hurricane%20Hero%20Image_Wikimedia.png?1327958517)",
          // additional:"url(http://www.nbc.com/sites/nbcunbc/files/files/images/2015/4/25/150423_2861308_El_Nino.jpg)",
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
