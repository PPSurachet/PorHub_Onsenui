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


    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var email = user.email;
            window.location.href = "index.html"
        }
    });

    $("#signIn").click(function () {
        const email = $("#email").val();
        const password = $("#password").val();
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            ons.notification.alert(errorMessage);
        });
    })

    $("#showPassword").click(function () {
        var x = document.getElementById('password');
        if (x.type === "password") {
            x.type = "text";
            $("#showPassword").text("Hide")
        } else {
            x.type = "password";
            $("#showPassword").text("Show")
        }
    })
});