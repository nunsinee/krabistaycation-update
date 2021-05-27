const form = document.querySelector("#contactForm");
const contactName = document.querySelector("#contactName");
const subject = document.querySelector("#subject");
const email = document.querySelector("#email");
const textArea = document.querySelector("#textArea");
const message = document.querySelector("#message");
const submit = document.querySelector("button");

//if all the input  pass validation
contactName.addEventListener("input", () => {
	if (checkLength(contactName.value, 4) === true) {
		contactNameError.style.display = "none";
	} else {
		contactNameError.style.display = "block";
	}
});

email.addEventListener("input", () => {
	if (validateEmail(email.value) === true) {
		emailError.style.display = "none";
	} else {
		emailError.style.display = "block";
	}
});

subject.addEventListener("input", () => {
	if (checkLength(subject.value, 14) === true) {
		subjectError.style.display = "none";
	} else {
		subjectError.style.display = "block";
	}
});

textArea.addEventListener("input", () => {
	if (checkLength(textArea.value, 24) === true) {
		textAreaError.style.display = "none";
	} else {
		textAreaError.style.display = "block";
	}
});

/////addEventlistener

form.addEventListener("submit", () => {
	submitForm();
	form.reset();
});

////end///

//2.function to run when the form is submitted
function submitForm() {
	//event.preventDefault();

	if (
		checkLength(contactName.value, 4) &&
		checkLength(subject.value, 14) &&
		validateEmail(email.value) &&
		checkLength(textArea.value, 24)
	) {
		//display the message when the form has been submitted

		message.innerHTML = `<div class="message"> Thank you for your message !<br>I will reply you as soon as possible.</div>`;
		formSubmissionHandler();
		form.reset();
	} else {
		message.innerHTML = "";
	}
}

//3.function to check if the length of the input value is valid
function checkLength(value, len) {
	if (value.trim().length > len) {
		return true;
	} else {
		return false;
	}
}

//4.function to check if email is valid
function validateEmail(email) {
	const regEX = /\S+@\S+\.\S+/;
	const patternMatches = regEX.test(email);
	return patternMatches;
}

//Send data from Contact form to Wordpress
const formSubmissionHandler = (event) => {
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
