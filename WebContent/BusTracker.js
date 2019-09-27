/**
 * Created by Moloney on 1/18/2018.
 * Lab 5 Bus Tracker
 * Dr. Hornick
 * SE-2840
 * Web Application Development
 * This file contains the information that processes user input and displays creates ajax request and parses the result
 */

var count = 0; // variable that determines if the table needs to add the header or not
var markers = []; //Array of map markers
class BusTracker {
	constructor() {
		var self = this;
		$(document).ready(function() {      // when document loads, do some initialization
			self.onload(); // calls the onload function onto itself
		});
	}// end constructor

	// The onLoad member function is called when the document loads and is used to perform initialization.
	onload() {
		// Note: these local vars will be visible/accessible within inner functions below!
		var map = null;	        // a Google Map object
		var timer = null;       // an interval timer
		var update = 0;         // an update counter

		var startPosition = new google.maps.LatLng(43.044240, -87.906446);// location of MSOE athletic field
		createMap(startPosition); // map this starting location (see code below) using Google Maps
		msoeMarker(startPosition, "MSOE", "The place to be!");  // add a push-pin to the map

		// initialize button event handlers (note this shows an alternative to $("#id).click(handleClick)
		$("#start").on("click", doAjaxRequest);
		$("#stop").on("click", stopTimer);


//NOTE: Remaining helper functions are all inner functions of onLoad; thus, they have
// access to all vars declared within onLoad.

		// Create a Google Map centered on the specified position. If the map already exists, update the center point of the map per the specified position
		// param position - a google.maps.LatLng object containing the coordinates to center the map around
		function createMap(position) {
			var mapOptions = {

				zoom: 13, // range 0 to 21 (the mouse can be used to zoom in and out)
				center: position, // the position at the center of the map
				mapTypeId: google.maps.MapTypeId.ROADMAP // ROADMAP, SATELLITE, or HYBRID
			};
			var mapDiv = $("#map").get(0); // get the DOM <div> element underlying the jQuery result
			map = new google.maps.Map(mapDiv, mapOptions); // create the google map
			map.panTo(position); // pan the map to the specified position
		}

		// This function adds a "push-pin" marker to the existing map
		// param map - the map to add the marker to
		// param position - the google.maps.LatLng position of the marker on the map
		// param title - the title of the marker
		// param content - the text that appears when a user clicks on the marker
		function addMarker(map, position, title, content) {
			var markerOptions = {
				position: position, // position of the push-pin
				map: map,	// the map to put the pin into
				title: title, // title of the pin
                icon: {
				    // the url of the icon of the addMarker
                    url: "https://cdn.vectorstock.com/i/1000x1000/81/30/london-bus-icon-vector-6678130.jpg",
                    // the size of the icon marker
                    scaledSize: new google.maps.Size(30, 30)
                },
                clickable: true // if true, enable info window pop-up
			};
			// create the push-pin marker
            var marker = new google.maps.Marker(markerOptions);
			markers.push(marker);
            // now create the pop-up window that is displayed when you click the marker
            var infoWindowOptions = {
                content: content, // description
                position: position, // where to put it
            };
            var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
            google.maps.event.addListener(marker, "click", function() {
                infoWindow.open(map); // opens th info window on a mouse click
            });
		} // end inner function addMarker

		// This function adds a "push-pin" marker to the existing map does basically the same as the one above, but just
        // does it for msoe this was an easy way to assign MSOE a diff icon and not delete it when stop pressed
        // param map - the map to add the marker to
        // param position - the google.maps.LatLng position of the marker on the map
        // param title - the title of the marker
        // param content - the text that appears when a user clicks on the marker
        function msoeMarker(position, title, content) {
            var markerOptions = {
                position: position, // position of the push-pin
                map: map,	// the map to put the pin into
                title: title, // title of the pin
                icon: {
                    //the url of the image used for marker
                    url: "https://pbs.twimg.com/profile_images/764983293238325248/6DuQyIX1_400x400.jpg",
                    //the size of the icon
                    scaledSize: new google.maps.Size(30, 30)
                },
                //icon:'https://pbs.twimg.com/profile_images/764983293238325248/6DuQyIX1_400x400.jpg',
                //scaledSize: new google.maps.Size(30, 30), // scaled size
                clickable: true // if true, enable info window pop-up
            };
            // create the push-pin marker
            var marker = new google.maps.Marker(markerOptions);

            // now create the pop-up window that is displayed when you click the marker
            var infoWindowOptions = {
                content: content, // description
                position: position, // where to put it
            };
            var infoWindow = new google.maps.InfoWindow(infoWindowOptions); //creating the info window
            google.maps.event.addListener(marker, "click", function() {
                infoWindow.open(map); //on click displays info window
            });
        } // end inner function msoeMarker


		// This function executes a JSON request to the CPULoadServlet
		function doAjaxRequest() {
			var params = key +"&rt=" +$('#route').val();
			$.ajax({
				type : 'GET', //the request type
				url : "http://sapphire.msoe.edu:8080/BusTrackerProxy/BusInfo", // the url of the servlet returning the Ajax response
				data : params, // key and route, for example "key=ABCDEF123456789&rt=31"
				crossDomain : true,
				async : true,
				dataType : "json", //the return data tye
				success : handleSuccess, //method called on success
				error :handleError, //method called on non success
			});
			// When started, it should cause doAjaxRequest to be called every 5 seconds
            $('#update').html("Update " + update); // sets inner text for the number updates seen on html page
			update += 1; // increments the number of updates

            // this causes the timer to only be set to one interval and does not allow duplicates to be floating around
			if(timer === null){
                //sets the interval timer to do req. every 5 seconds
                timer = setInterval(function(){ doAjaxRequest(); }, 5000);
            }
            $('.replace').replaceWith('');

		}// end inner function doAjaxRequest

		// This function stops the timer and nulls the reference
		function stopTimer() {
		    count = 0; // sets the count to zero when the start is clicked a header will be added
			clearInterval(timer); // This clears the interval
			timer = null; // this sets the timer var to null
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null); // goes through the array of markers and removes them
            }
            markers = []; //sets the array of markers to an empty array
            update = 0; // sets the update number to zero
            $('#update').text("Update " + update); // causes the updates displayed to be set to zero
            $('.replace').replaceWith(''); // casues the data of errors and table to be cleared
            $('.headers').replaceWith(''); // clears the data headers and removes
        }// end inner function stopTimer

		// This function is called if the Ajax request succeeds.
		// The response from the server is a JavaScript object!
        //The text status and jqxhr are returned the json response however are not used ever
		function handleSuccess(response, textStatus, jqXHR ) {
		    //try catch used to catch errors if the an error occurs parsing the data indicating a successfull reponse
            // that contains an error inside of it
			try {
                var vehicleArray = response["bustime-response"]; // gets data in json response
                var array = vehicleArray["vehicle"];
                if (count === 0) {
                    //the innerhtml that is to be appened to the table
                    var innerhtml = "<thead class=\"headers\"><tr ><th>Bus</th><th>Route</th><th>latitude" +
						"</th><th>longitude</th><th>speed(MPH)</th><th>dist(mi)</th></tr></thead>";
                    //Jquery way of appending table header
					$('#table1').append(innerhtml);
                    count += 1;
                }
                    //Adds the location to the map that were returned by the json object
                    for (var i = 0; i < array.length - 1; i++) {
                        var lat = parseFloat(array[i].lat);
                        var lon = parseFloat(array[i].lon);
                        var position = new google.maps.LatLng(lat, lon); // creates a Google position object
                        addMarker(map, position, array[1].vid, array[1].des);
						updateTable(array[i]);
                    }


            }catch(err){
			    //handles the response and gets the error and displays it

				var response1 = response["status"];
				var temp = response["bustime-response"];
				if(response1 !== undefined){
                    $("#errList").append("<li class=\"replace\">Error JSON obj returned: "+response1+"</li>");
                }else if(temp !== undefined){
				    //parse the reason out of the response array
                    var temp2 = temp["error"];
                    var temp3 = temp2[0];
                    var response2 = temp3["msg"];
                    //adds the error to the list
                    $("#errList").append("<li class=\"replace\">Error JSON obj returned: "+response2+"</li>");
                }else{
                    //adds error to the error list
                    $("#errList").append("<li class=\"replace\">An error occured from JSON obj returned </li>");
                }

			}
        }// end inner function handleSuccess

        // updates the table with the passed in param obj of the JSON reposne
        function updateTable(obj){
            $('#table1 tr:last').after('<tr class=\"replace\"><td>'+obj.vid+'</td><td>'+obj.des+'</td><td>'+obj.lat+
				'</td><td>'+obj.lon+'</td><td>'+obj.spd+'</td><td>'+obj.pdist/5280+'</td></tr>');
			//append the inner data then add it
		} // ends update table

		// This function is called if the Ajax request fails (e.g. network error, bad url, server timeout, etc)
		function handleError(jqXHR, textStatus, errorThrown) {
            $("#errList").after('<li class=\"replace\">'+"Ajax response failed: "+textStatus+" occurred because " +errorThrown+'</li>');

            // you may need to create additional Html elements to display the error
		} // end inner function handerError
		
	} // end onLoad member method
	
} // end class BusTracker
