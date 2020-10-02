$(function () {
    document.addEventListener("init", function (event) {
        var page = event.target;
        if (page.id == "Option") {
            document.querySelector("#my-switch").addEventListener('change', function () {
                $('.list-item').toggleClass('list-item-darkmode');
                $('.page__background , .body').toggleClass('page__background-darkmode');
                $('.switch__toggle').toggleClass('switch__toggle-darkmode');
                $('svg').toggleClass('svg-darkmode');
            });
        } else if (page.id == "changePass") {
            if (document.querySelector("#my-switch").checked) {
                $('#changePass .page__background').css("background-color", "#2F2F2F");
                $('.titleOP').css("color", "white");
                $('svg').css("fill", "white");
                $('.btn-ligtmode').css("background-color", "#FA043F");
            }
        }

    }, false);
})