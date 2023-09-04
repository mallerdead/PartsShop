let partsInCart = Array.from(document.querySelectorAll(".cart-item"));
const cartTotal = document.querySelector(".cart-btn");
const cartBlock = document.querySelector(".cart-items");

function RerenderTotal(part) {
  let totalPriceBlock = document.querySelector(".cart-total");
  if (partsInCart.length > 0) {
    let price = 999;
    let partPriceBlock = part.querySelector(".price-item");

    partPriceBlock.innerHTML = `$ ${
      price * part.querySelector(".count").innerHTML
    }`;
    let totalCount = partsInCart
      .map((item) => +item.querySelector(".count").innerHTML)
      .reduce((accumulator, currValue) => accumulator + currValue);
    let totalPrice = partsInCart
      .map((item) => +item.querySelector(".price-item").innerHTML.slice(2))
      .reduce((accumulator, currValue) => accumulator + currValue);
    totalPriceBlock.innerHTML = `<div class="cart-total">
    ${totalCount} items for <div class="total-price">$ ${totalPrice}</div>
</div>`;
    cartTotal.innerHTML = `${totalCount} items for $ ${totalPrice}`;
  } else {
    totalPriceBlock.innerHTML = `<div class="cart-total">
    0 items for <div class="total-price">$ 0</div>
</div>`;
    cartTotal.innerHTML = `Empty`;
    cartBlock.innerHTML = `
        <div class="empty-cart">
            <div class="empty-cart-title">Your cart is empty</div>
            <img src="../assets/shoppingCart.svg" alt="">
        </div>`;
  }
}

function removePart(part) {
  part.querySelector(".delete-item").addEventListener("click", () => {
    cartBlock.removeChild(part);
    partsInCart = partsInCart.filter((partInCart) => partInCart != part);
    RerenderTotal(part);
  });
}

function addCountPart(part) {
  let price = 999;
  let countPart = part.querySelector(".count-item");
  countPart.children[2].addEventListener("click", () => {
    countPart.children[1].textContent = +countPart.children[1].textContent + 1;
    RerenderTotal(part);
  });
}

function decreaseCountPart(part) {
  let price = 999;
  let countPart = part.querySelector(".count-item");
  countPart.children[0].addEventListener("click", () => {
    if (+countPart.children[1].textContent > 1) {
      countPart.children[1].textContent =
        +countPart.children[1].textContent - 1;
      RerenderTotal(part);
    }
  });
}
if (partsInCart.length > 0) {
  partsInCart.forEach((part) => {
    removePart(part);
    addCountPart(part);
    decreaseCountPart(part);
    RerenderTotal(part);
  });
} else {
  cartBlock.innerHTML = `
    <div class="empty-cart">
        <div class="empty-cart-title">Your cart is empty</div>
        <img src="../assets/shoppingCart.svg" alt="">
    </div>`;
}
