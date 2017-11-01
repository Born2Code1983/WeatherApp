


var currentZipCode;

var far;
var farLow;
var farHigh;

var cel;
var celLow;
var celHigh;

var cityName;
var humdity1;

var latitude;
var longitude;

                                                    /* This is the API for the user allowing location access automatically */

window.onload = function ()
{ 
  getLocation();
}
                                                  /* If Autolocation is allowed */
 function getWeatherAutoLocation(){
  
   weatherDiv = $('#weatherStats');  
  
  $.ajax(         /*Gets the weather info from API    */
    {
      type: 'GET',
      url: 'https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&id=524901&APPID=148548ec10ea120fbace8fa473fea315',
      success: function(orders)
          {
            $.each(orders, function(i, order)
                {  /* Returns the Farenheit temperature Low, Current, High   */
                  far = Math.round((orders.main.temp*(9/5)) -459.67);
                  farLow = Math.round((orders.main.temp_min*(9/5)) -459.67);
                  farHigh = Math.round((orders.main.temp_max*(9/5)) -459.67);

                  /* Returns the Celsius temperature Low, Current, High   */
                  cel = Math.round((far-32)*(5/9));
                  celLow = Math.round((farLow-32)*(5/9));
                  celHigh = Math.round((farHigh-32)*(5/9));
                  humidity1 = orders.main.humidity;
                  cityName = orders.name;

                  farenheightGetInfo(); /*Returns the Farenheit info */
                  switchPic(far);       /*Changes Background based on temperature */
                  humidityCheck(humidity1); /* Displays icon  based on humdiity number */
                });
          }
    });
  }
  

                                                /* This is the API for the user entering a zip code  */

$(document).ready(function() 
{
  weatherDiv = $('#weatherStats');  
            $("#enterButton").click( function() 
                  {
                      getzipcode();          /* Runs a function that retrieves the zipcode from the inputted html input. */

                       $.ajax(         /*Gets the weather info from API    */
                              {
                                 type: 'GET',
                                url: 'https://api.openweathermap.org/data/2.5/weather?zip='+currentZipCode+',us&id=524901&APPID=148548ec10ea120fbace8fa473fea315',
                                 success: function(orders)
                                       {
                                         $.each(orders, function(i, order)
                                            {  /* Returns the Farenheit temperature Low, Current, High   */
                                                far = Math.round((orders.main.temp*(9/5)) -459.67);
                                                farLow = Math.round((orders.main.temp_min*(9/5)) -459.67);
                                                farHigh = Math.round((orders.main.temp_max*(9/5)) -459.67);

                                                /* Returns the Celsius temperature Low, Current, High   */
                                                cel = Math.round((far-32)*(5/9));
                                                celLow = Math.round((farLow-32)*(5/9));
                                                celHigh = Math.round((farHigh-32)*(5/9));
                                                humidity1 = orders.main.humidity;
                                                cityName = orders.name;

                                                farenheightGetInfo(); /*Returns the Farenheit info */
                                                switchPic(far);       /*Changes Background based on temperature */
                                                humidityCheck(humidity1); /* Displays icon  based on humdiity number */
                                            });
                                        }
                              });
                    }
                                      );
});



                                               /* Gets the zip code entered by user and applies it to the golbal variable currentZipCode */
    function getzipcode()
    {
           currentZipCode= document.getElementById('zipcode').value;
    }

                                              /* Switches the background picture based on the temeperature */

    function switchPic(temp)
               {
                  if(temp>90)
                      {   
                        document.getElementById("background").style.backgroundImage = "url(images/desert.jpg)"; 
                        weatherDiv.append('<li>'+"<img src ='images/cloudRain.png' id = 'weatherIcon'/>"+'</li>');
                        
                      }

                  else if(temp>74 && temp<91)
                      {   
                        document.getElementById("background").style.backgroundImage ="url(images/warm.jpg)";
                      }

                  else if(temp>65 && temp<75)
                      {
                        document.getElementById("background").style.backgroundImage ="url(images/cold.jpg)";
                        weatherDiv.append('<li>'+"<img src ='images/cloudishIcon.png' id = 'weatherIcon'/>"+'</li>');
                      } 
           
                  else if (temp<66)
                      {
                        document.getElementById("background").style.backgroundImage = "url(images/freeze.jpg)";
                        weatherDiv.append(
                        '<li>'+"<img src ='images/cloudyIcon.png' id = 'weatherIcon'/>"+'</li>');
                      }
                }

                                              /* Toggles the temperature between Farenheight and Celsius */
    function toggleTemperature()
              { 
                 if (document.getElementById('currentTempFar'))
                      {
                        
                        weatherDiv.empty().append(
                        '<li id ="celLow">' +' <i>Low</i> '+celLow+'</li>'+
                        '<li id ="currentTempCel" onclick = "toggleTemperature()"><strong>'+cel+'</strong>' + ': Celsius</li>'+
                        '<li id ="celHigh">' +' <i>High</i> '+celHigh+'</li>'+
                        '<li id ="cityName">' +' <strong>City : </strong> '+cityName+'</li>');
                         humidityCheck(humidity1);
                         switchPic(far);
                         
                      }

                  else
                      {
                        farenheightGetInfo();
                        humidityCheck(humidity1);
                        switchPic(far);
                      }          
              }
                                             /* If the Humidity is >99, it will show a rain Icon */

      function humidityCheck(humidity)
              {
                  if(humidity>99)
                      {
                        weatherDiv.append('<li>'+"<img src ='images/cloudRain.png' id = 'weatherIcon'/>"+'</li>');
                      }
              }
                                            /* AFter the jquery call to the API, this displays the Farenheit info to the "weatherStats" div in the html.*/
       
      function farenheightGetInfo()
              {
                weatherDiv.empty().append
                      (
                        '<li id ="cityName">' +' <i>Low</i> '+farLow+'</li>'+
                        '<li id ="currentTempFar" onclick = "toggleTemperature()"><strong>'+far+'</strong>' + ': Farenheit</li>'+
                        '<li id ="cityName">' +' <i>High</i> '+farHigh+'</li>'+
                        '<li id ="cityName">' +' <strong>City : </strong> '+cityName+'</li>'
                      );
              }
                                            /* Applies the longitude/latitude to the global variable, then gets the relevant from the API using the getWeatherAutoLocation function */

      function showLocation(position) 
              {
                  latitude = position.coords.latitude;
                  longitude = position.coords.longitude;
                  getWeatherAutoLocation();
              }
         
       function errorHandler(err) 
              {
                  if(err.code == 1) {
                  alert("Error: Access is denied!");
              }
                     else if( err.code == 2) 
                            {
                              alert("Error: Position is unavailable!");
                            }
              }
                                              /* Asks user to allow autolcation */
        function getLocation()
              {
                  if(navigator.geolocation)
                              {
                                   // timeout at 60000 milliseconds (60 seconds)
                                  var options = {timeout:60000};
                                  navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
                              }
                  else
                              {
                                  alert("Sorry, browser does not support geolocation!");
                              } 
              }