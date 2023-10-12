window.addEventListener("resize", () => {
  sliderWrapper.style.left = `-${
    currentSlide * sliderPage.getBoundingClientRect().width
  }px`;
});

function addSlideBtnListeners() {
  const sliderControl = document.querySelectorAll(".slider-btn");
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const sliderPage = document.querySelector(".slider-page");
  let currentSlide;

  sliderControl.forEach((element) => {
    element.addEventListener("click", () => {
      sliderControl.forEach((elem) => {
        elem.classList.remove("active");
      });
      for (let i = 0; i < sliderControl.length; i++) {
        if (element == sliderControl[i]) {
          currentSlide = i;
          element.classList.add("active");
          sliderWrapper.style.left = `-${
            i * sliderPage.getBoundingClientRect().width
          }px`;
          break;
        }
      }
    });
  });
}
