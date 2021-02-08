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
    geocoder = new google.maps.Geocoder();

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
    codeAddress(map, geocoder);
}

function codeAddress(map, geocoder) {
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