// Initialize Firebase
// TODO 1: Change to your firebase configuration
//     Steps:
//     1. Create new Firebase project
//     2. Copy and paste firebase config below
//     Important: Make sure there is databaseURL in the config.
//     Note: If there is no databaseURL in the config,
//           go to firebase console -> Realtime Database to find the databaseURL.

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    // apiKey: "AIzaSyAeahfhT8pdx2J-49AkQ9HAtDcJU01Ro3I",
    // authDomain: "lab06-111062.firebaseapp.com",
    // projectId: "lab06-111062",
    // storageBucket: "lab06-111062.appspot.com",
    // messagingSenderId: "1006110077159",
    // appId: "1:1006110077159:web:4576311b909a1beb50f242",
    // measurementId: "G-9BLNRQN4PT",
    // // databaseURL
    // databaseURL: "https://lab06-111062-default-rtdb.firebaseio.com/"
    apiKey: "AIzaSyAeahfhT8pdx2J-49AkQ9HAtDcJU01Ro3I",
    authDomain: "lab06-111062.firebaseapp.com",
    databaseURL: "https://lab06-111062-default-rtdb.firebaseio.com",
    projectId: "lab06-111062",
    storageBucket: "lab06-111062.appspot.com",
    messagingSenderId: "1006110077159",
    appId: "1:1006110077159:web:4576311b909a1beb50f242",
    measurementId: "G-9BLNRQN4PT"
};

// Initialize Fireba
firebase.initializeApp(config);