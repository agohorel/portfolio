const webDevCategory = document.getElementById("works-webdev");
const graphicsCategory = document.getElementById("works-graphics");

const dropdownWeb = document.getElementById("dropdown-web");
const dropdownDesign = document.getElementById("dropdown-design");

const categories = [webDevCategory, graphicsCategory];
const dropdowns = [dropdownWeb, dropdownDesign];

for (let i = 0; i < categories.length; i++){
    categories[i].addEventListener("mouseover", () => {
        toggleVisibility(dropdowns[i]);
        animateDropdowns(dropdowns[i]);
    });

    categories[i].addEventListener("mouseout", () => {
        toggleVisibility(dropdowns[i]);
        animateDropdowns(dropdowns[i]);
    });

    dropdowns[i].addEventListener("mouseover", () => {
        toggleVisibility(dropdowns[i]);
        animateDropdowns(dropdowns[i]);
    });

    dropdowns[i].addEventListener("mouseout", () => {
        toggleVisibility(dropdowns[i]);
        animateDropdowns(dropdowns[i]);
    });
}

function toggleVisibility(element){
    element.classList.toggle("dropdown__fadeIn");
    element.classList.toggle("dropdown__fadeOut");
}

function animateDropdowns(element) {
    element.classList.toggle("dropdown__slide-in");
    element.classList.toggle("dropdown__slide-out");
}