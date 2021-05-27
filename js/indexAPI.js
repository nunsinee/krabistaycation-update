// Display HTML Word press API

//use image from this api
const urlContent =
	"https://krabistaycation.thaifolkinnorway.com/wp-json/wc/v3/posts/";

//use link from this api
const urlLink =
	"https://krabistaycation.thaifolkinnorway.com/wp-json/wp/v2/posts/";

const urlAuthor =
	"https://krabistaycation.thaifolkinnorway.com/wp-json/wp/v2/users/1";

const showCard = document.querySelector(".slider");
const showBlogItems = document.querySelector(".postlist-container");
const loading = document.querySelector("#load");

loading.classList.add("loader");

// Fetch Api

setTimeout(() => {
	async function getSlideShow() {
		try {
			// get Content for slide
			const responseContent = await fetch(urlContent);
			const getContent = await responseContent.json();

			//get link from WP/V2
			const responseLink = await fetch(urlLink);
			const getLink = await responseLink.json();

			//get Author
			const responseAuthor = await fetch(urlAuthor);
			const getAuthor = await responseAuthor.json();

			//slide-content
			showCard.innerHTML = "";
			showBlogItems.innerHTML = "";

			createSlideShowCard(getContent, getLink, getAuthor);
			createBlogFourItems(getContent, getLink, getAuthor);
		} catch (error) {
			console.log("An error occurred");
			showCard.innerHTML = `<div class="api-error"><h1>An error occurred when calling the API</h1></div>`;
			showBlogItems.innerHTML = `<div class="api-error">"An error occurred when calling the API"</div>`;
		}
	}
	getSlideShow();

	function createSlideShowCard(posts, links, authorName) {
		for (let i = 0; i < posts.length; i++) {
			if (i === 4) {
				break;
			}

			showCard.innerHTML += `<section><div class="slide-img"><img src="${posts[i].featured_image.large}" alt="aonang sunset"></div>
		<div class="slide-detail"><h2>${links[i].title.rendered}</h2></div>
		<div class="slide-postdate"><span><p>By ${authorName.name}-${links[i].formatted_date}</p></span></div>
		<div class="read-more"><a href="blog_detail.html?id=${links[i].id}">Read more..</a></div></section>`;
		}
	}

	function createBlogFourItems(posts, links, authorName) {
		for (let i = 4; i < posts.length; i++) {
			if (i === 8) {
				break;
			}
			showBlogItems.innerHTML += `<div class="post-item">
		<div class="p-pic"><img src="${posts[i].featured_image.full}" alt="${links[i].title.rendered}"></div>
		<div class="p-name"><h3>${links[i].title.rendered}</h3></div>
		<div class="p-by"><span>By ${authorName.name}-${links[i].formatted_date}</span></div>
		<div class="p-view"><a href="blog_detail.html?id=${links[i].id}">Read</a></div>
		</div>`;
		}
	}
	loading.classList.remove("loader");
}, 2000);
