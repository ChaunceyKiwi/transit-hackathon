const express = require('express');
var fs = require('fs');

const app = express();

var getHTML = function(request, response)
{
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.setHeader('Cache-Control', 'public, max-age=1800');
    fs.readFile(__dirname + '/front-end/index.html', function(err, data) {
        response.end(data);
    });
};

var getCSS= function(request, response)
{
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/css');
    response.setHeader('Cache-Control', 'public, max-age=1800');
    fs.readFile(__dirname + '/front-end/index.css', function(err, data) {
        response.end(data);
    });
};

var getMainJS = function(request, response)
{
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/javascript');
    response.setHeader('Cache-Control', 'public, max-age=1800');
    fs.readFile(__dirname + '/front-end/index.js', function(err, data) {
        response.end(data);
    });
};

var getJQuery = function(request, response)
{
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/javascript');
    response.setHeader('Cache-Control', 'public, max-age=1800');
    fs.readFile(__dirname + '/front-end/jquery-3.1.1.js', function(err, data) {
        response.end(data);
    });
};

var getLocationJS = function(request, response)
{
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/javascript');
    response.setHeader('Cache-Control', 'public, max-age=1800');
    fs.readFile(__dirname + '/front-end/location.js', function(err, data) {
        response.end(data);
    });
};

var getInterationJS = function(request, response)
{
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/javascript');
    response.setHeader('Cache-Control', 'public, max-age=1800');
    fs.readFile(__dirname + '/front-end/interaction.js', function(err, data) {
        response.end(data);
    });
};

var getFormJS = function(request, response)
{
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/javascript');
    response.setHeader('Cache-Control', 'public, max-age=1800');
    fs.readFile(__dirname + '/front-end/form.js', function(err, data) {
        response.end(data);
    });
};

var getLibraryInfo = function(request, response)
{
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Cache-Control', 'public, max-age=1800');
    fs.readFile(__dirname + '/data/library.json', function(err, data) {
        response.end(data);
    });
};

var getParkInfo = function(request, response)
{
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Cache-Control', 'public, max-age=1800');
    fs.readFile(__dirname + '/data/park.json', function(err, data) {
        response.end(data);
    });
};

app.get('/', getHTML);
app.get('/index.css', getCSS);
app.get('/index.js', getMainJS);
app.get('/jquery.min.js', getJQuery);
app.get('/location.js', getLocationJS);
app.get('/interaction.js', getInterationJS);
app.get('/form.js', getFormJS);
app.get('/libraries', getLibraryInfo);
app.get('/parks', getParkInfo);

app.listen(8080, function () {
    console.log('The server is listening on port 8080!')
});