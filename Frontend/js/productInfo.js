const params = new URLSearchParams(window.location.search);
const partId = params.get("partId");
const content = document.querySelector(".content");

function renderPart(part) {
  content.innerHTML = `
  <div class="title-page">${part.name}</div>
  <img class="part-preview" src="../assets/boshFilter.svg" alt="">
  <div class="subtitle-part">${part.partSubDescription}</div>
  <div class="slider">
    <div class="slider-nav">
      <button class="slider-btn active">Description</button>
      <button class="slider-btn">Additional Information</button>
    </div>
    <div class="slider-pages">
      <div class="slider-wrapper">
        <div class="slider-page">
          ${part.description}
        </div>
        <div class="slider-page">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Neque magnam animi velit deleniti impedit a.
        </div>
      </div>
    </div>
  </div>
  <div class="add-to-cart-wrapper">
    <button id="${part.id}" class="add-to-cart-btn">
      <img src="../assets/cartWhite.svg" alt="">ADD TO CART
    </button>
    <div class="price-part">$ ${part.price}</div>
  </div>`;
  addSlideBtnListeners();
  const addToCartBtn = document.querySelector(".add-to-cart-btn");

  addToCartBtn.addEventListener("click", () => {
    addToCart(addToCart.id);
  });
}

getPartById(partId).then(renderPart);
