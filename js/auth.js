import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    doc,
    setDoc,
    getDocs,
    query,
    where,
    collection
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const status = document.getElementById("status");

// Create Account
document.getElementById("signupBtn").addEventListener("click", async () => {

    try {

        // Check username entered
        if (!username.value.trim()) {
            status.textContent = "Please enter a username.";
            return;
        }

        // Check username isn't already in use
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

        const user = userCredential.user;

        // Create Firestore profile
        await setDoc(doc(db, "users", user.uid), {
            username: username.value.trim(),
            email: user.email,
            uid: user.uid,
            createdAt: new Date().toISOString()
        });

        window.location.href = "dashboard.html";

    } catch (error) {

        status.textContent = error.message;

    }

});

// Login
document.getElementById("loginBtn").addEventListener("click", async () => {

    try {

        await signInWithEmailAndPassword(
            auth,
            email.value,
            password.value
        );

        window.location.href = "dashboard.html";

    } catch (error) {

        status.textContent = error.message;

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

