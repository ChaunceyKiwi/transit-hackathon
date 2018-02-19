var placeNum;
var placeKind;
var transMode;

$("#btn-route").click(function() {
    placeNum = $("#placeNum").val();
    placeKind = $("#placeKind").val();
    transMode = $("#transMode").val();
    displayRoute(from, to, directionsService, directionsDisplay);
});

$("#showSearchRange").click(function(){
    if ($("#showSearchRange").is(":checked")) {
        drawSearchingScope(from, to, searchRange);
    }
    else {
        searchRangeShape.setMap(null);
    }
});