function openLightbox(src) {
    var modal = document.getElementById("lightboxModal");
    var modalImg = document.getElementById("lightboxImg");
    modal.style.display = "block";
    modalImg.src = src;
}

function closeLightbox() {
    var modal = document.getElementById("lightboxModal");
    modal.style.display = "none";
}
