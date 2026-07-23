import { db } from "./firebase.js";

import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

/*
    Generates a public-facing Forms ID.

    This is separate from the Firebase UID, which should remain internal.
    A stronger database-backed uniqueness check will be added with the
    permissions and security-rules system.
*/
function generateFormsId() {
    const number = Math.floor(10000000 + Math.random() * 90000000);

    return `WW-${number}`;
}

/*
    Produces a sensible username for older accounts that were created
    before usernames and Firestore profiles were added.
*/
function generateFallbackUsername(user) {
    if (user.displayName && user.displayName.trim()) {
        return user.displayName.trim();
    }

    if (user.email) {
        const emailName = user.email.split("@")[0].trim();

        if (emailName) {
            return emailName;
        }
    }

    return "NewUser";
}

/*
    Ensures that every authenticated Firebase user has a corresponding
    Firestore profile.

    New users:
    - Receive a full profile with safe default permissions.

    Existing users:
    - Keep their current membership, role and special access.
    - Have changing authentication information synchronised.
*/
export async function ensureUserProfile(user) {
    if (!user) {
        throw new Error("A signed-in Firebase user is required.");
    }

    const profileReference = doc(db, "users", user.uid);
    const profileSnapshot = await getDoc(profileReference);

    if (!profileSnapshot.exists()) {
        const username = generateFallbackUsername(user);

        const newProfile = {
            uid: user.uid,

            username,
            displayName: username,

            email: user.email ?? "",
            emailVerified: user.emailVerified,

            profilePicture: user.photoURL ?? "",

            formsId: generateFormsId(),

            /*
                Account access:

                guest:
                Can sign in, use forms and access guest downloads.

                Once email verification is implemented, verified guests
                can be promoted to normal members.
            */
            membership: "guest",

            /*
                Administrative role:

                user:
                No administrative control.

                founder:
                Full founder/admin permissions.

                This must later be protected by Firestore Security Rules
                so users cannot assign themselves a higher role.
            */
            role: "user",

            /*
                Special-access modifier.

                It can be applied to any membership level and grants access
                only to specifically selected projects or files.
            */
            specialAccess: {
                
                enabled: false,
                resources: {
                    pipboy3000: false,
                    vaultOS: false,
                    authenticationTemplate: true,
                    espBoy: false
                }
            },

            accountState: "guest",

            createdAt: serverTimestamp(),
            lastLoginAt: serverTimestamp()
        };

        await setDoc(profileReference, newProfile);

        return newProfile;
    }

    /*
        Use merge rather than replacing the profile.

        This updates authentication-controlled information without
        overwriting role, membership or special-access settings.
    */
    await setDoc(
        profileReference,
        {
            email: user.email ?? "",
            emailVerified: user.emailVerified,
            profilePicture:
                user.photoURL ??
                profileSnapshot.data().profilePicture ??
                "",
            lastLoginAt: serverTimestamp()
        },
        {
            merge: true
        }
    );

    const updatedSnapshot = await getDoc(profileReference);

    return updatedSnapshot.data();
}

/*
    Retrieves one user's profile.

    Returns null if no corresponding Firestore document exists.
*/
export async function getUserProfile(uid) {
    if (!uid) {
        throw new Error("A user UID is required.");
    }

    const profileReference = doc(db, "users", uid);
    const profileSnapshot = await getDoc(profileReference);

    if (!profileSnapshot.exists()) {
        return null;
    }

    return {
        id: profileSnapshot.id,
        ...profileSnapshot.data()
    };
}
