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
const createdDisplay = document.getElementById("createdDisplay");
const status = document.getElementById("status");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "index.html";
        return;
    }

    try {

        const snapshot = await getDoc(doc(db, "users", user.uid));

        if (snapshot.exists()) {

            const profile = snapshot.data();

            welcomeMessage.textContent = `Welcome, ${profile.username}!`;

            usernameDisplay.textContent = profile.username;

            emailDisplay.textContent = profile.email;

            if (profile.createdAt) {

                createdDisplay.textContent =
                    profile.createdAt.toDate().toLocaleString();

            } else {

                createdDisplay.textContent = "Unknown";

            }

        } else {

            welcomeMessage.textContent = "Profile not found.";

        }

    } catch (error) {

        status.textContent = error.message;

    }

});

document.getElementById("logoutBtn").addEventListener("click", async () => {

    await signOut(auth);

    window.location.href = "index.html";

});
