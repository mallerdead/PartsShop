const cartItemBlock = document.querySelector(".cart-items");
const cartTotalBlock = document.querySelector(".cart-total");

function renderCartPage(cart) {
  cartItemBlock.innerHTML = ``;

  if (cart.products.length > 0) {
    cart.products.forEach((product) => {
      let part = product.part;

      cartItemBlock.innerHTML += `
          <div class="cart-item" id="${part.id}">
            <div class="name-item">${part.name}</div>
            <div class="description-item">${part.description}</div>
            <div class="vendor-code-item">${part.vendorCode}</div>
            <div class="count-item">
              <button class="remove-count">-</button>
              <div class="count">${product.count}</div>
              <button class="add-count">+</button>
            </div>
            <div class="price-item">$ ${part.price}</div>
            <button class="delete-item"></button>
          </div>`;
    });

    cartItems = document.querySelectorAll(".cart-item");

    cartItems.forEach((item) => {
      let removeBtn = item.querySelector(".delete-item");
      let addCountBtn = item.querySelector(".add-count");
      let decCountBtn = item.querySelector(".remove-count");

      removeBtn.addEventListener("click", () => {
        removePartFromCart(item);
      });
      addCountBtn.addEventListener("click", () => {
        addCountPart(item);
      });
      decCountBtn.addEventListener("click", () => {
        decreaseCountPart(item);
      });
    });
  } else {
    cartItemBlock.innerHTML = `
    <div class="empty-cart">
    <div class="empty-cart-title">
      Your cart is empty
    </div>
    <img src="../assets/shoppingCart.svg">
    </div>`;
  }

  renderCartTotal(cart);
}

function renderCartTotal(cart) {
  if (cart.products.length) {
    cartTotalBlock.innerHTML = `${cart.count} items <div class="total-price">$ ${cart.totalPrice}</div>`;
  } else {
    cartTotalBlock.innerHTML = `Your cart is empty`;
  }
}

function removePartFromCart(item) {
  verifyToken()
    .then(getUser)
    .then((user) => {
      return removePart(+item.id, user.cart.id);
    })
    .then((cart) => {
      renderCart(cart);
      renderCartPage(cart);
      renderCartTotal(cart);
    });
}

function addCountPart(item) {
  let countPart = item.querySelector(".count-item");
  countPart.children[1].textContent = +countPart.children[1].textContent + 1;

  verifyToken()
    .then(getUser)
    .then((user) => {
      return changeCartProductCount(
        +item.id,
        user.cart.id,
        +countPart.children[1].textContent
      );
    })
    .then((cart) => {
      renderCart(cart);
      renderCartTotal(cart);
    });
}

function decreaseCountPart(item) {
  let countPart = item.querySelector(".count-item");

  if (+countPart.children[1].textContent > 1) {
    countPart.children[1].textContent = +countPart.children[1].textContent - 1;
    verifyToken()
      .then(getUser)
      .then((user) => {
        return changeCartProductCount(
          +item.id,
          user.cart.id,
          +countPart.children[1].textContent
        );
      })
      .then((cart) => {
        renderCart(cart);
        renderCartTotal(cart);
      });
  }
}

verifyToken()
  .then(getUser)
  .then((user) => renderCartPage(user.cart));
