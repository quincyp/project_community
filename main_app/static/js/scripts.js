
// Script for bootstrap popovers

let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
let popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
})

let popover = new bootstrap.Popover(document.querySelector('.popover-dismiss'), {
    trigger: 'hover focus'
})


// Copy to clipboard
function clipboardCopy() {
    let copyText = document.getElementById("copyTarget").textContent;
    navigator.clipboard.writeText(copyText)
        .then(() => { /*Alert by popover, otherwise: alert(`Copied: ${copyText}`)*/ })
        .catch((error) => { alert(`Copy failed! ${error}`) })
    
}
