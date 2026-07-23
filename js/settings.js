import { auth } from "./firebase.js";

import {
    onAuthStateChanged,
    sendEmailVerification,
    sendPasswordResetEmail,
    updateEmail
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    getUserProfile
} from "./profile.js";

const displayName =
    document.getElementById("displayName");

const username =
    document.getElementById("username");

const currentEmail =
    document.getElementById("currentEmail");

const verificationStatus =
    document.getElementById("verificationStatus");

const status =
    document.getElementById("status");

function showStatus(message) {

    status.textContent = message;

}

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "index.html";

        return;

    }

    const profile =
        await getUserProfile(user.uid);

    displayName.value =
        profile.displayName;

    username.value =
        profile.username;

    currentEmail.textContent =
        profile.email;

    verificationStatus.textContent =
        profile.emailVerified
            ? "Verified"
            : "Not Verified";

});

document
.getElementById("verifyEmailBtn")
.addEventListener("click", async () => {

    await sendEmailVerification(
        auth.currentUser
    );

    showStatus(
        "Verification email sent."
    );

});

document
.getElementById("changePasswordBtn")
.addEventListener("click", async () => {

    await sendPasswordResetEmail(

        auth,

        auth.currentUser.email

    );

    showStatus(
        "Password reset email sent."
    );

});

document
.getElementById("changeEmailBtn")
.addEventListener("click", async () => {

    try {

        const newEmail =
            document
            .getElementById("newEmail")
            .value
            .trim();

        await updateEmail(

            auth.currentUser,

            newEmail

        );

        showStatus(
            "Email updated."
        );

    }

    catch(error){

        showStatus(
            error.message
        );

    }

});
