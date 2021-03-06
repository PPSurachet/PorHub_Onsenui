$(function () {
    document.addEventListener("init", function (event) {
        var page = event.target;
        if (page.id == "Option") {
            document.querySelector("#my-switch").addEventListener('change', function () {
                $('.list-item').toggleClass('list-item-darkmode');
                $('.page__background , .body').toggleClass('page__background-darkmode');
                $('.switch__toggle').toggleClass('switch__toggle-darkmode');
                $('svg').toggleClass('svg-darkmode');
                $('.Profile').toggleClass('Profile-darkmode')
                $('.searchbar').toggleClass('searchbar-darkmode')
                $('.titleMovie').toggleClass('titleMovie-darkmode')
                $('.btn-category').toggleClass('btn-category-darkmode')
                $('.toolbar').toggleClass('toolbar-darkmode')
                $('.toolbars').toggleClass('toolbars-darkmode')
                $('.circleColor').toggleClass('circleColor-darkmode')
                $('.bgHub').toggleClass('bgHub-darkmode')
            });
        } else if (page.id == "editProfile" || page.id == "changePass" || page.id == "movieDetail" || page.id == "movieDetailSrc" || page.id == "movieDetailFav") {
            if (document.querySelector("#my-switch").checked) {
                $('#changePass .page__background').css("background-color", "#2F2F2F");
                $('#editProfile .page__background').css("background-color", "#2F2F2F");
                $('#movieDetail .page__background').css("background-color", "#2F2F2F");
                $('#movieDetailSrc .page__background').css("background-color", "#2F2F2F");
                $('#movieDetailFav .page__background').css("background-color", "#2F2F2F");
                $('.titleOP', 'body').css("color", "white");
                $('svg').css("fill", "white");
                $('.svg-option').css("fill", "white")
                $('.btn-lightmode').css("background-color", "#FA043F");
                $('.btn-editProfile').css("background-color", "#FA043F");
                $('.title-username , .icon-pencil').css("color", "white");
                $('.backColor').css("color", "white")
            }
        }

    }, false);
})