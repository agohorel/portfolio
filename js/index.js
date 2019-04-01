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


const dropdownLinks = document.querySelectorAll(".dropdown__link");
// portfolio containers
const websitesContainer = document.querySelector(".works__websites-container");
const projectsContainer = document.querySelector(".works__projects-container");
const portfolioContainers = [websitesContainer, projectsContainer];

let currentSelection = "websites";

for (let i = 0; i < dropdownLinks.length; i++){
    dropdownLinks[i].addEventListener("click", () => {
        currentSelection = dropdownLinks[i].innerText;
        setPortfolioView(portfolioContainers, currentSelection);
    });
}

function setPortfolioView(elem, target){
    let matching = elem.filter((container) => {
        for (let i = 0; i < container.classList.length; i++) {
            return container.classList[i].indexOf(target) > -1;
        }
    });

    matching[0].style.display = "block";

    let nonMatching = elem.filter((container) => {
        for (let i = 0; i < container.classList.length; i++) {
            return container.classList[i].indexOf(target) < 0;
        }
    });

    nonMatching.forEach((nonMatchingElement) => {
        nonMatchingElement.style.display = "none";
    });
}