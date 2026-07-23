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

const signupButton = document.getElementById("signupBtn");
const loginButton = document.getElementById("loginBtn");

const status = document.getElementById("status");

let authenticationInProgress = false;

function showStatus(message) {
    if (status) {
        status.textContent = message;
    }
}

/*
    ==========================
    CREATE ACCOUNT
    ==========================
*/

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

            const credential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            /*
                Store the username inside Firebase Authentication.

                Firestore will automatically read this when it creates
                the profile.
            */

            await updateProfile(credential.user, {
                displayName: username
            });

            /*
                Create (or repair) the Firestore profile.
            */

            await ensureUserProfile(credential.user);

            window.location.href = "dashboard.html";

        }

        catch (error) {

            console.error(error);

            authenticationInProgress = false;

            showStatus(error.message);

        }

    });

}

/*
    ==========================
    LOGIN
    ==========================
*/

if (loginButton) {

    loginButton.addEventListener("click", async () => {

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        authenticationInProgress = true;

        try {

            showStatus("Logging in...");

            const credential =
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            /*
                Older accounts automatically receive
                Firestore profiles here.
            */

            await ensureUserProfile(credential.user);

            window.location.href = "dashboard.html";

        }

        catch (error) {

            console.error(error);

            authenticationInProgress = false;

            showStatus(error.message);

        }

    });

}

/*
    ==========================
    ALREADY LOGGED IN
    ==========================
*/

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        return;
    }

    if (authenticationInProgress) {
        return;
    }

    try {

        await ensureUserProfile(user);

        window.location.href = "dashboard.html";

    }

    catch (error) {

        console.error(error);

    }

});
