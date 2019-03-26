const webDevCategory = document.getElementById("works-webdev");
const graphicsCategory = document.getElementById("works-graphics");

const dropdownWeb = document.getElementById("dropdown-web");

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