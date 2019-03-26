const webDevCategory = document.getElementById("works-webdev");
const graphicsCategory = document.getElementById("works-graphics");

const dropdownWeb = document.getElementById("dropdown-web");
const dropdownDesign = document.getElementById("dropdown-design");

webDevCategory.addEventListener("mouseover", () => {
    dropdownWeb.classList.remove("dropdown__fadeOut");
    dropdownWeb.classList.add("dropdown__fadeIn");
});

webDevCategory.addEventListener("mouseout", () => {
    dropdownWeb.classList.remove("dropdown__fadeIn");
    dropdownWeb.classList.add("dropdown__fadeOut");
});

dropdownWeb.addEventListener("mouseover", () => {
    dropdownWeb.classList.remove("dropdown__fadeOut");
    dropdownWeb.classList.add("dropdown__fadeIn");
});

dropdownWeb.addEventListener("mouseout", () => {
    dropdownWeb.classList.remove("dropdown__fadeIn");
    dropdownWeb.classList.add("dropdown__fadeOut");
});

// design category 

graphicsCategory.addEventListener("mouseover", () => {
    dropdownDesign.classList.remove("dropdown__fadeOut");
    dropdownDesign.classList.add("dropdown__fadeIn");
});

graphicsCategory.addEventListener("mouseout", () => {
    dropdownDesign.classList.remove("dropdown__fadeIn");
    dropdownDesign.classList.add("dropdown__fadeOut");
});

dropdownDesign.addEventListener("mouseover", () => {
    dropdownDesign.classList.remove("dropdown__fadeOut");
    dropdownDesign.classList.add("dropdown__fadeIn");
});

dropdownDesign.addEventListener("mouseout", () => {
    dropdownDesign.classList.remove("dropdown__fadeIn");
    dropdownDesign.classList.add("dropdown__fadeOut");
});

