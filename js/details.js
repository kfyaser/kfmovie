
/* =========================
   MOVIE DATABASE
========================= */

const movies = {

    "Shadow Force": {
        title: "Shadow Force",
        year: "2026",
        genre: "Action",
        duration: "2h 18min",
        rating: "8.8",
        image: "../assets/images/movie-1.jpg",
        description:
            "An elite fighter enters a dangerous mission where survival depends on strength, strategy, and courage.",
        genres: ["Action", "Adventure", "Thriller"],
        director: "Alex Morgan",
        language: "English",
        quality: "HD",
        video: "../assets/videos/trailer.mp4"
    },


    "Dark Horizon": {
        title: "Dark Horizon",
        year: "2026",
        genre: "Thriller",
        duration: "2h 05min",
        rating: "9.1",
        image: "../assets/images/movie-2.jpg",
        description:
            "A mysterious threat appears in the darkness and changes everything for those who discover it.",
        genres: ["Thriller", "Mystery", "Drama"],
        director: "Daniel Stone",
        language: "English",
        quality: "4K",
        video: "../assets/videos/trailer.mp4"
    },


    "Red Empire": {
        title: "Red Empire",
        year: "2026",
        genre: "Drama",
        duration: "2h 12min",
        rating: "8.6",
        image: "../assets/images/movie-3.jpg",
        description:
            "A powerful story about ambition, loyalty, and the battle for control.",
        genres: ["Drama", "Crime", "Thriller"],
        director: "Michael Carter",
        language: "English",
        quality: "HD",
        video: "../assets/videos/trailer.mp4"
    },


    "Night Runner": {
        title: "Night Runner",
        year: "2026",
        genre: "Action",
        duration: "1h 58min",
        rating: "9.0",
        image: "../assets/images/movie-4.jpg",
        description:
            "A mysterious runner becomes involved in a dangerous world where every decision has consequences.",
        genres: ["Action", "Crime", "Thriller"],
        director: "Ryan Cole",
        language: "English",
        quality: "4K",
        video: "../assets/videos/trailer.mp4"
    },


    "Crazy Weekend": {
        title: "Crazy Weekend",
        year: "2026",
        genre: "Comedy",
        duration: "1h 42min",
        rating: "8.2",
        image: "../assets/images/movie-5.jpg",
        description:
            "A group of friends experience a chaotic weekend full of unexpected and hilarious events.",
        genres: ["Comedy", "Adventure"],
        director: "James Wilson",
        language: "English",
        quality: "HD",
        video: "../assets/videos/trailer.mp4"
    },


    "Broken Dreams": {
        title: "Broken Dreams",
        year: "2026",
        genre: "Drama",
        duration: "2h 01min",
        rating: "8.7",
        image: "../assets/images/movie-6.jpg",
        description:
            "A dramatic journey about hope, loss, and finding the strength to start again.",
        genres: ["Drama", "Romance"],
        director: "David Miller",
        language: "English",
        quality: "HD",
        video: "../assets/videos/trailer.mp4"
    }

};


/* =========================
   GET MOVIE FROM URL
========================= */

const params = new URLSearchParams(
    window.location.search
);

const movieName =
    params.get("movie") || "Shadow Force";

const movie =
    movies[movieName] || movies["Shadow Force"];


/* =========================
   SHOW MOVIE INFORMATION
========================= */

document.title =
    `REDMOVIE — ${movie.title}`;

document.getElementById("movieTitle").textContent =
    movie.title;

document.getElementById("movieYear").textContent =
    movie.year;

document.getElementById("movieGenre").textContent =
    movie.genre;

document.getElementById("movieDuration").textContent =
    movie.duration;

document.getElementById("movieRating").textContent =
    `★ ${movie.rating}`;

document.getElementById("moviePoster").src =
    movie.image;

document.getElementById("moviePoster").alt =
    movie.title;

document.getElementById("movieDescription").textContent =
    movie.description;

document.getElementById("movieDirector").textContent =
    movie.director;

document.getElementById("movieLanguage").textContent =
    movie.language;

document.getElementById("movieQuality").textContent =
    movie.quality;


/* BACKGROUND */

const background =
    document.getElementById("detailsBackground");

background.style.backgroundImage =
    `url("${movie.image}")`;


/* GENRES */

const genresContainer =
    document.getElementById("movieGenres");

movie.genres.forEach(genre => {

    const span =
        document.createElement("span");

    span.textContent = genre;

    genresContainer.appendChild(span);

});


/* =========================
   VIDEO PLAYER
========================= */

const watchMovie =
    document.getElementById("watchMovie");

const watchPlayer =
    document.getElementById("watchPlayer");

const closePlayer =
    document.getElementById("closePlayer");

const movieVideo =
    document.getElementById("movieVideo");


watchMovie.addEventListener("click", () => {

    movieVideo.src = movie.video;

    watchPlayer.classList.add("active");

    document.body.style.overflow = "hidden";

});


closePlayer.addEventListener("click", () => {

    movieVideo.pause();

    movieVideo.removeAttribute("src");

    movieVideo.load();

    watchPlayer.classList.remove("active");

    document.body.style.overflow = "";

});


/* =========================
   FAVORITES
========================= */

const favoriteBtn = document.getElementById("favoriteBtn");

function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

function updateFavoriteButton() {
    const favorites = getFavorites();

    if (favorites.includes(movie.title)) {
        favoriteBtn.textContent = "♥ Added to Favorites";
        favoriteBtn.classList.add("saved");
    } else {
        favoriteBtn.textContent = "♡ Add to Favorites";
        favoriteBtn.classList.remove("saved");
    }
}

updateFavoriteButton();

favoriteBtn.addEventListener("click", () => {
    let favorites = getFavorites();

    if (favorites.includes(movie.title)) {
        favorites = favorites.filter(item => item !== movie.title);
    } else {
        favorites.push(movie.title);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    updateFavoriteButton();
});
/* =========================
   MOBILE MENU
========================= */

const menuToggle =
    document.getElementById("menuToggle");

const navbar =
    document.querySelector(".navbar");


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

