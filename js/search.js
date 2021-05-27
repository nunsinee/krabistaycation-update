const search = document.querySelector("#search");
const showSearchResult = document.querySelector("#match-list");

const searchPosts = async (searchText) => {
	const res = await fetch(
		"https://krabistaycation.thaifolkinnorway.com/wp-json/wp/v2/posts/"
	);
	const posts = await res.json();
	// Get match to current text input
	let matches = posts.filter((post) => {
		const regex = new RegExp(`^${searchText}`, "gi");
		return (
			post.title.rendered.match(regex) ||
			post.slug.match(regex) ||
			post.better_featured_image.alt_text.match(regex) ||
			post.better_featured_image.caption.match(regex)
		);
	});

	if (searchText.length === 0) {
		matches = [];
		showSearchResult.innerHTML = "";
	}
	outputHTML(matches);
};

// Show result in HTML
const outputHTML = (matches) => {
	if (matches.length > 0) {
		const html = matches
			.map(
				(match) => `
				<div class="post-item-results">
				<div class="p-pic-s"><img src="${match.images.medium}" alt="${match.title.rendered}"}></div>
				<div class="p-name-s">${match.title.rendered}</div>
				<div class="p-by-s"><span>By Nunsinee-${match.formatted_date}</span></div>
				<div class="p-view-s"><a href="blog_detail.html?id=${match.id}">Read</a></div>
				</div>`
			)
			.join("");
		console.log(html);
		showSearchResult.innerHTML = html;
	}
};

//Search text and filter
search.addEventListener("input", () => searchPosts(search.value));
