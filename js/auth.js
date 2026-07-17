import { auth } from "./firebase.js";
import { ensureUserProfile } from "./profile.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const statusMessage = document.getElementById("status");
const signupButton = document.getElementById("signupBtn");
const loginButton = document.getElementById("loginBtn");

let authenticationInProgress = false;

function showStatus(message) {
    if (statusMessage) {
        statusMessage.textContent = message;
    }
}

if (signupButton) {

    signupButton.addEventListener("click", async () => {

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!username) {
            showStatus("Please enter a username.");
            return;
        }

        if (username.length < 3) {
            showStatus("Username must be at least 3 characters.");
            return;
        }

        authenticationInProgress = true;

        try {

            showStatus("Creating account...");

            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            await updateProfile(userCredential.user, {
                displayName: username
            });

            await ensureUserProfile(userCredential.user);

            window.location.href = "dashboard.html";

        }

        catch (error) {

            authenticationInProgress = false;

            console.error(error);

            showStatus(error.message);

        }

    });

}

if (loginButton) {

    loginButton.addEventListener("click", async () => {

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        authenticationInProgress = true;

        try {

            showStatus("Logging in...");

            const userCredential =
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            await ensureUserProfile(userCredential.user);

            window.location.href = "dashboard.html";

        }

        catch (error) {

            authenticationInProgress = false;

            console.error(error);

            showStatus(error.message);

        }

    });

}

onAuthStateChanged(auth, async (user) => {

    if (user && !authenticationInProgress) {

        await ensureUserProfile(user);

        window.location.href = "dashboard.html";

    }

});
