$( document ).ready(function() {

  var show_lat_lon = $("#show-lat-lon");
  var show_lat_lon_text = $("#show-lat-lon-text");
// console.log(show_lat_lon_text);
  $( "#get-weather-in-user-location" ).on( "click" , function( event ) {

    show_lat_lon_text.html('Your current location is:');
    show_lat_lon.html('<img src="./img/ajax_loader_blue_48.gif" alt="Getting your geolocation...">');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }

    function showPosition(position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      var str = "Latitude: " + lat + "<br> Longitude: " + lon;

      show_lat_lon.html(str);
      // setTimeout(function(){
      //   show_lat_lon.html("JAJAJAJAJAJA");
      // }, 2000);

      // $.get("http://api.wunderground.com/api/b3470e04ab9d6728/geolookup/conditions/q/"+lat+","+lon+".json").done(function(parsed_json){

      //   // $.ajax({
      //   //   url : "http://api.wunderground.com/api/b3470e04ab9d6728/geolookup/conditions/q/"+lat+","+lon+".json",
      //   //   dataType : "jsonp",
      //   //   success : function(parsed_json) {
      //   console.log(parsed_json);
      // });
    }

  });

  $( "#get-weather-from-input" ).on( "click" , function( event ) {
    event.preventDefault();
    var location = $( "#location-input" ).val();
    console.log(location);
    // alert( "As you can see, the link no longer took you to jquery.com" );


  });
});



