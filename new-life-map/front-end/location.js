window.LIBRARY_DATA = {};
window.PARK_DATA = {};

var searchRangeShape;
var markerSet = [];

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
        markerSet.push(marker);
    }
}

function clearMarker()
{
    for (var i = 0; i < markerSet.length; i++) {
        markerSet[i].setMap(null);
    }
}

function getDistance(pos1, pos2)
{
    const latDiff = Math.abs(pos1.lat - pos2.lat);
    const lngDiff = Math.abs(pos1.lng - pos2.lng);
    return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
}

function getEllipseCoord(width)
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

function drawSearchingScope(width)
{
    var coords = getEllipseCoord(width);

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

function getWayPointsFeasible(posArray, width)
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

    return wayPointsFeasible.slice(0, placeNum);
}






