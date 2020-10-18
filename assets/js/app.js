var db = firebase.firestore();

$(function () {
    checkUserLogin();
    document.addEventListener('init', function (event) {
        var page = event.target;
        if (page.id === "Home") {
            getmovieRecommend();
            getmovie();
        } else if (page.id === "Search") {
            getmovieCategory();
        } else if (page.id === "Favorite") {
            getmovieFavourite();
        } else if (page.id === "Option") {
            Logout();
            OptionPush();
        } else if (page.id === "changePass") {
            showPassword();
            ChangePassword();
            document.querySelector("#btn-back-option").onclick = function () {
                document.querySelector('#Navigator_option').popPage();
            }
        } else if (page.id === "editProfile") {
            var user = firebase.auth().currentUser;
            editProfile(user)
            document.querySelector("#btn-back-option").onclick = function () {
                document.querySelector('#Navigator_option').popPage();
            }
        }
    });

    document.querySelector('ons-tabbar').addEventListener('reactive', function (event) {
        if (event.index == 0) {
            document.querySelector('#Navigator_home').popPage();
        } else if (event.index == 1) {
            document.querySelector('#Navigator_search').popPage();
        } else if (event.index == 2) {
            document.querySelector('#Navigator_favorite').popPage();
        } else if (event.index == 3) {
            document.querySelector('#Navigator_option').popPage();
        }
    })
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

function getmovieRecommend() {
    db.collection("movies").where("rating", ">=", 9).orderBy("rating")
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                const Result =
                    /*html*/
                    `<div class="area-imgMovie">
                        <ons-carousel-item id="${doc.data().id}">
                            <img src="${doc.data().posterURL}" class="imgMovie" width="100%" alt="" srcset="">
                        </ons-carousel-item>
                    </div>`
                $("#carousel-recommend").append(Result);
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
}

function getmovie() {
    db.collection("movies").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            const Result =
                /*html*/
                `<div class="area-imgMovie">
                    <ons-carousel-item id="${doc.data().id}">
                        <img src="${doc.data().posterURL}" class="imgMovie" width="100%" alt="" srcset="">
                    </ons-carousel-item>
                </div>`
            if (doc.data().category[0] == "Action") {
                $("#carousel-action").append(Result);

            } else if (doc.data().category[0] == "Adventure") {
                $("#carousel-adventure").append(Result);

            } else if (doc.data().category[0] == "Fantasy") {
                $("#carousel-fantasy").append(Result);

            } else if (doc.data().category[0] == "Comedy") {
                $("#carousel-comedy").append(Result);

            } else if (doc.data().category[0] == "Horror") {
                $("#carousel-horror").append(Result);
            }
        });
        $(".area-imgMovie ons-carousel-item").click(function () {
            const movieTarget = $(this).attr('id');
            getmovieDetail(movieTarget);
            document.querySelector("#Navigator_home").pushPage("views/movieDetail.html");
        });
    });
}

