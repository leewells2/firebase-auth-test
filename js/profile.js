import { db } from "./firebase.js";

import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

/*
    Ensures every authenticated user has
    a Firestore profile.

    Existing users are updated.
    New users are created automatically.
*/

export async function ensureUserProfile(user) {

    const profileRef = doc(db, "users", user.uid);

    const profileSnap = await getDoc(profileRef);

    if (!profileSnap.exists()) {

        await setDoc(profileRef, {

            uid: user.uid,

            username: user.displayName || "New User",

            displayName: user.displayName || "New User",

            email: user.email,

            emailVerified: user.emailVerified,

            accountStatus: "guest",

            membership: "guest",

            role: "user",

            specialAccess: {

                enabled: false,

                projects: {}

            },

            profilePicture: "",

            formsId: generateFormsId(),

            createdAt: serverTimestamp(),

            lastLogin: serverTimestamp()

        });

        return;

    }

    await updateDoc(profileRef, {

        email: user.email,

        emailVerified: user.emailVerified,

        lastLogin: serverTimestamp()

    });

}

function generateFormsId() {

    return "WW-" + Math.floor(
        100000 + Math.random() * 900000
    );

}
