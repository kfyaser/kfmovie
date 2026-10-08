
const genreButtons = document.querySelectorAll(".genre-btn");
const movieCards = document.querySelectorAll(".movie-card");
const noResults = document.getElementById("genreNoResults");

genreButtons.forEach(button => {

    button.addEventListener("click", () => {

        genreButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const selectedGenre = button.dataset.genre;

        let visibleMovies = 0;

        movieCards.forEach(movie => {

            const movieGenre = movie.dataset.genre;

            if (
                selectedGenre === "all" ||
                movieGenre === selectedGenre
            ) {

                movie.style.display = "block";
                visibleMovies++;

            } else {

                movie.style.display = "none";

            }

        });

        if (visibleMovies === 0) {
            noResults.style.display = "block";
        } else {
            noResults.style.display = "none";
        }

    });

});


/* MOBILE MENU */

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

