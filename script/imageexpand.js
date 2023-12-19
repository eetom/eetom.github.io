$(document).ready(function () {
    var modal = document.getElementById("popup1");
    var images = document.getElementsByClassName("myImg");
    var modalImg = document.getElementById("img01");
    var span = document.getElementsByClassName("popupClose")[0];

    for (var i = 0; i < images.length; i++) {
        var img = images[i];
        img.onclick = function (evt) {
            console.log(evt);
            modal.style.visibility = "visible";
            modalImg.src = this.src;
        };
    }

    span.onclick = function () {
        modal.style.visibility = "hidden";
    };

    $(".popupHolder").click(function () {
        modal.style.visibility = "hidden";
    });

    $(".popupCnt").click(function (event) {
        event.stopPropagation();
        modal.style.visibility = "hidden";
    });
    // Your code in here.
}); 
