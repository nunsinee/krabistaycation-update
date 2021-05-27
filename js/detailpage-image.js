const openModalImg = document.querySelector(".image");
const modalImg = document.querySelector(".modalImg");

const urlImg =
	"https://krabistaycation.thaifolkinnorway.com/wp-json/wp/v2/media?parent=" +
	id;

async function getImages() {
	try {
		const responseImg = await fetch(urlImg);
		const dataImg = await responseImg.json();

		modalImg.innerHTML = "";
		openModalImg.innerHTML = "";

		displayImages(dataImg);
	} catch (error) {
		console.error(error);
	}
}
getImages();

function displayImages(dataImg) {
	openModalImg.innerHTML = `<img src="${dataImg[0].source_url}" alt="${dataImg[0].alt_text}">`;
	modalImg.innerHTML = `<img src="${dataImg[0].source_url}">`;
}
