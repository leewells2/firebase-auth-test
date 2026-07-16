import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    doc,
    setDoc,
    getDocs,
    collection,
    query,
    where
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const status = document.getElementById("status");

document.getElementById("signupBtn").addEventListener("click", async () => {

    try {

        if (!username.value.trim()) {
            status.textContent = "Please enter a username.";
            return;
        }

        // Check if username already exists
        const usernameQuery = query(
            collection(db, "users"),
            where("username", "==", username.value.trim())
        );

        const usernameSnapshot = await getDocs(usernameQuery);

        if (!usernameSnapshot.empty) {
            status.textContent = "Username already taken.";
            return;
        }

        // Create Authentication account
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email.value,
            password.value
        );

        // Create Firestore user profile
        await setDoc(doc(db, "users", userCredential.user.uid), {
            username: username.value.trim(),
            email: email.value,
            created: new Date().toISOString()
        });

        window.location.href = "dashboard.html";

    }
    catch (error) {

        status.textContent = error.message;

    }

});

document.getElementById("loginBtn").addEventListener("click", async () => {

    try {

        await signInWithEmailAndPassword(
            auth,
            email.value,
            password.value
        );

        window.location.href = "dashboard.html";

    }
    catch (error) {

        status.textContent = error.message;

    }

});

onAuthStateChanged(auth, (user) => {

    if (user) {

        window.location.href = "dashboard.html";

    }

});
        await signInWithEmailAndPassword(
            auth,
            email.value,
            password.value
        );

        window.location.href = "dashboard.html";

    }

    catch(error){

        status.textContent = error.message;

    }

});

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {

    if (user) {

        window.location.href = "dashboard.html";

    }

});
