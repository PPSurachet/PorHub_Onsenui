$(function () {
    var db = firebase.firestore();

    // firebase.auth().onAuthStateChanged(function (user) {
    //     if (user) {
    //         window.location.href = "index.html"
    //     }
    // });

    var imgtarget;

    db.collection("profilepic").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            const profileCarousel =
                `<div style="width:150px">
                    <ons-carousel-item>
                        <img src="${doc.data().profileURL}" id="${doc.data().id}" class="solid" width="80%">
                    </ons-carousel-item>
                </div>`;
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
                    window.location.href = "index.html"
                }).catch(function (error) {
                    // An error happened.
                });
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