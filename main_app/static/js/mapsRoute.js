let geocoder;
let map;

// Creates the position lat/lng and passes to init map
const success = (position) => {    
    initMap({ 
        lat: position.coords.latitude, 
        lng: position.coords.longitude, 
    });
};
const error = (error) => console.log(error);

// Gets the current user location
navigator.geolocation.getCurrentPosition(success, error);

function initMap(position) {
    let markerArray = [];
    markerArray = document.querySelectorAll('.address');
    for(let i=0; i<markerArray.length; i++) {
        markerArray[i] = markerArray[i].innerHTML;
    }
    console.log(markerArray);

    geocoder = new google.maps.Geocoder();
    
    // Instantiate a directions service.
    const directionsService = new google.maps.DirectionsService();

    // The location of Seattle
    const seattle = {
        lat: 47.608,
        lng: -122.3321
    };

    // The map, centered at user location
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: position,
    });

    // Create a renderer for directions and bind it to the map.
    const directionsRenderer = new google.maps.DirectionsRenderer({ map: map });

    // Instantiate an info window to hold step text.
    const stepDisplay = new google.maps.InfoWindow();
    // Display the route between the initial start and end selections.
    calculateAndDisplayRoute(
        directionsRenderer,
        directionsService,
        markerArray,
        stepDisplay,
        map,
        position
    );

    // Listen to change events from the start and end lists.
    const onChangeHandler = function () {
        calculateAndDisplayRoute(
        directionsRenderer,
        directionsService,
        markerArray,
        stepDisplay,
        map,
        position
        );
    };

    var circleSymbol = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        strokeColor: '#4285F4'
    };

    // The user's marker, set as circle to differentiate from other markers
    const userMarker = new google.maps.Marker({
        position: position,
        icon: circleSymbol,
        map: map,
    });
    userMarker.setAnimation(google.maps.Animation.DROP);

    // Takes in address's and geocodes lat, lng then generates markers
    codeAddress(map, geocoder, markerArray);
}

function codeAddress(map, geocoder, markerArray) {
    let address = document.querySelectorAll('.address');
    console.log(address);

    for (let i = 0; i < address.length; i++) {
        geocoder.geocode({
            'address': address[i].innerHTML
        }, function (results, status) {
            if (status == 'OK') {
                // map.setCenter(results[0].geometry.location);
                // const setPosition = { 
                //     lat: results[0].geometry.location.lat(), 
                //     lng: results[0].geometry.location.lng() 
                // };
                const marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: map,
                });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }
}






function calculateAndDisplayRoute(
    directionsRenderer,
    directionsService,
    markerArray,
    stepDisplay,
    map,
    position
) {
    // First, remove any existing markers from the map.
    // for (let i = 0; i < markerArray.length; i++) {
    //     markerArray[i].setMap(null);
    // }
    // Retrieve the start and end locations and create a DirectionsRequest using
    // WALKING directions.
    directionsService.route(
        {
        origin: position,
        destination: document.querySelector('.address').innerHTML,
        travelMode: google.maps.TravelMode.WALKING,
        },
        (result, status) => {
        // Route the directions and pass the response to a function to create
        // markers for each step.
        if (status === "OK") {
            // document.getElementById("warnings-panel").innerHTML =
            // "<b>" + result.routes[0].warnings + "</b>";
            directionsRenderer.setDirections(result);
            showSteps(result, markerArray, stepDisplay, map);
        } else {
            window.alert("Directions request failed due to " + status);
        }
        }
    );
    }

    function showSteps(directionResult, markerArray, stepDisplay, map) {
    // For each step, place a marker, and add the text to the marker's infowindow.
    // Also attach the marker to an array so we can keep track of it and remove it
    // when calculating new routes.
    const myRoute = directionResult.routes[0].legs[0];

    for (let i = 0; i < myRoute.steps.length; i++) {
        const marker = (markerArray[i] =
        markerArray[i] || new google.maps.Marker());
        marker.setMap(map);
        marker.setPosition(myRoute.steps[i].start_location);
        attachInstructionText(
        stepDisplay,
        marker,
        myRoute.steps[i].instructions,
        map
        );
    }
    }

    function attachInstructionText(stepDisplay, marker, text, map) {
    google.maps.event.addListener(marker, "click", () => {
        // Open an info window when the marker is clicked on, containing the text
        // of the step.
        stepDisplay.setContent(text);
        stepDisplay.open(map, marker);
    });
}

/*
Test Locations:

The Food Bank at St Mary's
611 20th Ave S
Seattle WA 98144

206-324-7100 Ext 21

Baby corner, hygiene corner, toddler bags, no cook bags for homeless. Available for east half of 98144, may be served once per week.

---

City of Seattle Utility Discount Program
810 Third Ave
Seattle WA 98124

206-684-0500

Rate discount for Seattle City Light and Seattle Public Utilities. 

*/