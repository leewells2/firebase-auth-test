import { auth } from "./firebase.js";

import {
    sendEmailVerification,
    reload,
    updateEmail
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

import { db } from "./firebase.js";

/*
==========================================
Send Verification Email
==========================================
*/

export async function sendVerificationEmail() {

    if (!auth.currentUser) {
        throw new Error("No logged in user.");
    }

    await sendEmailVerification(auth.currentUser);

}

/*
==========================================
Refresh Verification Status
==========================================
*/

export async function refreshVerificationStatus() {

    if (!auth.currentUser) {
        return false;
    }

    await reload(auth.currentUser);

    const verified = auth.currentUser.emailVerified;

    await updateDoc(

        doc(db, "users", auth.currentUser.uid),

        {

            emailVerified: verified

        }

    );

    return verified;

}

/*
==========================================
Change Email
==========================================
*/

export async function changeEmail(newEmail) {

    if (!auth.currentUser) {
        throw new Error("No logged in user.");
    }

    await updateEmail(auth.currentUser, newEmail);

    await updateDoc(

        doc(db, "users", auth.currentUser.uid),

        {

            email: newEmail,

            emailVerified: false

        }

    );

    await sendVerificationEmail();

}
