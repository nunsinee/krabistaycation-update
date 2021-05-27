const mainMenu = document.querySelector(".mainMenu");
const closeMenu = document.querySelector(".closeMenu");
const openMenu = document.querySelector(".openMenu");

openMenu.addEventListener("click", () => {
	mainMenu.classList.toggle("show");
});

closeMenu.addEventListener("click", () => {
	mainMenu.classList.toggle("show");
	mainMenu.style.top = "-100%";
});
