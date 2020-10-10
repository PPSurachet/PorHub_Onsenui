$(function () {
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

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            window.location.href = "index.html"
        }
    });

    var imgtarget;

    db.collection("profilepic").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            const profileCarousel =
                `<ons-carousel-item>
                    <img src="${doc.data().profileURL}" id="${doc.data().id}" class="solid" width="80%">
                </ons-carousel-item>`;
            $("#carouselprofile").append(profileCarousel);
        });
        $("img").click(function () {
            $('img').removeClass('focused');
            $(this).addClass('focused');
            const profileTarget = $(this).attr('id')
            db.collection("profilepic").get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    if (profileTarget == doc.data().id) {
                        imgtarget = doc.data().profileURL;
                    }
                });
            });
        })
    });

    $("#signUp").click(function () {
        const email = $("#email").val();
        const password = $("#password").val();
        const name = $("#name").val();
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            ons.notification.alert(errorMessage);
        });

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var userupdate = firebase.auth().currentUser;
                userupdate.updateProfile({
                    displayName: name,
                    photoURL: imgtarget
                }).then(function () {
                    // Update successful.
                }).catch(function (error) {
                    // An error happened.
                });
                window.location.href = "index.html"
            }
        });

    })

    $("#showPasswordSignUp").click(function () {
        var x = document.getElementById('password');
        var y = document.getElementById('confirm');

        if (x.type === "password") {
            x.type = "text";
            y.type = "text";
            $("#showPassword").text("Hide")
        } else {
            x.type = "password";
            y.type = "password"
            $("#showPassword").text("Show")
        }
    })

    $("#btn-back").click(function () {
        window.location.href = "login.html"
    })
})