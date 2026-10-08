// =========================
// MOVIE SEARCH & FILTER
// =========================

const searchInput = document.getElementById("movieSearch");
const genreButtons = document.querySelectorAll(".genre-btn");
const movieCards = document.querySelectorAll(".movie-card");
const noResults = document.getElementById("noResults");

let selectedGenre = "all";

function filterMovies() {
    if (!searchInput) return;

    const searchValue = searchInput.value.toLowerCase().trim();
    let visibleMovies = 0;

    movieCards.forEach(movie => {
        const title = movie.querySelector("h3")?.textContent.toLowerCase() || "";
        const genre = movie.dataset.genre;

        const matchesSearch = title.includes(searchValue);
        const matchesGenre =
            selectedGenre === "all" || genre === selectedGenre;

        if (matchesSearch && matchesGenre) {
            movie.style.display = "block";
            visibleMovies++;
        } else {
            movie.style.display = "none";
        }
    });

    if (noResults) {
        noResults.style.display =
            visibleMovies === 0 ? "block" : "none";
    }
}

if (searchInput) {
    searchInput.addEventListener("input", filterMovies);
}

genreButtons.forEach(button => {
    button.addEventListener("click", () => {
        genreButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");
        selectedGenre = button.dataset.genre;

        filterMovies();
    });
});


// =========================
// MOBILE MENU
// =========================

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


// =========================
// GLOBAL SEARCH
// =========================

const searchBtn = document.getElementById("searchBtn");
const searchOverlay = document.getElementById("searchOverlay");
const searchClose = document.getElementById("searchClose");
const globalSearch = document.getElementById("globalSearch");
const searchResults = document.getElementById("searchResults");
const searchEmpty = document.getElementById("searchEmpty");

const searchMovies = [
    {
        title: "Shadow Force",
        genre: "Action",
        rating: "8.8",
        image: "./assets/images/movie-1.jpg"
    },
    {
        title: "Dark Horizon",
        genre: "Thriller",
        rating: "9.1",
        image: "./assets/images/movie-2.jpg"
    },
    {
        title: "Red Empire",
        genre: "Drama",
        rating: "8.6",
        image: "./assets/images/movie-3.jpg"
    },
    {
        title: "Night Runner",
        genre: "Action",
        rating: "9.0",
        image: "./assets/images/movie-4.jpg"
    },
    {
        title: "Crazy Weekend",
        genre: "Comedy",
        rating: "8.2",
        image: "./assets/images/movie-5.jpg"
    },
    {
        title: "Broken Dreams",
        genre: "Drama",
        rating: "8.7",
        image: "./assets/images/movie-6.jpg"
    }
];

function openSearch() {
    if (!searchOverlay) return;

    searchOverlay.classList.add("active");
    document.body.style.overflow = "hidden";

    setTimeout(() => {
        if (globalSearch) {
            globalSearch.focus();
        }
    }, 200);
}

function closeSearch() {
    if (!searchOverlay) return;

    searchOverlay.classList.remove("active");
    document.body.style.overflow = "";

    if (globalSearch) {
        globalSearch.value = "";
    }

    if (searchResults) {
        searchResults.innerHTML = "";
    }

    if (searchEmpty) {
        searchEmpty.style.display = "none";
    }
}

function searchMovieList() {
    if (!globalSearch || !searchResults) return;

    const value = globalSearch.value.toLowerCase().trim();

    searchResults.innerHTML = "";

    if (value === "") {
        if (searchEmpty) {
            searchEmpty.style.display = "none";
        }
        return;
    }

    const results = searchMovies.filter(movie =>
        movie.title.toLowerCase().includes(value)
    );

    if (results.length === 0) {
        if (searchEmpty) {
            searchEmpty.style.display = "block";
        }
        return;
    }

    if (searchEmpty) {
        searchEmpty.style.display = "none";
    }

    results.forEach(movie => {
        const result = document.createElement("a");

        result.href =
            `./pages/movie-details.html?movie=${encodeURIComponent(movie.title)}`;

        result.className = "search-result";

        result.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <div>
                <h3>${movie.title}</h3>
                <p>${movie.genre} • ★ ${movie.rating}</p>
            </div>
        `;

        searchResults.appendChild(result);
    });
}

if (searchBtn) {
    searchBtn.addEventListener("click", openSearch);
}

if (searchClose) {
    searchClose.addEventListener("click", closeSearch);
}

if (globalSearch) {
    globalSearch.addEventListener("input", searchMovieList);
}

document.addEventListener("keydown", event => {
    if (
        event.key === "Escape" &&
        searchOverlay &&
        searchOverlay.classList.contains("active")
    ) {
        closeSearch();
    }
});


// =========================
// FAVORITES
// =========================

const favoriteButtons = document.querySelectorAll(".card-favorite");

function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

function saveFavorites(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

function updateFavoriteButtons() {
    const favorites = getFavorites();

    favoriteButtons.forEach(button => {
        const title = button.dataset.title;

        if (favorites.includes(title)) {
            button.textContent = "♥";
            button.classList.add("saved");
        } else {
            button.textContent = "♡";
            button.classList.remove("saved");
        }
    });
}

favoriteButtons.forEach(button => {
    button.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();

        const title = button.dataset.title;

        let favorites = getFavorites();

        if (favorites.includes(title)) {
            favorites = favorites.filter(movie => movie !== title);
        } else {
            favorites.push(title);
        }

        saveFavorites(favorites);
        updateFavoriteButtons();
    });
});

updateFavoriteButtons();