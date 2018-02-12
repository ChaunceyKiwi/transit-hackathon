home = {lat: 49.269355, lng: -122.958724};
metrotown = {lat: 49.2266034, lng: -123.0048016};

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: home  // 1620 Cliff Avenue.
    });

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true,
        map: map,
        panel: document.getElementById('right-panel')
    });

    directionsDisplay.addListener('directions_changed', function() {
        computeTotalDistance(directionsDisplay.getDirections());
    });

    displayRoute(home, metrotown, directionsService,
        directionsDisplay);
}

function displayRoute(origin, destination, service, display) {
    service.route({
        origin: origin,
        destination: destination,
        waypoints: [],
        travelMode: 'TRANSIT',
        avoidTolls: false
    }, function(response, status) {
        if (status === 'OK') {
            display.setDirections(response);
        } else {
            alert('Could not display directions due to: ' + status);
        }
    });
}

function computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    document.getElementById('total').innerHTML = total + ' km';
}