to = {lat: 49.269355, lng: -122.958724};
from = {lat: 49.2266034, lng: -123.0048016};
var map;
var directionsService;
var directionsDisplay;

function initMap()
{
    getData();

    console.log(window.PARK_DATA);
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: from  // 1620 Cliff Avenue.
    });

    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true,
        map: map,
        panel: document.getElementById('right-panel')
    });

    directionsDisplay.addListener('directions_changed', function() {
        computeTotalDistance(directionsDisplay.getDirections());
    });

    drawSearchingScope(from, to, 0.05);
}

function displayRoute(origin, destination, service, display)
{
    var waypointFeasible = getWayPointsFeasible(window.LIBRARY_DATA, 1, from, to, 0.05);

    var waypts = [];
    for (var i = 0; i < waypointFeasible.length; i++) {
        waypts.push({
            location: waypointFeasible[i],
            stopover: true
        });
    }

    service.route({
        origin: origin,
        destination: destination,
        waypoints: waypts,
        travelMode: 'WALKING',
        avoidTolls: false
    }, function(response, status) {
        if (status === 'OK') {
            display.setDirections(response);
        } else {
            alert('Could not display directions due to: ' + status);
        }
    });
}

function computeTotalDistance(result)
{
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    document.getElementById('total').innerHTML = total + ' km';
}