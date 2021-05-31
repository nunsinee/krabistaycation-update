/////////////////////////// QUERY STRING PAGE ID/////////////////////////////////////////

//Get the id from the query string
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

//if the id is null, redirect to the homepage
if (id === null) {
	location.href = "/";
}

///////////////////////////  PREVIEW - MODAL IMAGE /////////////////////////////////////////

const mainPhoto = document.querySelector("#hero-photo");
const titlePost = document.querySelector(".post-title");
const contentBlog = document.querySelector(".content-box");

// Change page title to one of the property
const titlePage = document.querySelector("title");

//preview image -Modal image
const images = document.querySelector(".image"); // create images in content-box
const expandIcon = document.querySelector(".expand-icon");

const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modalContent");
const modalText = document.querySelector(".modalIext");
const closeBtn = document.querySelector(".close");
const excepert = document.querySelector(".excerpt");

const urlID =
	"https://infokrabi.thaifolkinnorway.com/wp-json/wp/v2/posts/" + id;

images.addEventListener("click", (e) => {
	e.preventDefault();
	modal.classList.add("appear");
});

expandIcon.addEventListener("click", (e) => {
	e.preventDefault();
	modal.classList.add("appear");
});

closeBtn.addEventListener("click", () => {
	modal.classList.remove("appear");
});

///end click event///

async function getPosts() {
	const response = await fetch(urlID);
	const data = await response.json();

	return data;
}

document.addEventListener("DOMContentLoaded", async () => {
	let data = [];

	try {
		data = await getPosts();
		displayContent(data);
	} catch (error) {
				//do something later
	}

});

function displayContent(data)
{
	contentBlog.innerHTML = `<section class="text-box">${data.content.rendered}</section>`;
	excepert.innerHTML = `${data.excerpt.rendered}`;
	titlePost.innerHTML = `<h2>${data.title.rendered}</h2><h4>By Krabifolk - ${data.formatted_date}</h4>`;
	titlePage.innerHTML = `${data.title.rendered}`; //title pages
	excepert.innerHTML = `${data.excerpt.rendered}`;
	mainPhoto.innerHTML = `<div class="hero-img" style="background-image: url(${data.fimg_url}" alt="${data.title.rendered}"><h1>Escape to Krabi,Thailand with Krabifolk</h1></div>`;
}
