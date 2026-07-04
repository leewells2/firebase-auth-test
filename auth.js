import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const firebaseConfig = {

apiKey: "YOUR_API_KEY",

authDomain: "YOUR_PROJECT.firebaseapp.com",

projectId: "YOUR_PROJECT",

appId: "YOUR_APP_ID"

};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const email = document.getElementById("email");

const password = document.getElementById("password");

const status = document.getElementById("status");

document.getElementById("signupBtn").onclick = () => {

createUserWithEmailAndPassword(auth,email.value,password.value)

.then(() => {

status.textContent="Account created!";

})

.catch(error=>{

status.textContent=error.message;

});

};

document.getElementById("loginBtn").onclick = () => {

signInWithEmailAndPassword(auth,email.value,password.value)

.then(()=>{

window.location="dashboard.html";

})

.catch(error=>{

status.textContent=error.message;

});

};

onAuthStateChanged(auth,user=>{

if(user){

window.location="dashboard.html";

}

});
