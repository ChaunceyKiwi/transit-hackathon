window.LIBRARY_DATA = {};
window.PARK_DATA = {};

var searchRangeShape;

function getData()
{
    // Fetch data of libraries from server
    $.get('/libraries', function(data) {
        var librariesArray = data;
        window.LIBRARY_DATA = librariesArray.libraries;
        addMarker(window.LIBRARY_DATA);
    });

    // Fetch data of parks from server
    $.get('/parks', function(data) {
        var parksArray = data;
        window.PARK_DATA = parksArray.parks;
    });
}

function addMarker(objArray)
{
    for (var i = 0; i < objArray.length; i++)
    {
        var string = objArray[i].position;
        var array = string.split(',');
        var pos = {lat: parseFloat(array[0]), lng: parseFloat(array[1])};
        var marker = new google.maps.Marker({
            position: pos,
            map: map,
            title: objArray[i].name
        });
        marker.setMap(map);
    }
}

function getDistance(from, to)
{
    const latDiff = Math.abs(from.lat - to.lat);
    const lngDiff = Math.abs(from.lng - to.lng);
    return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
}

function getEllipseCoord(from, to, width)
{
    const diffLat = to.lat - from.lat;
    const diffLng = to.lng - from.lng;
    var angle = Math.atan2(diffLat, diffLng);

    const c = getDistance(from, to) / 2;
    const b = width;
    const a = Math.sqrt(b * b + c * c);
    var parametricResults = [];

    for (var i = 0; i < 360; i++)
    {
        parametricResults.push((b * b) / (a - c * Math.cos(i/180 * Math.PI - angle)));
    }

    var results = [];
    for (var i = 0; i < parametricResults.length; i++)
    {
        var res = {};
        res.lat = from.lat + Math.sin(i/180 * Math.PI) * parametricResults[i];
        res.lng = from.lng + Math.cos(i/180 * Math.PI) * parametricResults[i];
        results.push(res);
    }

    return results;
}

function drawSearchingScope(from, to, width)
{
    var coords = getEllipseCoord(from, to, width);

    searchRangeShape = new google.maps.Polygon({
        paths: coords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
    });

    searchRangeShape.setMap(map);
}

function compareDistance(pos1, pos2)
{
    return getDistance(pos1, from) - getDistance(pos2, from);
}

function getWayPointsFeasible(posArray, num, from, to, width)
{
    var wayPointsFeasible = [];

    var diffLat = to.lat - from.lat;
    var diffLng = to.lng - from.lng;
    var angle = -Math.atan(diffLat / diffLng);

    if (to.lng < from.lng)
    {
        angle = angle - Math.PI;
    }

    const c = getDistance(from, to) / 2;
    const b = width;
    const a = Math.sqrt(b * b + c * c);
    var parametricResults = [];

    for (var i = 0; i < 360; i++)
    {
        parametricResults[i] = (b * b) / (a - c * Math.cos(i/180 * Math.PI + angle));
    }

    for (var j = 0; j < posArray.length; j++)
    {
        var string = posArray[j].position;
        var array = string.split(',');
        var pos = {lat: parseFloat(array[0]), lng: parseFloat(array[1])};
        diffLat = pos.lat - from.lat;
        diffLng = pos.lng - from.lng;
        var angle2 = Math.round(Math.atan2(diffLat, diffLng) / Math.PI * 180);
        if (angle2 < 0)
        {
            angle2 = angle2 + 360;
        }

        if (getDistance(from, pos) < parametricResults[angle2])
        {
            wayPointsFeasible.push(pos);
        }
    }

    wayPointsFeasible.sort(compareDistance);

    /* TODO: sorting results based on distance */

    return wayPointsFeasible.slice(0, num);
}






