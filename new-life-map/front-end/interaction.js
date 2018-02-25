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
        // Fetch data of parks from ODEN's data
        $.get('/parks', function(data) {
            var parksArray = data;
            var features = parksArray.features;
            var parkCoords = [];
            window.PARK_DATA = [];
            features.forEach(function(feature) {
                var properties = feature.properties;
                var park = {};
                park.name = properties.Name;
                park.location = properties.StrNum+" "+properties.StrName;
                
                if (feature.geometry.type === "MultiPolygon") {
                    var polygons = feature.geometry.coordinates;
                    var polygonCoords = [];
                    polygons.forEach(function(polygon) {
                        polygonCoords.push(polygon[0]);
                    });
                    parkCoords.push(polygonCoords);
                    park.position = polygonCoords[0][0][1]+","+polygonCoords[0][0][0];
                } else {
                    var coords = feature.geometry.coordinates[0];
                    var polygonCoords = [];
                    polygonCoords.push(coords);
                    parkCoords.push(polygonCoords);
                    park.position = coords[0][1]+","+coords[0][0];
                }
                window.PARK_DATA.push(park);
            })
            
            clearMarker();
            drawPolygon(parkCoords);
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