function getmovieDetail(Target) {
    $("#showMovieDetail").empty();
    db.collection("movies").doc(Target).get().then(function (doc) {
        const result =
            /*html*/
            `<div class="img-backgound-detail" style="background-image: url(${doc.data().posterURL});">
                <div class="area-margin d-flex justify-content-between">
                    <ons-back-button></ons-back-button>
                </div>
                <div class="area-imgDetail">
                    <img src="${doc.data().posterURL}" class="imgDetail" alt="" srcset="">
                </div>
            </div>
            <div class="bg-buttonDetail text-center">
                <ons-row class="area-categoryDetail Prompt" id="CategoryMovie"></ons-row>
                <div class="area-btn" id="btnFavorite">
                </div>
                <div class="area-btn">
                    <button type="button" id="btnTrailer" class="trailer-btn btn-lg btn-block">Watch Trailer</button>
                    <div id="showTrailer"></div>
                </div>
                <div class="area-btn">
                    <button type="button" id="btnPlay" class="play-btn btn-lg btn-block">PLAY</button>
                    <div id="showVideo"></div>
                </div>
                <div class="title-text Prompt">
                    ${doc.data().title} ${doc.data().year}
                </div>
                <div class="review-text Prompt">
                    ${doc.data().review}
                </div>
            </div>`
        $("#showMovieDetail").append(result)

        const TrailerMovie =
            /*html*/
            `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${doc.data().trailerURL}" allowfullscreen></iframe>`
        $("#showTrailer").append(TrailerMovie)
        $("#showTrailer").hide();

        $("#btnTrailer").click(function () {
            $("#showTrailer").toggle();
        })

        $("#btnPlay").click(function () {
            $("#showVideo").empty();
            const videoURL =
                /*html*/
                `<video id="my-video" class="video-js" controls preload="auto" autoplay data-setup="{}">
                    <source src="${doc.data().videoURL}" type="video/mp4" />
                </video>`
            $("#showVideo").append(videoURL)

            var docElm = document.getElementById('my-video')
            // $("#my-video").requestFullscreen();
            docElm.requestFullscreen();
        })

        const getCategory = doc.data().category;
        for (var i = 0; i < getCategory.length; i++) {
            const Category =
                /*html*/
                `<div class="categoryDetail">${getCategory[i]}</div>`
            $("#CategoryMovie").append(Category)
        }

        const ratingResult =
            /*html*/
            `<div class="rating-text Prompt">
                <ons-icon size="24px" icon="md-star"></ons-icon> ${doc.data().rating}
            </div>`
        $("#CategoryMovie").append(ratingResult)

        var user = firebase.auth().currentUser;
        if (doc.data().uid.indexOf(user.uid) != -1) {
            const RevFavor =
                /*html*/
                `<button type="button" class="favorite-btn btn-lg btn-block" id="RemoveFavorite">Remove Favourite</button>`
            $("#btnFavorite").append(RevFavor)
        } else {
            const addFavor =
                /*html*/
                `<button type="button" class="favorite-btn btn-lg btn-block" id="addFavorite">Add Favourite</button>`
            $("#btnFavorite").append(addFavor)
        }
        addmovieFavorite(doc.data())

    }).catch(function (error) {
        console.log("Error getting cached document:", error);
    });
}

function addmovieFavorite(data) {
    $("#btnFavorite button").click(function () {
        var user = firebase.auth().currentUser;
        if (this.id == "addFavorite") {
            $(this).html("Remove Favorite")
            $(this).attr("id", "RemoveFavorite")
            db.collection("movies").doc(data.id).update({
                uid: firebase.firestore.FieldValue.arrayUnion(user.uid)
            }).then(function () {
                getmovieFavourite();
            });
        } else if (this.id == "RemoveFavorite") {
            $(this).html("Add Favorite")
            $(this).attr("id", "addFavorite")
            db.collection("movies").doc(data.id).update({
                uid: firebase.firestore.FieldValue.arrayRemove(user.uid)
            }).then(function () {
                getmovieFavourite();
            });
        }
    })
}

