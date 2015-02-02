$( document ).ready(function() {

  var show_lat_lon = $("#show-lat-lon"),
      show_lat_lon_text = $("#show-lat-lon-text");

  var lat = 37.74,
      lon = -122.43;

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

    var date_test1 = new Date(datepicker1);
    var date_test2 = new Date(datepicker2);
    console.log(datepicker1);
    console.log(date_test1);
    console.log(date_test1.getDate());
    console.log(datepicker2);
    console.log(date_test2);
    console.log(date_test2.getMonth());
    // alert( datepicker1 + " " + datepicker2 );

    $.get("http://api.worldweatheronline.com/free/v2/past-weather.ashx?key=38605afdfa427945d06311e0e6ac3&q="+lat+","+lon+"&date="+datepicker1+"&enddate="+datepicker2+"&format=json")
      .done(function(parsed_json){
        console.log(parsed_json);
      .fail(function(){
        console.log("worldweatheronline failed");
      });
    });

  });

});



