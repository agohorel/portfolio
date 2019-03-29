// portfolio categories
const webDevCategory = document.getElementById("works-webdev");
const graphicsCategory = document.getElementById("works-graphics");
// portfolio dropdown containers
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

// web dev dropdown items
const websitesBtn = document.getElementById("dropdown-websites");
const projectsBtn = document.getElementById("dropdown-projects");
// graphic design dropdown items
const albumArtBtn = document.getElementById("dropdown-album-art");
const logosBtn = document.getElementById("dropdown-logos");
const flyersBtn = document.getElementById("dropdown-flyers");
// dropdown items
const dropdownLinks = [websitesBtn, projectsBtn, albumArtBtn, logosBtn, flyersBtn];

// portfolio containers
const websitesContainer = document.querySelector(".works__website-container");
const projectsContainer = document.querySelector(".works__card-container");


let currentSelection = "websites";

for (let i = 0; i < dropdownLinks.length; i++){
    dropdownLinks[i].addEventListener("click", () => {
        currentSelection = dropdownLinks[i].innerText;
    });
}