function getmovieDetailSrc(Target) {
    $("#showMovieDetailSrc").empty();
    db.collection("movies").doc(Target).get().then(function (doc) {
        const result =
            /*html*/
            `<div class="img-backgound-detail" style="background-image: url(${doc.data().posterURL});">
                <div class="area-margin d-flex justify-content-between">
                    <ons-back-button class="back-button"></ons-back-button>
                </div>
                <div class="area-imgDetail">
                    <img src="${doc.data().posterURL}" class="imgDetail" alt="" srcset="">
                </div>
            </div>
            <div class="bg-buttonDetail text-center">
                <ons-row class="area-categoryDetail Prompt" id="CategoryMovieSrc"></ons-row>
                <div class="area-btn" id="btnFavoriteSrc">

                </div>
                <div class="area-btn">
                    <button type="button" id="btnTrailerSrc" class="trailer-btn btn-lg btn-block">Watch Trailer</button>
                    <div id="showTrailerSrc"></div>
                </div>
                <div class="area-btn">
                    <button type="button" id="btnPlaySrc" class="play-btn btn-lg btn-block">PLAY</button>
                    <div id="showVideoSrc"></div>
                </div>
                <div class="title-text Prompt">
                    ${doc.data().title} ${doc.data().year}
                </div>
                <div class="review-text Prompt">
                    ${doc.data().review}
                </div>
            </div>`
        $("#showMovieDetailSrc").append(result)

        const TrailerMovie =
            /*html*/
            `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${doc.data().trailerURL}" allowfullscreen></iframe>`
        $("#showTrailerSrc").append(TrailerMovie)
        $("#showTrailerSrc").hide();

        $("#btnTrailerSrc").click(function () {
            $("#showTrailerSrc").toggle();
        })

        $("#btnPlaySrc").click(function () {
            $("#showVideoSrc").empty();
            const videoURL =
                /*html*/
                `<video id="my-video" class="video-js" controls preload="auto" autoplay data-setup="{}">
                    <source src="${doc.data().videoURL}" type="video/mp4" />
                </video>`
            $("#showVideoSrc").append(videoURL)

            var docElm = document.getElementById('my-video')
            // $("#my-video").requestFullscreen();
            docElm.requestFullscreen();
        })

        const getCategory = doc.data().category;
        for (var i = 0; i < getCategory.length; i++) {
            const Category =
                /*html*/
                `<div class="categoryDetail">${getCategory[i]}</div>`
            $("#CategoryMovieSrc").append(Category)
        }

        const ratingResult =
            /*html*/
            `<div class="rating-text Prompt">
                <ons-icon size="24px" icon="md-star"></ons-icon> ${doc.data().rating}
            </div>`
        $("#CategoryMovieSrc").append(ratingResult)

        var user = firebase.auth().currentUser;
        if (doc.data().uid.indexOf(user.uid) != -1) {
            const RevFavor =
                /*html*/
                `<button type="button" class="favorite-btn btn-lg btn-block" id="RemoveFavorite">Remove Favourite</button>`
            $("#btnFavoriteSrc").append(RevFavor)
        } else {
            const addFavor =
                /*html*/
                `<button type="button" class="favorite-btn btn-lg btn-block" id="addFavorite">Add Favourite</button>`
            $("#btnFavoriteSrc").append(addFavor)
        }
        addmovieFavoriteSrc(doc.data())

    }).catch(function (error) {
        console.log("Error getting cached document:", error);
    });
}

function addmovieFavoriteSrc(data) {
    $("#btnFavoriteSrc button").click(function () {
        var user = firebase.auth().currentUser;
        if (this.id == "addFavorite") {
            $(this).html("Remove Favorite")
            $(this).attr("id", "RemoveFavorite")
            db.collection("movies").doc(data.id).update({
                uid: firebase.firestore.FieldValue.arrayUnion(user.uid)
            }).then(function () {
                getmovieFavourite();
            });
        } else if (this.id == "RemoveFavorite") {
            $(this).html("Add Favorite")
            $(this).attr("id", "addFavorite")
            db.collection("movies").doc(data.id).update({
                uid: firebase.firestore.FieldValue.arrayRemove(user.uid)
            }).then(function () {
                getmovieFavourite();
            });
        }
    })
}

