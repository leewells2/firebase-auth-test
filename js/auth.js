import { ensureUserProfile } from "./profile.js";
import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const statusMessage = document.getElementById("status");
const signupButton = document.getElementById("signupBtn");
const loginButton = document.getElementById("loginBtn");

let authenticationInProgress = false;

function showStatus(message) {
    statusMessage.textContent = message;
}

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

        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCredential.user;

        showStatus("Saving profile...");

        console.log("About to write to Firestore...");
        
        try {
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                username,
                email: user.email,
                createdAt: serverTimestamp()
            });

            console.log("Firestore write succeeded!");

        } catch (err) {
            console.error("Firestore write failed:", err);
            showStatus(err.message);
        }
        
        window.location.href = "dashboard.html";
    } catch (error) {
        authenticationInProgress = false;
        console.error(error);
        showStatus(error.message);
    }
});

loginButton.addEventListener("click", async () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    authenticationInProgress = true;

    try {
        showStatus("Logging in...");

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        window.location.href = "dashboard.html";
    } catch (error) {
        authenticationInProgress = false;
        console.error(error);
        showStatus(error.message);
    }
});

onAuthStateChanged(auth, (user) => {
    if (user && !authenticationInProgress) {
        window.location.href = "dashboard.html";
    }
});
