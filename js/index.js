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
        // timeout to wait for visbility animations to change
        setTimeout(() => {
            updateScrollPositionIndicator();    
        }, 250);
    });
}

function setPortfolioView(elem, target){
    let matching = elem.filter((container) => {
        return container.getAttribute("data-container").indexOf(target) > -1;
    });

    let nonMatching = elem.filter((container) => {
        return container.getAttribute("data-container").indexOf(target) < 0;
    });

    nonMatching.forEach((nonMatchingElement) => {
        if (window.getComputedStyle(nonMatchingElement).display === "block"){
            nonMatchingElement.classList.remove("u-fadeIn");
            nonMatchingElement.classList.add("u-fadeOut");
            setTimeout(() => {
                nonMatchingElement.style.display = "none";
            }, 200);
        }
    });

    setTimeout(() => {
        matching[0].classList.remove("u-fadeOut");
        matching[0].classList.add("u-fadeIn");
        matching[0].style.display = "block";
    }, 200);
}

// scrolling progress indicator
window.onscroll = () => {
    updateScrollPositionIndicator();
};

function updateScrollPositionIndicator() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    let progressBar = document.querySelector(".scroll-progress__bar");
    progressBar.style.width = scrolled + "%";
}

// typing animation
const landingText1 = document.getElementById("landing-text-1");
const landingText2 = document.getElementById("landing-text-2");
const landingText3 = document.getElementById("landing-text-3");

let txt1 = "Hi, I'm Alex.";
let txt2 = "I'm a web developer and graphic designer and I want to work for you.";
let txt3 = "Hiring? Want to build something? Let's talk!";

let speed1 = 75;
let speed2 = 35;
let speed3 = 50;

function typewriter(elem, txt, speed) {
    for (let i = 0; i < txt.length; i++) {
        setTimeout(() => {
            elem.innerHTML += txt.charAt(i);
        }, speed * i);
    }
}

setTimeout(() => {
    typewriter(landingText1, txt1, speed1);
}, 750);

setTimeout(() => {
    typewriter(landingText2, txt2, speed2);
}, txt1.length * speed1 + 750);

setTimeout(() => {
    typewriter(landingText3, txt3, speed3);
}, txt2.length * speed3 + 750);