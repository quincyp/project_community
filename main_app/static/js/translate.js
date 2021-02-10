
function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL}, 'google_translate_element');
}




// REVIEW: Below code attempts to get google translate element, select the dropdown item and submit a new value using language icon[ideally will query for user default].
// At this point the GTelement is selected, the dropdown value is changed on click of language icon, but is not submitted/selected to fire google translate.
const iconLanguage = document.getElementById('iconLanguage');
const googleElement = document.getElementById('google_translate_element');
// const googleSelect = document.querySelector('.goog-te-combo');
googleElement.setAttribute("onchange", "this.form.submit()");
console.log(googleElement);

iconLanguage.addEventListener("click", () => {
    const googleSelect = googleElement.children[0].children[0].children[0];
    console.log('clicked icon');
    dropDown();
    googleSelect.value = "af";
    // googleSelect.change();
    console.log(googleSelect);
});

googleElement.addEventListener("click", () => {
    console.log('clicked google');
});




dropDown = function () {
    var dropdown = googleElement.children[0].children[0].children[0];
    console.log(dropdown);
    try {
        showDropdown(dropdown);
    } catch(e) {

    }
    return false;
};
showDropdown = function (element) {
    var event;
    event = document.createEvent('MouseEvents');
    event.initMouseEvent('mousedown', true, true, window);
    element.dispatchEvent(event);
    console.log("show");
};