import { auth } from "./firebase.js";
import { getUserProfile } from "./profile.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const welcomeMessage = document.getElementById("welcomeMessage");
const usernameDisplay = document.getElementById("usernameDisplay");
const emailDisplay = document.getElementById("emailDisplay");
const createdDisplay = document.getElementById("createdDisplay");
const statusDisplay = document.getElementById("status");
const logoutButton = document.getElementById("logoutBtn");

function showStatus(message) {

    if (statusDisplay) {
        statusDisplay.textContent = message;
    }

}

async function loadDashboard(user) {

    try {

        const profile = await getUserProfile(user.uid);

        if (!profile) {

            welcomeMessage.textContent = "Profile not found.";

            return;

        }

        /*
            Welcome Message
        */

        welcomeMessage.textContent =
            `Welcome, ${profile.displayName || profile.username}!`;

        /*
            Username
        */

        usernameDisplay.textContent =
            profile.username ?? "Unknown";

        /*
            Email
        */

        emailDisplay.textContent =
            profile.email ?? "Unknown";

        /*
            Member Since
        */

        if (profile.createdAt) {

            createdDisplay.textContent =
                profile.createdAt
                    .toDate()
                    .toLocaleDateString();

        }

        else {

            createdDisplay.textContent = "Unknown";

        }

    }

    catch (error) {

        console.error(error);

        showStatus(error.message);

    }

}

/*
    ==========================
    AUTHENTICATION
    ==========================
*/

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "index.html";

        return;

    }

    await loadDashboard(user);

});

/*
    ==========================
    LOGOUT
    ==========================
*/

if (logoutButton) {

    logoutButton.addEventListener("click", async () => {

        try {

            await signOut(auth);

            window.location.href = "index.html";

        }

        catch (error) {

            console.error(error);

            showStatus(error.message);

        }

    });

}
