const partsBlock = document.querySelector(".parts");
const manufacturesBlock = document.querySelector(".all-manufactures");

fetch("http://127.0.0.1:3000/get-parts")
  .then((response) => response.json())
  .then((data) => {
    partsBlock.innerHTML = `
    <div class="parts-header">
      <div class="part-info">
        <div class="manufacturer-column">MANUFACTURER</div>
        <div class="number-column">NUMBER</div>
        <div class="description-column">DESCRIPTION</div>
        <div class="availability-column">AVAILABILITY</div>
        <div class="delivery-column">DELIVERY</div>
        <div class="price-column">PRICE</div>
      </div>
    </div>`;
    manufacturesBlock.innerHTML = ``;
    for (let part of data) {
      manufacturesBlock.innerHTML += `
      <div class="manufacture" id="${part.manufacture_id}">
        <div class="manufacture-wrapper">
          <div class="name-manufacture">${part.manufacture_name}</div>
        </div>
      </div>`;

      partsBlock.innerHTML += `
      <div class="part" id="${part.part_id}">
      <div class="part-info">
        <div class="manufacturer-part">${part.manufacture_name}</div>
        <div class="number-part">${part.part_vendor_code}</div>
        <div class="description-part">${part.part_description}</div>
        <div class="availability-part">${part.part_availability}</div>
        <div class="delivery-part">${part.part_delivery} Days</div>
        <div class="price-part">$ ${part.part_price}</div>
      </div>
      <div class="btns-parts-wrapper">
        <button class="add-to-cart"></button>
        <a class="more-info-to-part" href="detailOfProduct.html"></a>
      </div>
    </div>`;
    }
  })
  .then(() => {
    const manufacturesBtn = document.querySelectorAll(".manufacture");
    manufacturesBtn.forEach((btn) =>
      btn.addEventListener("click", () => {
        btn.classList.toggle("active");
      })
    );
    const addToCartBtns = document.querySelectorAll(".add-to-cart");
    addToCartBtns.forEach((addToCartBtn) => {
      addToCartBtn.addEventListener("click", () => {
        console.log(addToCartBtn.parentNode.parentNode.id);
      });
    });
  });
