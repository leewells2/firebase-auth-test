import { auth } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    doc,
    setDoc,
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";


const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const status = document.getElementById("status");

document.getElementById("signupBtn").addEventListener("click", async () => {

    try {

        await createUserWithEmailAndPassword(
            auth,
            email.value,
            password.value
        );

        status.textContent = "Account created successfully.";

    }

    catch(error){

        status.textContent = error.message;

    }

});

document.getElementById("loginBtn").addEventListener("click", async () => {

    try{
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const status = document.getElementById("status");

document.getElementById("signupBtn").addEventListener("click", async () => {

    try {

        await createUserWithEmailAndPassword(
            auth,
            email.value,
            password.value
        );

        status.textContent = "Account created successfully.";

    }

    catch(error){

        status.textContent = error.message;

    }

});

document.getElementById("loginBtn").addEventListener("click", async () => {

    try{
