import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const welcomeMessage = document.getElementById("welcomeMessage");
const usernameDisplay = document.getElementById("usernameDisplay");
const emailDisplay = document.getElementById("emailDisplay");
const statusMessage = document.getElementById("status");
const logoutButton = document.getElementById("logoutBtn");

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "index.html";
        return;
    }

    try {
        const profileReference = doc(db, "users", user.uid);
        const profileSnapshot = await getDoc(profileReference);

        if (profileSnapshot.exists()) {
            const profile = profileSnapshot.data();

            welcomeMessage.textContent = `Welcome, ${profile.username}!`;
            usernameDisplay.textContent = `Username: ${profile.username}`;
        } else {
            welcomeMessage.textContent = "Welcome!";
            usernameDisplay.textContent = "No profile document was found.";
        }

        emailDisplay.textContent = `Email: ${user.email}`;
    } catch (error) {
        statusMessage.textContent = error.message;
    }
});

logoutButton.addEventListener("click", async () => {
    try {
        await signOut(auth);
        window.location.href = "index.html";
    } catch (error) {
        statusMessage.textContent = error.message;
    }
});
