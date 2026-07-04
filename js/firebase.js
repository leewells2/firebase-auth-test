// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDkmoyIV57i7JzR7o5VA41y4wl9koiz510",
    authDomain: "test-auth-6b1c6.firebaseapp.com",
    projectId: "test-auth-6b1c6",
    storageBucket: "test-auth-6b1c6.firebasestorage.app",
    messagingSenderId: "117669694143",
    appId: "1:117669694143:web:263ab22991e90fe49e140a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { auth };
