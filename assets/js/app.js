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


$(function () {

    checkUserLogin();

    document.addEventListener('init', function (event) {
        var page = event.target;
        if (page.id === "Option") {
            Logout();
        }
        else if (page.id === "Favorite" ){
            getmovieFavourite();
        
        }
    });

});

function checkUserLogin() {

    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            // var displayName = user.displayName;
            // var email = user.email;
            // var emailVerified = user.emailVerified;
            // var photoURL = user.photoURL;
            // var isAnonymous = user.isAnonymous;
            // var uid = user.uid;
            // var providerData = user.providerData;
            // console.log("displayname => " + displayName);
            // console.log("email => " + email);
            // console.log("emailVerified => " + emailVerified);
            // console.log("photoURL => " + photoURL);
            // console.log("isAnonymous => " + isAnonymous);
            // console.log("uid => " + uid);
            // console.log("proviederData => " + providerData);
            getprofileUser(user);
        } else {
            window.location.href = "login.html"
        }

    });
}

function Logout() {
    $("#Logout").click(function () {
        firebase.auth().signOut().then(function () {
            window.location.href = "login.html"
        }).catch(function (error) {
            // An error happened.
        });
    })
}

function getprofileUser(data) {
    const profile =
        /*html*/
        `<img src="${data.photoURL}" class="imgprofile" alt="" srcset="">
                <div class="profileName">${data.displayName}</div>`;
    $("#Profile").append(profile)
}

function getmovieFavourite() {
    // db.collection("movies").get().then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {     
    //         const result = ` 
    //         <div class="imgfav d-flex align-items-end" style="background-image: url(${doc.data().posterURL}); ">
    //             <div class="movietextbg">
    //                 <div class="movietitle">${doc.data().title}</div>
    //             </div>
    //         </div>`
    //         $("#showmovieFavorite").append(result)
    //         console.log(doc.data().posterURL);
    //     });
    // });
}
