let geocoder;
let map;

function initMap() {
    geocoder = new google.maps.Geocoder();

    // The location of Seattle
    const seattle = { lat: 47.608, lng: -122.3321 };

    // The map, centered at Seattle
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: seattle,
    });

    // The marker, positioned at Seattle
    // const marker = new google.maps.Marker({
    //     position: seattle,
    //     map: map,
    // });
    codeAddress();
}


function getMarkers() {
    let address = document.querySelectorAll('.address');
    for(let i = 0; i < address.length; i++) {
        console.log(address[i]);
        console.log(address[i].innerHTML);
    }
}


function codeAddress() {
    var address = document.querySelector('.address').innerHTML;
    console.log(address);
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == 'OK') {
            // map.setCenter(results[0].geometry.location);
            console.log(results[0].geometry.location);
            var marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
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