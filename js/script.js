$(document).ready(function(){
    // //Calls function which creates the map. This is the first thing being called.
    // initialize();
    $("#search").click(clickBMCC);
    onNearbyResult();

	var locations = [{"name":"Washinton Market Park",
	"loc":[40.716997,-74.011248],
	"description":"Small park next to BMCC with children playground.",
	"address":"316 Greenwhich St, New York, NY, 10013",
	"image":"market_park.JPG"},

	{"name":"Hudson River Park",
	"loc":[40.720453,-74.012652],
	"description":"Park next to the river with many sports courts.",
	"address":"Hudson River Greenwayn, New York, NY, 10013",
	"image":"HudsonRiverPark.jpg"},

	{"name":"Nelson A. Rockafeller Park",
	"loc":[40.71729,-74.016505],
	"description":"Relaxing park with chess tables.",
	"address":"22 River Terrace, New York, NY, 10282",
	"image":"nelsonA.park.jpg"},

	{"name":"Teardrop Park South",
	"loc":[40.71594,-74.015939],
	"description":"smaller Park near Nelson A. park.",
	"address":"Murray St, New York, NY, 10282",
	"image":"teardrop_park.jpg"},

	{"name":"Duane Park",
	"loc":[40.7172,-74.009494],
	"description":"Park at the Corner of Duane St.",
	"address":"167-169 Duane St, New York, NY, 10013",
	"image":"duane_park.jpg"},

	{"name":"Bogardus Garden",
	"loc":[40.715946,-74.009156],
	"description":"Plaza with seatting and tables.",
	"address":"5 Hudson St, New York, NY, 10013",
	"image":"Bogardus-plaza1.jpg"},
	
	{"name":"Silverstein Fammily Park",
	"loc":[40.713301,-74.011407],
	"description":"Park near the Fitterman Building.",
	"address":"60-72 Barclay St, New York, NY, 10007",
	"image":"silverstein_park.jpg"},

	{"name":"World Trade Center",
	"loc":[40.711658,-74.013332],
	"description":"Park created around World Trade Center, with two waterfalls.",
	"address":"Marriott World Trade Center, New York, NY, 10006",
	"image":"world-trade-center-memorial11.jpg"},

	{"name":"Pumphouse Park",
	"loc":[40.711825,-74.01615],
	"description":"Near North Cove Marina.",
	"address":"393 South End Ave, New York, NY, 10280",
	"image":"Pumphouse-park.jpg"}
	];

	var topZ;

	//create map options
	var  mapOptions = { 
	    zoom:15, 
	    center: new google.maps.LatLng(40.717493,-74.012223),
	    mapTypeId: google.maps.MapTypeId.WALKING,
	    key:"AIzaSyDB1zgFAR4_-7WTvG_O7QGthvcAC8WLdH4"
	    }

//create map
	var map = new google.maps.Map($("#googleMap").get(0),mapOptions);
topZ = google.maps.Marker.MAX_ZINDEX + 1;

   function addMarker(x,y)
   {
   	      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(x,y),
        map: map,
        icon: 'images/icon.png'
		});
     return marker;
   }

    var infowindow = new google.maps.InfoWindow({maxWidth:250});
 




	function onNearbyResult(result, status){
		if(status == google.maps.places.PlacesServiceStatus.OK){
			for(var i=0; i< result.length; i++){
				var place = results[i];
				var pIcon = new google.maps.MarkerImage(place.icon, null, null, null, new google.maps.Size(25,25));
				var m = new google.maps.Marker({position: place.geometry.location, map:map});
			}
		}

	}

//when search button is clicked all locations will show with a marker
	function clickBMCC(evt){
		evt.preventDefault();
		$.each(locations, function(id, info)
		{  
			console.log(info);
           var mark= addMarker(info.loc[0], info.loc[1]);	
       
       mark.index = id;

		var listener = google.maps.event.addListener(mark, "click", clickMap);

		});  		
	};

function clickMap(evt){
        console.log('clickmap');
        console.log('evt',evt);
        console.log('this',this);
        console.log('this.info',this.index);
        //do something with marker
        var place = locations[this.index];
        var loc = this.getPosition(); 
        this.setZIndex(topZ++); //make sure it appears above other images
	
        var content = '<div class="infoContent">';
        content += '<div class="image">';
        content += '<img src="images/'+place.image+'" alt="'+place.name+'" >';
        content += '</div>';//end image div
        content += '<h3>'+place.name+'</h3>';
        content += '<p>';
        content += place.description;
        content += '</p></div>';
        content += '<p>';
        content += place.address;
        content += '</p>'
        content += '</div>';//end infoContent div
	content += '<input type="button" data-lat="'+loc.lat()+'" data-lng="'+loc.lng()+'"class="getDirections" value="direction to Here">';
        //showInfo Window
        var info=showInfoWindow(this,content);
	google.maps.event.addListenerOnce(info, "domready",addDirectionsButtonHandler);
    }// end clickMap4
    
    function addDirectionsButtonHandler(evt)
      {
         console.log("addDirection Called")
         $(document).ready(function(){
        $('.getDirections').click(onClickDirections);
        });
      }
      
     function onClickDirections(evt)
      {
        console.log('onClickDirections', evt);
        var lat = $(this).attr('data-lat');
        var lng = $(this).attr('data-lng');
        var loc = new google.maps.LatLng(lat,lng);
       
             calcRoute(PersonLocation, loc);
             //setAllMap(null); //clean map 
           
      }

    function showInfoWindow(marker, content){
        var infoWindow = new google.maps.InfoWindow();
        infoWindow.setOptions({maxWidth:150});
        infoWindow.setContent(content);
        infoWindow.open(map, marker);
    }// end showInfoWindow

    

});



