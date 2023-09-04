const burgerBtn = document.querySelector(".burger-menu-wrapper");
const burgerAnimation = document.querySelector(".burger-menu");
const menu = document.querySelector(".menu");

burgerBtn.addEventListener("click", () => {
  burgerBtn.classList.toggle("active");
  burgerAnimation.classList.toggle("active");
  menu.classList.toggle("active");
});
