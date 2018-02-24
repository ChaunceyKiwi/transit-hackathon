var placeNum;
var placeKind;
var transMode;

$("#btn-route").click(function() {
    placeNum = $("#placeNum").val();
    placeKind = $("#placeKind").val();
    transMode = $("#transMode").val();

    originMarker.setMap(null);
    destinationMarker.setMap(null);

    if (placeKind == "Library") {
        // Fetch data of libraries from server
        $.get('/libraries', function(data) {
            var librariesArray = data;
            window.LIBRARY_DATA = librariesArray.libraries;
            clearMarker();
            addMarker(window.LIBRARY_DATA);
            displayRoute(directionsService, directionsDisplay);
        });
    } else if (placeKind == "Park") {
        // Fetch data of parks from server
        $.get('/parks', function(data) {
            var parksArray = data;
            window.PARK_DATA = parksArray.parks;
            clearMarker();
            addMarker(window.PARK_DATA);
            displayRoute(directionsService, directionsDisplay);
        });
    }
});

$("#showSearchRange").click(function(){
    if ($("#showSearchRange").is(":checked")) {
        drawSearchingScope(searchRange);
    }
    else {
        searchRangeShape.setMap(null);
    }
});