const cartBtn = document.querySelector(".cart-btn");

function renderCart(cart) {
  cartBtn.innerHTML = `${cart.countItems} items for $ ${cart.totalSum}`;
}

function renderCartPage(cart) {
  console.log(cart); // TODO: create cart page
}
