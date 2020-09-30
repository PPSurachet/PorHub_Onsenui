var firebaseConfig = {
    apiKey: "AIzaSyBbJnVvL1YjxtX17Rk7tqBukUGMObT4zAg",
    authDomain: "porhub-bf02f.firebaseapp.com",
    databaseURL: "https://porhub-bf02f.firebaseio.com",
    projectId: "porhub-bf02f",
    storageBucket: "porhub-bf02f.appspot.com",
    messagingSenderId: "580268459147",
    appId: "1:580268459147:web:613c1bfc8883bc4bd4808e",
    measurementId: "G-VC5M761WHZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();

// firebase.auth().onAuthStateChanged(function (user) {
//     if (user) {
//         var email = user.email;
//     } else {
//         window.location.href = "login.html"
//     }
// });

$(function () {


});