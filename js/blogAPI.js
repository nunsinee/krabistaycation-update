const urlTenBlogs =
	"https://krabistaycation.thaifolkinnorway.com/wp-json/wp/v2/posts/?per_page=6&offset=0";

const urlMoreBlogs =
	"https://krabistaycation.thaifolkinnorway.com/wp-json/wp/v2/posts/?per_page=6&offset=6";

const urlAuthor =
	"https://krabistaycation.thaifolkinnorway.com/wp-json/wp/v2/users/1";

const showPostItems = document.querySelector(".postItems-container");
const showPostItems2 = document.querySelector(".postItems-container-more");

const loading = document.querySelector("#load");

loading.classList.add("loader");

// Fetch Api
setTimeout(() => {
	async function getPostItems() {
		try {
			// get first 6 blogs
			const responseTenBlogs = await fetch(urlTenBlogs);
			const getTenBlogs = await responseTenBlogs.json();
			console.log(getTenBlogs);

			// get More 6 blogs
			const responseMoreBlogs = await fetch(urlMoreBlogs);
			const getMoreBlogs = await responseMoreBlogs.json();
			console.log(getMoreBlogs);

			//get Author
			const responseAuthor = await fetch(urlAuthor);
			const getAuthor = await responseAuthor.json();

			//slide-content
			showPostItems.innerHTML = "";
			showPostItems2.innerHTML = "";
			createPostItems(getTenBlogs, getAuthor);
			//createPostItemsMore(getMoreBlogs, getAuthor);

			const viewMore = document.querySelector("#viewMore");
			const viewLess = document.querySelector("#viewLess");

			viewMore.addEventListener("click", () => {
				//createPostItemsMore(getMoreBlogs, getAuthor);
				// showPostItems2.style.display = "block";
				createPostItemsMore(getMoreBlogs, getAuthor);
				viewMore.style.display = "none";
				viewLess.style.display = "block";
			});

			viewLess.addEventListener("click", () => {
				showPostItems2.innerHTML = "";
				viewMore.style.display = "block";
				viewLess.style.display = "none";
			});
		} catch (error) {
			console.log("An error occurred");
			showPostItems.innerHTML += `<div class="api-error"><h1>An error occurred when calling the API</h1></div>`;
		}
	}
	getPostItems();

	function createPostItems(getTenBlogs, authorName) {
		for (let i = 0; i < getTenBlogs.length; i++) {
			showPostItems.innerHTML += `
		<div class="post-item">
		<div class="p-pic"><img id="smallImg" src="${getTenBlogs[i].fimg_url}" alt="${getTenBlogs[i].title.rendered}"></div>
		<div class="p-name">${getTenBlogs[i].title.rendered}</div>
		<div class="p-by"><span>By ${authorName.name}-${getTenBlogs[i].formatted_date}</span></div>
		<div class="p-view"><a href="blog_detail.html?id=${getTenBlogs[i].id}">Read</a></div>`;
		}
	}

	function createPostItemsMore(getMoreBlogs, authorName) {
		for (let i = 0; i < getMoreBlogs.length; i++) {
			showPostItems2.innerHTML += `
		<div class="post-item">
		<div class="p-pic"><img id="smallImg" src="${getMoreBlogs[i].fimg_url}" alt="${getMoreBlogs[i].title.rendered}"}"></div>
		<div class="p-name">${getMoreBlogs[i].title.rendered}</div>
		<div class="p-by"><span>By ${authorName.name}-${getMoreBlogs[i].formatted_date}</span></div>
		<div class="p-view"><a href="blog_detail.html?id=${getMoreBlogs[i].id}">Read</a></div>`;
		}
	}

	loading.classList.remove("loader");
}, 3000);