function getmovieDetailFav(Target) {
    $("#showMovieDetailFav").empty();
    db.collection("movies").doc(Target).get().then(function (doc) {
        const result =
            /*html*/
            `<div class="img-backgound-detail" style="background-image: url(${doc.data().posterURL});">
                <div class="area-margin d-flex justify-content-between">
                    <ons-back-button class="back-button"></ons-back-button>
                </div>
                <div class="area-imgDetail">
                    <img src="${doc.data().posterURL}" class="imgDetail" alt="" srcset="">
                </div>
            </div>
            <div class="bg-buttonDetail text-center" >
                <ons-row class="area-categoryDetail Prompt" id="CategoryMovieFav"></ons-row>
                <div class="area-btn" id="btnFavoriteFav">
                </div>
                <div class="area-btn">
                    <button type="button" id="btnTrailerFav" class="trailer-btn btn-lg btn-block">Watch Trailer</button>
                    <div id="showTrailerFav"></div>
                </div>
                <div class="area-btn">
                    <button type="button" id="btnPlayFav" class="play-btn btn-lg btn-block">PLAY</button>
                    <div id="showVideoFav"></div>
                </div>
                <div class="title-text Prompt">
                    ${doc.data().title} ${doc.data().year}
                </div>
                <div class="review-text Prompt">
                    ${doc.data().review}
                </div>
            </div>`
        $("#showMovieDetailFav").append(result)

        const TrailerMovie =
            /*html*/
            `<iframe width = "100%" height = "100%" src = "https://www.youtube.com/embed/${doc.data().trailerURL}" allowfullscreen></ > `
        $("#showTrailerFav").append(TrailerMovie)
        $("#showTrailerFav").hide();

        $("#btnTrailerFav").click(function () {
            $("#showTrailerFav").toggle();
        })

        $("#btnPlayFav").click(function () {
            $("#showVideoFav").empty();
            const videoURL =
                /*html*/
                `<video video id = "my-video" class="video-js" controls preload = "auto" autoplay data - setup="{}" >
                    <source src="${doc.data().videoURL}" type="video/mp4" />
                </video > `
            $("#showVideoFav").append(videoURL)

            var docElm = document.getElementById('my-video')
            // $("#my-video").requestFullscreen();
            docElm.requestFullscreen();
        })

        const getCategory = doc.data().category;
        for (var i = 0; i < getCategory.length; i++) {
            const Category =
                /*html*/
                `<div class="categoryDetail">${getCategory[i]}</div> `
            $("#CategoryMovieFav").append(Category)
        }

        const ratingResult =
            /*html*/
            `<div class="rating-text Prompt">
            <ons-icon size="24px" icon="md-star"></ons-icon> ${doc.data().rating}
            </div > `
        $("#CategoryMovieFav").append(ratingResult)

        var user = firebase.auth().currentUser;
        if (doc.data().uid.indexOf(user.uid) != -1) {
            const RevFavor =
                /*html*/
                `<button type="button" class="favorite-btn btn-lg btn-block" id ="RemoveFavorite">Remove Favourite</button> `
            $("#btnFavoriteFav").append(RevFavor)
        } else {
            const addFavor =
                /*html*/
                `<button type="button" class="favorite-btn btn-lg btn-block" id ="addFavorite">Add Favourite</button> `
            $("#btnFavoriteFav").append(addFavor)
        }
        addmovieFavoriteFav(doc.data())

    }).catch(function (error) {
        console.log("Error getting cached document:", error);
    });
}

function addmovieFavoriteFav(data) {
    $("#btnFavoriteFav button").click(function () {
        var user = firebase.auth().currentUser;
        if (this.id == "addFavorite") {
            $(this).html("Remove Favorite")
            $(this).attr("id", "RemoveFavorite")
            db.collection("movies").doc(data.id).update({
                uid: firebase.firestore.FieldValue.arrayUnion(user.uid)
            }).then(function () {
                getmovieFavourite();
            });
        } else if (this.id == "RemoveFavorite") {
            $(this).html("Add Favorite")
            $(this).attr("id", "addFavorite")
            db.collection("movies").doc(data.id).update({
                uid: firebase.firestore.FieldValue.arrayRemove(user.uid)
            }).then(function () {
                getmovieFavourite();
            });
        }
    })
}

