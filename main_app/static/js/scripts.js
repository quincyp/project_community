// Bootstrap validator, disabling form submissions if there are invalid fields
(() => {
    'use strict';

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach((form) => {
        form.addEventListener('submit', (event) => {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add('was-validated');
        }, false);
    });
})();

// Keep sizing dropdown menu open
$('.dropdown-stay').on('click', function (e) {
    e.stopPropagation();
});

// Get and Set the font size from the cookie on load
let size = 1;
size = parseFloat(Cookies.get('size'));
document.documentElement.setAttribute("style", `--set-size: ${size}`);
console.log("Size: " + size);

// Accessibility text magnifier
$("#zoomMinus").on("click", function(){
    setZoom("minus");
});
$("#zoomPlus").on("click", function(){
    setZoom("plus");
});
$("#zoomReset").on("click", function(){
    setZoom("reset");
});

const setZoom = function setZoom(choice) {
    if(choice === "minus") {
        if(size > 0.6) {
            size -= .2;
        }
    } else if (choice === "plus") {
        if(size < 1.8) {
            size += .2;
        }
    } else {
        size = 1;
    }
    Cookies.set('size', size);
    document.documentElement.setAttribute("style", `--set-size: ${size}`);
    console.log(size);
}

// Script for bootstrap popovers

let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
let popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
});

$(document).ready(function() {
    $("i.fas").popover({'trigger':'hover'});
    $("i.far").popover({'trigger':'hover'});
});




// Copy to clipboard
function clipboardCopy() {
    let copyText = document.getElementById("copyTarget").textContent;
    navigator.clipboard.writeText(copyText)
        .then(() => { /*Alert by popover, otherwise: alert(`Copied: ${copyText}`)*/ })
        .catch((error) => { alert(`Copy failed! ${error}`) })
    
}