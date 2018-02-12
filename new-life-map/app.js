const express = require('express');
var fs = require('fs');

const app = express();

var getHTML = function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.setHeader('Cache-Control', 'public, max-age=1800');
    fs.readFile(__dirname + '/front-end/index.html', function(err, data) {
        response.end(data);
    });
};

var getCSS= function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/css');
    response.setHeader('Cache-Control', 'public, max-age=1800');
    fs.readFile(__dirname + '/front-end/index.css', function(err, data) {
        response.end(data);
    });
};

var getJS = function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/javascript');
    response.setHeader('Cache-Control', 'public, max-age=1800');
    fs.readFile(__dirname + '/front-end/index.js', function(err, data) {
        response.end(data);
    });
};

app.get('/', getHTML);
app.get('/index.css', getCSS);
app.get('/index.js', getJS);

app.listen(8080, function () {
    console.log('The server is ' +
        'listening on port 8080!')
});