function getmoviefromSearch() {
    const searchText = $("#searchResult").val()
    const newsearchText = searchText.replace(/ /g, "");
    $("#searchItem").empty();
    db.collection("movies").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const titlemovie = doc.data().title;
            const newtitleMovie = titlemovie.replace(/ /g, "");
            if (newtitleMovie.toLowerCase().indexOf(newsearchText.toLowerCase()) != -1) {
                const Result =
                    /*html*/
                    `<div class="col-4" style = "padding-left:0px;padding-right:0px">
                        <div id="${doc.data().id}" class="imgSrc d-flex align-items-end" style="background-image: url(${doc.data().posterURL}); " >
                            <div class="movietextbg">
                                <div class="movietitle-Src">${doc.data().title}</div>
                            </div>
                        </div>
                    </div> `
                $("#searchItem").append(Result);
            }
        });
        $(".imgSrc").click(function () {
            const movieTarget = $(this).attr('id');
            getmovieDetailSrc(movieTarget)
            document.querySelector("#Navigator_search").pushPage("views/movieDetailSrc.html");
        });
    });
}

function getmovieCategory() {
    $("ons-carousel-item button").click(function () {
        $("#searchResult").val("")
        $("#searchItem").empty();
        const targetCategory = $(this).attr('id')
        db.collection("movies").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                const category = doc.data().category
                if (category.includes(targetCategory)) {
                    const result =
                        /*html*/
                        `<div class="col-4" style = "padding-left:0px;padding-right:0px">
            <div id="${doc.data().id}" class="imgSrc d-flex align-items-end" style="background-image: url(${doc.data().posterURL}); " >
                <div class="movietextbg">
                    <div class="movietitle-Src">${doc.data().title}</div>
                </div>
            </div>
                        </ > `
                    $("#searchItem").append(result);
                }
            });
            $(".imgSrc").click(function () {
                const movieTarget = $(this).attr('id');
                getmovieDetailSrc(movieTarget)
                document.querySelector("#Navigator_search").pushPage("views/movieDetailSrc.html");
            });
        });
    })
}

function getmovieFavourite() {
    $("#noFavortie").empty();
    $("#showmovieFavorite").empty();
    var countFav = 0;

    db.collection("movies").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var user = firebase.auth().currentUser;
            const getUserFavorite = doc.data().uid
            if (getUserFavorite.indexOf(user.uid) != -1) {
                const result =
                    /*html*/
                    `<div class="col-6" style ="padding-left:0px;padding-right:0px" >
                        <div id="${doc.data().id}" class="imgFav d-flex align-items-end" style="background-image: url(${doc.data().posterURL}); " >
                            <div class="movietextbg">
                                <div class="movietitle-Fav">${doc.data().title}</div>
                            </div>
                        </div>
                    </div> `
                $("#showmovieFavorite").append(result)
                countFav++
            }
        });
        if (countFav < 1) {
            const result =
                /*html*/
                `<div class="noFav">No Favorite Movie Now</div> `
            $("#noFavortie").append(result)
        }
        $(".imgFav").click(function () {
            const movieTarget = $(this).attr('id');
            getmovieDetailFav(movieTarget);
            document.querySelector("#Navigator_favorite").pushPage("views/movieDetailFav.html");
        })
    });
}

function getprofileUser(data) {
    $("#Profile").empty();
    const profile =
        /*html*/
        `<img src="${data.photoURL}" class="imgprofile">
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
    const getUserPhoto =
        /*html*/
        `<div class="text-center" >
            <img src="${data.photoURL}" class="editImg" alt="" srcset="">
        </div>`
    $("#userPhoto").append(getUserPhoto);

    const getUserName =
        /*html*/
        `<input type = "text" class="form-control" id="username" value ="${data.displayName}" > `
    $("#userName").append(getUserName);

    $("#saveEditProfile").click(function () {
        const newUsername = document.getElementById('username').value
        var user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: newUsername
        }).then(function () {
            getprofileUser(user);
            document.querySelector('#Navigator_option').popPage();
        }).catch(function (error) {
            // An error happened.
        });
    })
}

function OptionPush() {
    document.querySelector("#ChangePassword").onclick = function () {
        document.querySelector('#Navigator_option').pushPage("views/ChangePassword.html")
    }
    document.querySelector("#editProfile").onclick = function () {
        document.querySelector('#Navigator_option').pushPage("views/editProfile.html")
    }
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
