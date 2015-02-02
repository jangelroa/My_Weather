$( document ).ready(function() {

  var show_lat_lon = $("#show-lat-lon"),
      show_lat_lon_text = $("#show-lat-lon-text");

  var lat = 37.74,
      lon = -122.43;

  var weatherDesc;

  var addOrCreateAKey = function(json,key){

    if(json[key]){
      json[key] += 1;
    } else {
      json[key] = 1;
    }
  }

// Clicking the "get the weather in your location" button
  $( "#get-weather-in-user-location" ).on( "click" , function( event ) {

    show_lat_lon_text.html('Your current location is:');
    show_lat_lon.html('<img src="./img/ajax_loader_blue_48.gif" alt="Getting your geolocation...">');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }

    function showPosition(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      var str = "Latitude: " + lat + "<br> Longitude: " + lon;

      show_lat_lon.html(str);
      // setTimeout(function(){
      //   show_lat_lon.html("JAJAJAJAJAJA");
      // }, 2000);


// get data from the wunderground api
      // $.get("http://api.wunderground.com/api/b3470e04ab9d6728/conditions/forecast/q/"+lat+","+lon+".json")
      //   .done(function(parsed_json){
      //     console.log(parsed_json.forecast.simpleforecast.forecastday[0].conditions);
      // });


    }

  });

// Clicking the "get the weather" button
  $( "#get-weather-from-input" ).on( "click" , function( event ) {
    event.preventDefault();
    var location = $( "#location-input" ).val();
    console.log(location);
  });

// Sunny days datapicker
  $( "#datepicker1" ).datepicker({dateFormat: 'yy-mm-dd' });
  $( "#datepicker2" ).datepicker({dateFormat: 'yy-mm-dd' });

// Clicking the "sunny" button
  $( "#sunny" ).on( "click" , function( event ) {
    event.preventDefault();
    var datepicker1 = $( "#datepicker1" ).val();
    var datepicker2 = $( "#datepicker2" ).val();
    // var datepicker1 = $( "#datepicker1" ).datapicker("getDate");

    // var date_test1 = new Date(datepicker1);
    // var date_test2 = new Date(datepicker2);
    // console.log(datepicker1);
    // console.log(date_test1);
    // console.log(date_test1.getDate());
    // console.log(datepicker2);
    // console.log(date_test2);
    // console.log(date_test2.getMonth());
    // alert( datepicker1 + " " + datepicker2 );

    var basicUrlWithKey = "http://api.worldweatheronline.com/free/v2/past-weather.ashx?key=38605afdfa427945d06311e0e6ac3";
    var url = basicUrlWithKey + "&q="+lat+","+lon+"&date="+datepicker1+"&enddate="+datepicker2+"&format=json";
    console.log(url);

    $.get(url)
      .done(function(parsed_json){

        var totalDays = parsed_json.data.weather.length;

        weatherDesc = {};

        for(var i = 0 ; i < totalDays ; i++ ) {
          console.log(parsed_json.data.weather[i].date);

        // hourly[4] match 1400 ( = 2:00pm) to select the weather description
          // console.log(parsed_json.data.weather[i].hourly[4].time);
          console.log(parsed_json.data.weather[i].hourly[4].weatherDesc[0].value);


          addOrCreateAKey(weatherDesc, parsed_json.data.weather[i].hourly[4].weatherDesc[0].value);
        }

        var length = Object.keys(weatherDesc).length;
        console.log(weatherDesc);
        console.log(length);
        console.log(totalDays);

        var porcentageData = {};

        for(x in weatherDesc) {
          console.log(x, Math.round(weatherDesc[x]/totalDays*100*100)/100);
          porcentageData[x] = Math.round(weatherDesc[x]/totalDays*100*100)/100;
        }
        console.log(porcentageData);

      })
      .fail(function(){
        console.log("worldweatheronline failed");
      })
      .always(function(){

      });

      /////// CHART ///////
      var chart = c3.generate({
          data: {
              // iris data from R
              columns: [
                  ['data1', 30],
                  ['data2', 120]
              ],
              type : 'pie',
              onclick: function (d, i) { console.log("onclick", d, i); },
              onmouseover: function (d, i) { console.log("onmouseover", d, i); },
              onmouseout: function (d, i) { console.log("onmouseout", d, i); }
          }
      });

      setTimeout(function () {
          chart.load({
              columns: [
                  ["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
                  ["versicolor", 1.4, 1.5],
                  ["virginica", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8],
              ]
          });
      }, 1500);

      /////// /CHART ///////



  });

});









