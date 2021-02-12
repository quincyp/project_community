
// Get and Set the font size from the cookie on load
let size = 1;
size = Cookies.get('size');
document.documentElement.setAttribute("style", `--set-size: ${size}`);
console.log(size);

// FIXTHIS: UPDATE 3 CLICK FUNCTIONS INTO ONE IF/ELSE FUNCTION. THEN MIGRATE TO MENU ICON
// Accessibility text magnifier
$("#zoomPlus").on("click", function() {
    if(size < 3) {
        size += .2;
        Cookies.set('size', size);
        document.documentElement.setAttribute("style", `--set-size: ${size}`);
        console.log(size);
    }
});
$("#zoomMinus").on("click", function() {
    if(size > 0.8) {
        size -= .2;
        Cookies.set('size', size);
        document.documentElement.setAttribute("style", `--set-size: ${size}`);
        console.log(size);
    }
});
$("#zoomReset").on("click", function() {
    size = 1;
    Cookies.set('size', size);
    document.documentElement.setAttribute("style", `--set-size: ${size}`);
    console.log(size);
});

// Script for bootstrap popovers

let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
let popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
});

$(document).ready(function() {
    $("i.fas").popover({'trigger':'hover'});
    $("i.far").popover({'trigger':'hover'});
});

let popover = new bootstrap.Popover(document.querySelector('.popover-dismiss'), {
    trigger: 'hover'
});


// Keep sizing dropdown menu open
$(document).on('click', '.dropdown-stay', function (e) {
    console.log('propogate');
    e.stopPropagation();
});

// Copy to clipboard
function clipboardCopy() {
    let copyText = document.getElementById("copyTarget").textContent;
    navigator.clipboard.writeText(copyText)
        .then(() => { /*Alert by popover, otherwise: alert(`Copied: ${copyText}`)*/ })
        .catch((error) => { alert(`Copy failed! ${error}`) })
    
}