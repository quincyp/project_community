let geocoder;
let map;

            // if (navigator.geolocation) {
            //     navigator.geolocation.getCurrentPosition(success2, error2);
            // } else {
            //     alert('location not supported');
            // }

            // //callbacks
            // function error2(msg) {
            //     alert('error in geolocation');
            // }
            // function success2(position) {
            //     var lats = position.coords.latitude;
            //     var lngs = position.coords.longitude;
            //     alert(lats);
            //     alert(lngs)
            // };

// Creates the position lat/lng and passes to init map
const success = (position) => {  
    console.log("here");  
    console.log(position);
    const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
    }
};
const error = (error) => console.log(error);

// // Gets the current user location on click
const getUserButton = document.getElementById("getUserButton");
getUserButton.addEventListener("click", () => {
    console.log("click");
    navigator.geolocation.getCurrentPosition(success, error);
});

function initMap(position) {
    const markerArray = [];
    geocoder = new google.maps.Geocoder();
    
    
    // The location of Seattle
    const seattle = {
        lat: 47.608,
        lng: -122.3321
    };
    
    // The map, centered at user location
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: seattle,
    });
    
    
    const circleSymbol = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        strokeColor: '#4285F4'
    };
    
    const infowindow = new google.maps.InfoWindow({
        content: "You are here",
    });
    // The user's marker, set as circle to differentiate from other
    const userMarker = new google.maps.Marker({
        position: seattle,
        icon: circleSymbol,
        map: map,
    });
    userMarker.setAnimation(google.maps.Animation.DROP);
    infowindow.open(map, userMarker);
    userMarker.addListener("click", () => {
        infowindow.open(map, userMarker);
    });

    // Takes in address's and geocodes lat, lng then generates markers
    codeAddress(map, geocoder);
    // const locationButton = document.createElement("button");
    // locationButton.textContent = "Pan to Current Location";
    // locationButton.classList.add("custom-map-control-button");
    // map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    // locationButton.addEventListener("click", () => {
    //     console.log("clicked");
    //   // Try HTML5 geolocation.
    //     if (navigator.geolocation) {
    //         console.log("true");
    //         navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             const pos = {
    //             lat: position.coords.latitude,
    //             lng: position.coords.longitude,
    //             }
    //             const map = new google.maps.Map(document.getElementById("map"), {
    //                 zoom: 13,
    //                 center: pos,
    //             });
    //             console.log(pos);
    //             infoWindow.setPosition(pos);
    //             infoWindow.setContent("Location found.");
    //             infoWindow.open(map);
    //             map.setCenter(pos);
    //         },
    //         () => {
    //             handleLocationError(true, infoWindow, map.getCenter());
    //         }
    //         );
    //     }   
    // }); 
}

function codeAddress(map, geocoder) {
    let address = document.querySelectorAll('.address');
    let prev_infowindow = false;
    console.log(address);
    for (let i = 0; i < address.length; i++) {
        geocoder.geocode({
            'address': address[i].innerHTML
        }, function (results, status) {
            if (status == 'OK') {
                const marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: map,
                });
                
                // Builds google maps url using coordinates
                let url = 'https://www.google.com/maps?q=' + encodeURIComponent(marker.getPosition().toUrlValue());
                const infowindow = new google.maps.InfoWindow({
                    content: `${address[i].innerHTML} <br /><a href=${url} target="_blank">View On Google Maps</a>`,
                });

                // Markers have click listener, closes prev if new marker clicked
                google.maps.event.addListener(marker, 'click', function(){
                    if(prev_infowindow) {
                        prev_infowindow.close();
                    }
                    prev_infowindow = infowindow;
                    infowindow.open(map, marker);
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