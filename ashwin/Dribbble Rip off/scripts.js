
// Hides the secondary navs under mobile view when main nav is expanded and 
// makes the secondary nav visible again when the main nav is collapsed

$("#toggle").click(function (e) {
    if ($(".secondary-nav").hasClass("down") &&
        $(".secondary-nav-mobile").hasClass("down") &&
        $(".not-following").hasClass("down") &&
        $(".cards-container").hasClass("down") &&
        $(".card").hasClass("down") &&
        $(".secondary-logo").hasClass("down")) {

        $(".secondary-nav").addClass("up");
        $(".secondary-nav").removeClass("down");

        $(".secondary-nav-mobile").addClass("up");
        $(".secondary-nav-mobile").removeClass("down");

        $(".not-following").addClass("up");
        $(".not-following").removeClass("down");
        $(".cards-container").addClass("up");
        $(".cards-container").removeClass("down");

        $(".card").addClass("up");
        $(".card").removeClass("down");

        $(".secondary-logo").addClass("up");
        $(".secondary-logo").removeClass("down");

    } else {
        $(".secondary-nav").addClass("down");
        $(".secondary-nav").removeClass("up");

        $(".secondary-nav-mobile").addClass("down");
        $(".secondary-nav-mobile").removeClass("up");

        $(".not-following").addClass("down");
        $(".not-following").removeClass("up");

        $(".cards-container").addClass("down");
        $(".cards-container").removeClass("up");

        $(".card").addClass("down");
        $(".card").removeClass("up");

        $(".secondary-logo").addClass("down");
        $(".secondary-logo").removeClass("up");

    }
});