// portfolio categories
const webDevCategory = document.getElementById("works-webdev");
const graphicsCategory = document.getElementById("works-graphics");
// portfolio dropdown containers
const dropdownWeb = document.getElementById("dropdown-web");
const dropdownDesign = document.getElementById("dropdown-design");

const categories = [webDevCategory, graphicsCategory];
const dropdowns = [dropdownWeb, dropdownDesign];

for (let i = 0; i < categories.length; i++){
    categories[i].addEventListener("click", function() {
        let target = this.parentElement.children[1];
        toggleVisibility(target);

        // get other dropdown than the one we just clicked
        let other = this.parentElement.nextElementSibling || this.parentElement.previousElementSibling;
        let otherTarget = other.children[1];
        forceHidden(otherTarget);
    });


    dropdowns[i].addEventListener("click", function() {
        let target = this.parentElement.children[1];
        forceHidden(target);
    });
}

function toggleVisibility(element){
    element.classList.toggle("dropdown__fadeIn");
    element.classList.toggle("dropdown__fadeOut");
    element.classList.toggle("dropdown__slide-in");
    element.classList.toggle("dropdown__slide-out");
}

function forceHidden(elem) {
    elem.classList.remove("dropdown__fadeIn");
    elem.classList.add("dropdown__fadeOut");
    elem.classList.remove("dropdown__slide-in");
    elem.classList.add("dropdown__slide-out");
}

const dropdownLinks = document.querySelectorAll(".dropdown__link");
// portfolio containers
const websitesContainer = document.querySelector(".works__websites-container");
const projectsContainer = document.querySelector(".works__projects-container");
const albumsContainer = document.querySelector(".works__album-container");
const miscContainer = document.querySelector(".works__misc-container");
const portfolioContainers = [websitesContainer, projectsContainer, albumsContainer, miscContainer];

let currentSelection = "websites";

for (let i = 0; i < dropdownLinks.length; i++){
    dropdownLinks[i].addEventListener("click", () => {
        currentSelection = dropdownLinks[i].innerText;
        setPortfolioView(portfolioContainers, currentSelection);
    });
}

function setPortfolioView(elem, target){
    let matching = elem.filter((container) => {
        return container.getAttribute("data-container").indexOf(target) > -1;
    });

    matching[0].style.display = "block";

    let nonMatching = elem.filter((container) => {
        return container.getAttribute("data-container").indexOf(target) < 0;
    });

    nonMatching.forEach((nonMatchingElement) => {
        nonMatchingElement.style.display = "none";
    });

}