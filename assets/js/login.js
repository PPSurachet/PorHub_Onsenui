$(function () {
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

    $("#signInWithGoogle").click(function () {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
        firebase.auth().getRedirectResult().then(function (result) {
            if (result.credential) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // ...
            }
            // The signed-in user info.
            var user = result.user;
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    })
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            window.location.href = "PorHub.html"
        }
    });
});