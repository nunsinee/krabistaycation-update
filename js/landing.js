const slideShowImage = document.querySelectorAll(".showcase .slideshow-img");
const nextImageDelay = 2000;
let currentImageCount = 0;

//slideShowImage[currentImageCount].style.display = "block";
slideShowImage[currentImageCount].style.opacity = 1;

setInterval(nextImage, nextImageDelay);

function nextImage() {
    slideShowImage[currentImageCount].style.zIndex = -2;
    const tempCount = currentImageCount;
    setTimeout(() => {
        slideShowImage[tempCount].style.opacity = 0;
    }, 1000);

    currentImageCount = (currentImageCount + 1) % slideShowImage.length;
    slideShowImage[currentImageCount].style.opacity = 1;
    slideShowImage[currentImageCount].style.zIndex = -1;
}