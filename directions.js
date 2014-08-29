/* we are putting it in a self invoking anonymous function to shield our variables from other scripts */
(function(){
	/* ===================================
	  Variables
	  ================================== */
	
	// this is the map itself. we will wait to set it until the Document is loaded
	var map;
	var bmcc;// this will hold a reference to the LatLng of bmcc
	var ladyLiberty;//this will hold the LatLng of the statue of liberty
	// === DIRECTIONS VARIABLES ===
	//these two are used when showing detaild directions info
	var directionsService;//this is the service that gets directions
	var directionsDisplay; //this handles showing the directions
	var markers = [];// stores markers by clicking the map
	
	/* ===================================
	  Document Ready
	  ==================================
	*/
	jQuery(document).ready(function($) { console.log("ready");
		// Stuff to do as soon as the DOM is ready. Use $() w/o colliding with other libs
		bmcc = new google.maps.LatLng(40.717615,-74.011742);
		ladyLiberty = new google.maps.LatLng(40.689282,-74.044505);

		initializeMap();//separating this into a function to make it more reusable

		directionsService = new google.maps.DirectionsService();
		//listen when useer clicks the map
		var listener = google.maps.event.addListener(map, "click", function(evt){
			//stuff to do when the map is clicked
			var marker = new google.maps.Marker({position:evt.latLng, map:map});
			markers.push(marker);//adds the marker to the array of markers
			//if there are two markers in the array then do the directions
			if(markers.length >1){
				google.maps.event.addListener(listener);//remove listener to disable clicking
				var marker1 = markers[0];
				var marker2 = markers[1];

				var directionsRenderer = new google.maps.DirectionsRenderer();
				directionsRenderer.setMap(map);
				var request = {
					origin:marker1.getPosition(),
					destination: marker2.getPosition(),
					travelMode: google.maps.TravelMode.DRIVING
				};
				directionsService.route(request, function(result, status){
					directionsRenderer.setDirections(result);//show the directions on the map
				});// end route

			}
		});


	});//end document ready


	/* ===================================
	  Functions
	  ==================================== */

	function initializeMap () { console.log("initializeMap");
		var mapOptions;//this hold options used when creating the map

		// https://developers.google.com/maps/documentation/javascript/reference#MapOptions
		mapOptions = {
			zoom: 10,
			center: bmcc,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}

		map = new google.maps.Map(document.getElementById('map'), mapOptions);

	}//end initializeMap



})();//End self invoking anonymous function