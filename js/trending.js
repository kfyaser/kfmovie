
const menuToggle = document.getElementById("menuToggle");
const navbar = document.querySelector(".navbar");

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", () => {
        navbar.classList.toggle("active");
    });

    navbar.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {
            navbar.classList.remove("active");
        });

    });

}
