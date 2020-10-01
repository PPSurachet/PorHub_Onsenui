$(function () {
    document.addEventListener("init", function (event) {
        var page = event.target;
        if (page.id == "Option") {
            document.getElementById("my-switch").addEventListener('change', function () {
                $('.list-item').toggleClass('list-item-darkmode');
                $('.page__background , .body').toggleClass('page__background-darkmode');
                $('.switch__toggle').toggleClass('switch__toggle-darkmode');
            });
        }
    }, false);
})