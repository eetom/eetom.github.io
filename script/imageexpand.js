$(document).ready(function () {
    var images = Array.from(document.getElementsByClassName("myImg"));
    var currentIndex = 0;

    // Inject nav buttons into the existing hardcoded modal
    if ($('#popup1').length && !$('#popup-prev').length) {
        $('#popup1').append(
            '<button class="popup-nav popup-prev" id="popup-prev"><i class="material-icons">chevron_left</i></button>' +
            '<button class="popup-nav popup-next" id="popup-next"><i class="material-icons">chevron_right</i></button>'
        );
    }

    function showImage(index) {
        currentIndex = index;
        var modal = document.getElementById("popup1");
        var modalImg = document.getElementById("img01");
        if (modal && modalImg) {
            modalImg.src = images[index].src;
            modal.style.visibility = "visible";
        }
    }

    function hideModal() {
        var modal = document.getElementById("popup1");
        if (modal) modal.style.visibility = "hidden";
    }

    images.forEach(function (img, i) {
        img.onclick = function () {
            showImage(i);
        };
    });

    $(document).on("click", "#popup-prev", function (e) {
        e.stopPropagation();
        showImage((currentIndex - 1 + images.length) % images.length);
    });

    $(document).on("click", "#popup-next", function (e) {
        e.stopPropagation();
        showImage((currentIndex + 1) % images.length);
    });

    $(document).on("click", ".popupHolder", function () {
        hideModal();
    });

    $(document).on("click", ".popupCnt", function (e) {
        e.stopPropagation();
    });

    $(document).keydown(function (e) {
        var modal = document.getElementById("popup1");
        if (modal && modal.style.visibility === "visible") {
            if (e.key === "ArrowLeft") {
                showImage((currentIndex - 1 + images.length) % images.length);
            } else if (e.key === "ArrowRight") {
                showImage((currentIndex + 1) % images.length);
            } else if (e.key === "Escape") {
                hideModal();
            }
        }
    });
});
