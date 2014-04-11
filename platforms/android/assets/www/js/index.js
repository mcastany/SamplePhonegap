// Wait for Cordova to load      
document.addEventListener("deviceready", onDeviceReady, false);

var watchID = null;
var map = null;

function onDeviceReady() {
    var element = document.getElementById('geolocation');
    element.innerHTML = 'Device Ready: Initializing';
    var mapOptions = {
        zoom: 15,
        center: new google.maps.LatLng(-34.5994167, -58.389198500000006)
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    element.innerHTML = 'Map Created: Watching position';
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy: true});
}


function onSuccess(position) {
    var element = document.getElementById('geolocation');
    element.innerHTML = 
                    'Latitude: ' + position.coords.latitude + '<br />' +
                    'Longitude: ' + position.coords.longitude + '<br />' +
                    '<hr />';
    var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    map.setCenter(coords);

    var marker = new google.maps.Marker({
        position: coords,
        map: map,
        title: 'Your Position'
      });

    //console.log("Timestamp: " + new Date(position.timestamp));
}


function onError(error) {
    var element = document.getElementById('geolocation');
    switch(error.code) 
    {
        case error.PERMISSION_DENIED:
          element.innerHTML = "User denied the request for Geolocation."
          break;
        case error.POSITION_UNAVAILABLE:
          element.innerHTML = "Location information is unavailable."
          break;
        case error.TIMEOUT:
          element.innerHTML = "The request to get user location timed out."
          break;
        case error.UNKNOWN_ERROR:
          element.innerHTML = "An unknown error occurred."
          break;
    }
    element.innerHTML = "Error checking location";
    console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
}

// clear the watch that was started earlier      
function startWatch() {
    
        var options = { 
          timeout: 30000,
          maximumAge: 30000, 
          frequency: 3000,
          enableHighAccuracy: true  
        };
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Starting New Watch';
        navigator.geolocation.watchPosition(onSuccess, onError, options);
    
}