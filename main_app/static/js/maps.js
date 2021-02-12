let geocoder;
let map;

// The location of Seattle
const seattle = {
    lat: 47.608,
    lng: -122.3321
};
const sanfran = {
    lat: 37.774929,
    lng: -122.419416
}
initMap(seattle);



function initMap(position) {
    geocoder = new google.maps.Geocoder();
    
    
    
    // The map, centered at user location
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: position,
    });

    // Takes in address's and geocodes lat, lng then generates markers
    codeAddress(map, geocoder);

    // Creates the position lat/lng and passes to init map
    const success = (position) => {  
        console.log("here");  
        console.log(position);
        const userPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        }
        map.setCenter(userPosition);
        const circleSymbol = {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            strokeColor: '#4285F4'
        };
        
        // Sets user marker text window
        const infowindow = new google.maps.InfoWindow({
            content: "You are here",
        });
        // Custom user marker, set as circle
        const userMarker = new google.maps.Marker({
            position: userPosition,
            icon: circleSymbol,
            map: map,
        });
        userMarker.setAnimation(google.maps.Animation.DROP);
        infowindow.open(map, userMarker);
        userMarker.addListener("click", () => {
            infowindow.open(map, userMarker);
        });
    };
    const error = (error) => console.log(error);

    // Gets the current user location on click
    const getUserButton = document.getElementById("getUserButton");
    getUserButton.addEventListener("click", () => {
        console.log("click");
        navigator.geolocation.getCurrentPosition(success, error, {maximumAge:1000, timeout:5000, enableHighAccuracy:true});
    });

}

function codeAddress(map, geocoder) {
    let address = document.querySelectorAll('.address');
    let name = document.querySelectorAll('.name');
    let prev_infowindow = false;
    console.log(name);
    console.log(address);
    for (let i = 0; i < address.length; i++) {
        geocoder.geocode({
            'address': address[i].innerHTML
        }, function (results, status) {
            if (status == 'OK') {
                const marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: map,
                    title: name[i].innerHTML,
                });
                
                // Builds google maps url using coordinates
                let url = 'https://www.google.com/maps?q=' + encodeURIComponent(`${name[i].innerHTML} ${address[i].innerHTML}`); //Lat/Lng alternative: encodeURIComponent(marker.getPosition().toUrlValue())
                const infowindow = new google.maps.InfoWindow({
                    content: `<h6>${name[i].innerHTML}</h6>${address[i].innerHTML} <br /><a href=${url} target="_blank">View On Google Maps <i class="fas fa-map-marked-alt"></i></a>`,
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

/* Google Starter Code get location
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
*/

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