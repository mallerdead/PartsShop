sliderBtns = document.querySelectorAll(".slider-btn");
sliderPages = document.querySelectorAll(".slider-page");
btnsUnderline = document.querySelector(".btns-underline");

sliderBtns.forEach((sliderBtn) => {
  if (sliderBtn.classList.contains("active")) {
    btnsUnderline.style.left = `${sliderBtn.offsetLeft}px`;
    btnsUnderline.style.width = `${sliderBtn.offsetWidth}px`;
  }
});

for (let i = 0; i < sliderBtns.length; i++) {
  sliderBtns[i].addEventListener("click", () => {
    for (let j = 0; j < sliderBtns.length; j++) {
      sliderBtns[j].classList.remove("active");
      sliderPages[j].classList.remove("active");
    }
    sliderBtns[i].classList.add("active");
    btnsUnderline.style.left = `${sliderBtns[i].offsetLeft}px`;
    btnsUnderline.style.width = `${sliderBtns[i].offsetWidth}px`;
    sliderPages[i].classList.add("active");
  });
}
