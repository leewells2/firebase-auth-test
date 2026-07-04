import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDkmoyIV57i7JzR7o5VA41y4wl9koiz510",
    authDomain: "test-auth-6b1c6.firebaseapp.com",
    projectId: "test-auth-6b1c6",
    storageBucket: "test-auth-6b1c6.firebasestorage.app",
    messagingSenderId: "117669694143",
    appId: "1:117669694143:web:263ab22991e90fe49e140a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
