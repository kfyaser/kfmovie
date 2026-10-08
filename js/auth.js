
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");


// =========================
// SIGN UP
// =========================

if (signupForm) {

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value;
        const confirmPassword = document.getElementById("signupConfirmPassword").value;


        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;
        }


        const user = {
            name: name,
            email: email,
            password: password
        };


        localStorage.setItem(
            "redmovieUser",
            JSON.stringify(user)
        );


        alert("Account created successfully!");


        window.location.href = "./login.html";

    });
}



// =========================
// LOGIN
// =========================

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;


        const savedUser =
            JSON.parse(localStorage.getItem("redmovieUser"));


        if (!savedUser) {

            alert("No account found. Please create an account first.");

            return;
        }


        if (
            email === savedUser.email &&
            password === savedUser.password
        ) {

            localStorage.setItem(
                "redmovieLoggedIn",
                "true"
            );


            alert(`Welcome back, ${savedUser.name}!`);


            window.location.href = "../index.html";

        } else {

            alert("Incorrect email or password.");

        }

    });

}
