
const authNav = document.getElementById("authNav");

if (authNav) {

    const loggedIn = localStorage.getItem("redmovieLoggedIn");

    const savedUser = JSON.parse(
        localStorage.getItem("redmovieUser")
    );

    if (loggedIn === "true" && savedUser) {

        authNav.innerHTML = `
            <span class="user-name">
                Hi, ${savedUser.name}
            </span>

            <button class="logout-btn" id="logoutBtn">
                Logout
            </button>
        `;

        const logoutBtn = document.getElementById("logoutBtn");

        logoutBtn.addEventListener("click", () => {

            localStorage.removeItem("redmovieLoggedIn");

            window.location.reload();

        });
    }
}

