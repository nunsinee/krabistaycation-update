// const video = document.querySelector("#video");
// window.addEventListener("load", () => {
//     video.muted = true;
//     video.play();
// });

var mobilevideo = document.getElementsByTagName("video")[0];
mobilevideo.setAttribute("playsinline", "");
mobilevideo.setAttribute("muted", "");