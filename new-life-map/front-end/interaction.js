var transMode;
var timeAvailable;

function switchView(index) {
    if (index == 0) {
        $("#user-input").show();
        $("#candidate-choose").hide();
        $("#display-result").hide();
    } else if (index == 1) {
        $("#user-input").hide();
        $("#candidate-choose").show();
        $("#display-result").hide();
    } else if (index == 2) {
        $("#user-input").hide();
        $("#candidate-choose").hide();
        $("#display-result").show();
    }
}

$("#search-btn").click(function() {
    transMode = $("#transMode").val();
    updateMap();
    drawSearchingScope();

    timeAvailable = $("#hourEstimate").val();

    $.get('/libraries', function(data) {
        var librariesArray = data;
        addMarker(librariesArray.libraries, "library");
    });

    $.get('/parks', function(data) {
        var parksArray = data;
        addMarker(parksArray.parks, "park");
    });
});

$("#showSearchRange").click(function(){
    if ($("#showSearchRange").is(":checked")) {
        drawSearchingScope(searchRange);
    }
    else {
        searchRangeShape.setMap(null);
    }
});

$("#library-check-btn").click(function() {
    var checkbox = this.children[0];
    if (checkbox.className == "fa fa-check-square") {
        checkbox.className = "fa fa-square";
        hideMarker("library");
    } else {
        checkbox.className = "fa fa-check-square";
        showMarker("library");
    }
});

$("#park-check-btn").click(function() {
    var checkbox = this.children[0];
    if (checkbox.className == "fa fa-check-square") {
        checkbox.className = "fa fa-square";
        hideMarker("park");
    } else {
        checkbox.className = "fa fa-check-square";
        showMarker("park");
    }
});

$("#restaurant-check-btn").click(function() {
    var checkbox = this.children[0];
    if (checkbox.className == "fa fa-check-square") {
        checkbox.className = "fa fa-square";
    } else {
        checkbox.className = "fa fa-check-square";
    }
});

$("#activity-check-btn").click(function() {
    var checkbox = this.children[0];
    if (checkbox.className == "fa fa-check-square") {
        checkbox.className = "fa fa-square";
    } else {
        checkbox.className = "fa fa-check-square";
    }
});

$("#route-button").click(function() {
    originMarker.setMap(null);
    destinationMarker.setMap(null);

    var waypoints = [];

    for (var i = 0; i < markerSet.length; i++) {
        if (markerSet[i].currState == 1) {
            waypoints.push({lat: markerSet[i].position.lat(), lng:markerSet[i].position.lng()});
        }
    }

    for (var i = 0; i < markerHiddenSet.length; i++) {
        if (markerHiddenSet[i].currState == 1) {
            waypoints.push({lat: markerHiddenSet[i].position.lat(), lng:markerHiddenSet[i].position.lng()});
        }
    }

    waypoints.sort(compareDistance);
    displayRoute(directionsService, directionsDisplay, waypoints);
});