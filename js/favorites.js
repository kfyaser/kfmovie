
const movies = [
    {
        title: "Shadow Force",
        genre: "Action",
        year: "2026",
        rating: "8.8",
        image: "../assets/images/movie-1.jpg"
    },
    {
        title: "Dark Horizon",
        genre: "Thriller",
        year: "2026",
        rating: "9.1",
        image: "../assets/images/movie-2.jpg"
    },
    {
        title: "Red Empire",
        genre: "Drama",
        year: "2026",
        rating: "8.6",
        image: "../assets/images/movie-3.jpg"
    },
    {
        title: "Night Runner",
        genre: "Action",
        year: "2026",
        rating: "9.0",
        image: "../assets/images/movie-4.jpg"
    },
    {
        title: "Crazy Weekend",
        genre: "Comedy",
        year: "2026",
        rating: "8.2",
        image: "../assets/images/movie-5.jpg"
    },
    {
        title: "Broken Dreams",
        genre: "Drama",
        year: "2026",
        rating: "8.7",
        image: "../assets/images/movie-6.jpg"
    }
];

const favoritesGrid = document.getElementById("favoritesGrid");
const emptyFavorites = document.getElementById("emptyFavorites");

function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

function loadFavorites() {

    const favorites = getFavorites();

    favoritesGrid.innerHTML = "";

    if (favorites.length === 0) {
        emptyFavorites.style.display = "flex";
        return;
    }

    emptyFavorites.style.display = "none";

    favorites.forEach(title => {

        const movie = movies.find(item => item.title === title);

        if (!movie) return;

        const card = document.createElement("article");

        card.className = "movie-card";

        card.innerHTML = `
            <div class="poster">

                <img src="${movie.image}" alt="${movie.title}">

                <span class="movie-rating">
                    ★ ${movie.rating}
                </span>

                <a
                    href="./movie-details.html?movie=${encodeURIComponent(movie.title)}"
                    class="play-btn"
                >
                    ▶
                </a>

            </div>

            <h3>${movie.title}</h3>

            <p>
                ${movie.genre} • ${movie.year}
            </p>

            <button
                class="remove-favorite"
                data-title="${movie.title}"
            >
                ♥ Remove from Favorites
            </button>
        `;

        favoritesGrid.appendChild(card);
    });

    document.querySelectorAll(".remove-favorite").forEach(button => {

        button.addEventListener("click", () => {

            const title = button.dataset.title;

            let favorites = getFavorites();

            favorites = favorites.filter(movie => movie !== title);

            localStorage.setItem(
                "favorites",
                JSON.stringify(favorites)
            );

            loadFavorites();
        });
    });
}

loadFavorites();

