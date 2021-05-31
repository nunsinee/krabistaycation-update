//Submit comment connect with contactForm7 id 517
//Send data from Contact form to Wordpress

const isValidEmail = (email) => {
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

const isValidPhone = (phone) => {
	const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
	return re.test(String(phone).toLowerCase());
};

//check length of subject, message and name

function checkLength(value, len) {
	if (value.trim().length > len) {
		return true;
	} else {
		return false;
	}
}

const nameInput = document.querySelector('input[name="your-name"]');
const emailInput = document.querySelector('input[name="your-email"]');
const messageInput = document.querySelector('textarea[name="comment"]');
const feedback = document.querySelector(".thank-you");
const form = document.querySelector("#commentForm");

let isFormValid = false;
let isValidationOn = false;

const inputs = [nameInput, emailInput, messageInput];

const resetElm = (elm) => {
	elm.classList.remove("invalid)");
	elm.nextElementSibling.classList.add("hidden");
};

const invalidateElm = (elm) => {
	elm.classList.add("invalid)");
	elm.nextElementSibling.classList.remove("hidden");
};

const validateInputs = () => {
	if (!isValidationOn) return;

	isFormValid = true;
	resetElm(nameInput);
	resetElm(emailInput);
	resetElm(messageInput);

	if (!checkLength(nameInput.value, 2)) {
		isFormValid = false;
		invalidateElm(nameInput);
	}

	if (!isValidEmail(emailInput.value)) {
		isFormValid = false;
		invalidateElm(emailInput);
	}

	if (!checkLength(messageInput.value, 9)) {
		isFormValid = false;
		invalidateElm(messageInput);
	}
};

form.addEventListener("submit", (e) => {
	e.preventDefault();
	isValidationOn = true;
	validateInputs();

	if (isFormValid) {
		form.remove();
		feedback.classList.remove("hidden");
		formSubmissionComment();
	}
});

inputs.forEach((input) => {
	input.addEventListener("input", () => {
		validateInputs();
	});
});

//sedding data by post medthod

const formSubmissionComment = (event) => {
	event.preventDefault();

	const form = event.target,
		{ action, method } = form,
		body = new FormData(form);

	fetch(action, {
		method,
		body,
	})
		.then((response) => response.json())
		.catch((error) => {
			console.log(error);
		});
};

//	"https://krabistaycation.thaifolkinnorway.com/wp-json/wp/v2/comments";

//https://krabistaycation.thaifolkinnorway.com/wp-comments-post.php
