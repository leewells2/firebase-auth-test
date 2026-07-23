import { auth } from "./firebase.js";
import { getUserProfile } from "./profile.js";

/*
==================================================
Permission Levels
==================================================

Membership

guest
member
memberPlus
patreon

Role

user
founder

Special Access

enabled

Projects

pipboy3000
vaultOS
authenticationTemplate
espBoy

==================================================
*/

let cachedProfile = null;

async function loadProfile() {

    if (cachedProfile) {
        return cachedProfile;
    }

    const user = auth.currentUser;

    if (!user) {
        return null;
    }

    cachedProfile = await getUserProfile(user.uid);

    return cachedProfile;

}

export function clearPermissionCache() {

    cachedProfile = null;

}

/*
==================================================
Membership
==================================================
*/

export async function getMembership() {

    const profile = await loadProfile();

    if (!profile) {
        return "guest";
    }

    return profile.membership ?? "guest";

}

export async function isGuest() {

    return (await getMembership()) === "guest";

}

export async function isMember() {

    const membership = await getMembership();

    return (
        membership === "member" ||
        membership === "memberPlus" ||
        membership === "patreon"
    );

}

export async function isMemberPlus() {

    const membership = await getMembership();

    return (
        membership === "memberPlus" ||
        membership === "patreon"
    );

}

export async function isPatreon() {

    return (await getMembership()) === "patreon";

}

/*
==================================================
Roles
==================================================
*/

export async function getRole() {

    const profile = await loadProfile();

    if (!profile) {
        return "user";
    }

    return profile.role ?? "user";

}

export async function isFounder() {

    return (await getRole()) === "founder";

}

/*
==================================================
Special Access
==================================================
*/

export async function hasSpecialAccess() {

    const profile = await loadProfile();

    if (!profile) {
        return false;
    }

    return profile.specialAccess?.enabled ?? false;

}

export async function hasProjectAccess(projectName) {

    const profile = await loadProfile();

    if (!profile) {
        return false;
    }

    if (!profile.specialAccess?.enabled) {
        return false;
    }

    return profile.specialAccess.resources?.[projectName] === true;

}

/*
==================================================
Downloads
==================================================
*/

export async function canDownloadAuthenticationTemplate() {

    return true;

}

export async function canDownloadESPBoy() {

    return true;

}

export async function canPurchaseProducts() {

    return await isMember();

}

export async function canAccessEarlyAccess() {

    return await isMemberPlus();

}

export async function canAccessPatreonContent() {

    return await isPatreon();

}
