import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-analytics.js";
// import firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB6n5lWtMWfZrTQZi6-OO3L5KBeiprQxSg",
    authDomain: "peddlars-a9978.firebaseapp.com",
    projectId: "peddlars-a9978",
    storageBucket: "peddlars-a9978.appspot.com",
    messagingSenderId: "697554972922",
    appId: "1:697554972922:web:3c726d839f3226aedf9943",
    measurementId: "G-T0196EWVMV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = firebase.auth(app);