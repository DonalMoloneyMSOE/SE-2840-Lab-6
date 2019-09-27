# SE-2840-Lab-6 (1/25/18)
Created: 1/25/18
## Overview

In this assignment, you will make a very simple modification to your BusTracker application (from Lab 5): you'll replace the url in the $ajax() call  so that instead of making that call to sapphire.msoe.edu, you make the call to a NodeJS server you'll write.

You will once again be retrieving JSON data, exactly as before, but instead of using the sapphire url:

http://sapphire.msoe.edu:8080/BusTrackerProxy/BusInfo?key=XXXXXXXXXXXXXXX&rt=31

You will instead use the url associated with your own NodeJS server:

http://localhost:3000/BusInfo?key=XXXXXXXXXXXXXXX&rt=31

Your NodeJS server must generate exactly the same JSON responses as sapphire.
Implementation

Base your implementation on the sample code ExpressDemo.js; name your code BusTrackerServer.js (note: this file goes in the main project folder, while the "client" html/js/css/ico files go in a webcontent folder).

Retain the app.use() calls that enable the server to respond to favicon and static file requests (e.g. your server should be able to serve up your BusTracker html and js files).

Add a favicon.ico file to your project (which could go in the same webcontent project subfolder where you put BusTracker.html)

Add your BusTracker client files (BusTracker.html, BusTracker.js) to a "webcontent" or subfolder of your project folder.

Be sure to use NPM to install all necessary external packages to your project.

The real key to your server is the route that your BusTracker.html/js client code will trigger when it makes an Ajax call to your BusTrackerServer at the above localhost url. You'll need to add and complete the code below. This is the "proxy" code that receives the ajax request from your BusTracker.html page, parses the request parameters, and then forwards the request on to the actual MCTS server.

app.get('/BusInfo', function( request, response ) {
    var ajax = require('request'); // import the request library (downloaded from NPM) for making ajax requests
    // import and use the 'url' package for parsing request urls (in order to get params)
    var route = 'GRE'; // default route. Get the real one from the 'rt=XXX' request param. See demo code for hints.
    var key = '123456'; // default key. Get the real one (yours) from the 'key=XXXXX' request param
    var uri = "http://realtime.ridemcts.com/bustime/api/v2/getvehicles?key="+ key + "&rt=" + route + "&format=json";

    // the default JSON response (same as asking for route 1000)
    var busData = {status:"Server Error; IOException during request to ridemcts.com: Simulated server error during request to ridemcts.com"}; // the default JSON response

    if( route === '1000') { // simulate MCTS server error...
        response.json(busData); // note that this sends the above default JSON response
        return;
    } else if( route === NNNN ) { // for routes 1001, 1002, 1003,  simulate error conditions and generate appropriate JSON/HTTP responses (like sapphire does)
    }
    
    // if no "bad" routes are detected above, make the real ajax call to MCTS
    ajax(uri, function( error, res, body ) {
        if( !error && res.statusCode === 200 ) { // no errors and a good response
            // parse the body (a JSON string) to a JavaScript object
            busData = ...
        }
        // Note: if a failure occurs, the default response above should be sent here
        response.json(busData); // no need to set content-type! Express handles it automatically
    });
});
