const video = document.querySelector("#video");
window.addEventListener("load", () => {
    video.muted = true;
    video.play();
});