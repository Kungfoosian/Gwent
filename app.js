const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();


var listenPort = 4500;

//POST requests happen when you send data to a server

app.get('/', function(request, response){ //GET request happens when you go to a website to request its                             data, '/' is the homepage
    response.send('Hello World');
});

app.listen(listenPort, function(){ // .listen() means that the computer listens for get requests on port 3000
    console.log(`Server started on port ${listenPort}....`);
});