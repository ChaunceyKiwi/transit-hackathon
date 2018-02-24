from = {lat: 49.269355, lng: -122.958724};
to = {lat: 49.2640424, lng: -123.1274355};
var map;
var directionsService;
var directionsDisplay;
var searchRange = 0.08;

function initMap()
{
    initAutocomplete();
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: from
    });
}

function updateMap()
{
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: from
    });

    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true,
        map: map,
        panel: document.getElementById('right-panel')
    });

    setOriginMarker(from);
    setDestinationMarker(to);

    directionsDisplay.addListener('directions_changed', function() {
        computeTotalDistance(directionsDisplay.getDirections());
    });
}

function displayRoute(service, display)
{
    var waypointFeasible;
    switch (placeKind) {
        case "Library":
            waypointFeasible = getWayPointsFeasible(window.LIBRARY_DATA, searchRange);
            break;
        case "Park":
            waypointFeasible = getWayPointsFeasible(window.PARK_DATA, searchRange);
            break;
    }

    var waypts = [];
    for (var i = 0; i < waypointFeasible.length; i++) {
        waypts.push({
            location: waypointFeasible[i],
            stopover: true
        });
    }

    service.route({
        origin: from,
        destination: to,
        waypoints: waypts,
        travelMode: transMode,
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