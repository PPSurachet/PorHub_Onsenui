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
        if (page.id === "Home") {
            addmovieFavorite();
        } else if (page.id === "Favorite") {
            getmovieFavourite();
        } else if (page.id === "Option") {
            Logout();
            document.querySelector("#ChangePassword").onclick = function () {
                document.querySelector('#Navigator_option').pushPage("views/ChangePassword.html")
            }
            document.querySelector("#editProfile").onclick = function () {
                document.querySelector('#Navigator_option').pushPage("views/editProfile.html")
            }
        } else if (page.id === "changePass") {
            showPassword();
            ChangePassword();
        } else if (page.id === "editProfile") {
            var user = firebase.auth().currentUser;
            editProfile(user)
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

function getmoviefromSearch() {
    const searchText = document.getElementById('searchResult').value
    $("#searchItem").empty();
    db.collection("movies").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const titlemovie = doc.data().title;
            if (titlemovie.indexOf(searchText) != -1) {
                const Result =
                    /*html*/
                    `<div class="imgfav d-flex align-items-end" style="background-image: url(${doc.data().posterURL}); ">
                        <div class="movietextbg">
                            <div class="movietitle">${doc.data().title}</div>
                        </div>
                    </div>`
                $("#searchItem").append(Result);
            }
        });
    });
}

function addmovieFavorite() {
    // $("#addFavorite").click(function () {
    //     var user = firebase.auth().currentUser;
    //     db.collection("movies").doc("God").update({
    //         uid: firebase.firestore.FieldValue.arrayUnion(user.uid)
    //     }).then(function () {
    //         console.log("Document successfully updated!");
    //     });
    // })
}

function getmovieFavourite() {
    // db.collection("movies").get().then(function (querySnapshot) {
    //     querySnapshot.forEach(function (doc) {
    //         var user = firebase.auth().currentUser;
    //         const getUserFavorite = doc.data().uid
    //         if (getUserFavorite.indexOf(user.uid) != -1) {
    //             const result =
    //                 /*html*/
    //                 `<div class="imgfav d-flex align-items-end" style="background-image: url(${doc.data().posterURL}); ">
    //                 <div class="movietextbg">
    //                     <div class="movietitle">${doc.data().title}</div>
    //                 </div>
    //             </div>`
    //             $("#showmovieFavorite").append(result)
    //         }
    //     });
    // });
}

function getprofileUser(data) {
    const profile =
        /*html*/
        `<img src="${data.photoURL}" class="imgprofile" alt="" srcset="">
        <div class="profileName">${data.displayName}</div>`;
    $("#Profile").append(profile)
}

function showPassword() {
    $("#showPassword").click(function () {
        var x = document.getElementById('oldpassword');
        var z = document.getElementById('newpassword');
        var y = document.getElementById('confirmpassword');
        if (x.type === "password") {
            z.type = "text"
            x.type = "text";
            y.type = "text";
            $("#showPassword").text("Hide")
        } else {
            x.type = "password";
            y.type = "password";
            z.type = "password"
            $("#showPassword").text("Show")
        }
    })
}

function ChangePassword() {
    $("#confirmPassword").click(function () {
        const newPass = document.getElementById('newpassword').value
        const conPass = document.getElementById('confirmpassword').value

        if (newPass == conPass) {
            var user = firebase.auth().currentUser;
            user.updatePassword(conPass).then(function () {
                if (ons.notification.alert("Change password is complete")) {
                    document.querySelector('#Navigator_option').popPage();
                }
            }).catch(function (error) {
                // An error happened.
            });
        } else {
            ons.notification.alert("Password isn't correct");
        }

    })
}

function editProfile(data) {
    const getprofile =
        /*html*/
        `<div class="text-center">
            <img src="${data.photoURL}" class="editImg" alt="" srcset="">
        </div>
        <ons-row class="row align-items-center">
            <div class="text-ifo">
                ID
            </div>
            <div class="center col-8">
                <input type="text" class="form-control" id="username" value="${data.displayName}">
            </div>
            <div class="right icon-pencil" id="saveEditProfile">
                <ons-icon size="40px" icon="md-edit"></ons-icon>
            </div>
        </ons-row>`
    $("#showEditProfile").append(getprofile);

    $("#saveEditProfile").click(function () {
        const newUsername = document.getElementById('username').value
        var user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: newUsername
        }).then(function () {
            location.reload();
            document.querySelector('#Navigator_option').popPage();
        }).catch(function (error) {
            // An error happened.
        });
    })
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