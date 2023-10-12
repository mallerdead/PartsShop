const cartBtn = document.querySelector(".cart-btn");
let cartItems;

function renderCart(products) {
  if (products) {
    let count = products.reduce((accum, cur) => accum + cur.count, 0);
    let totalSum = products.reduce(
      (accum, cur) => accum + cur.part.price * cur.count,
      0
    );
    cartBtn.innerHTML = `${count} items for $ ${totalSum}`;
  } else {
    cartBtn.innerHTML = `Empty`;
  }

  if (window.location.href.includes("cartPage.html")) {
    if (products) {
      renderCartPage(products);
    } else {
      cartBlock.innerHTML = `
        <div class="empty-cart">
            <div class="empty-cart-title">Your cart is empty</div>
            <img src="../assets/shoppingCart.svg" alt="">
        </div>`;
    }
  }
}

function renderCartPage(products) {
  const cartItemsBlock = document.querySelector(".cart-items");
  cartItemsBlock.innerHTML = "";

  products.forEach((product) => {
    let part = product.part;
    cartItemsBlock.innerHTML += `
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
      removePart(item);
    });
    addCountBtn.addEventListener("click", () => {
      addCountPart(item);
    });
    decCountBtn.addEventListener("click", () => {
      decreaseCountPart(item);
    });
  });
}

function removePart(item) {
  verifyToken()
    .then((id) =>
      fetch(
        `https://localhost:7164/cart/remove-part?userId=${id}&productId=${item.id}`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
        }
      )
    )
    .then(() => item.remove());
}

function addCountPart(item) {
  let countPart = item.querySelector(".count-item");
  countPart.children[1].textContent = +countPart.children[1].textContent + 1;

  verifyToken().then((id) =>
    fetch(
      `https://localhost:7164/cart/change-count?userId=${id}&newCount=${countPart.children[1].textContent}&productId=${item.id}`,
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
      }
    )
  );
}

function decreaseCountPart(item) {
  let countPart = item.querySelector(".count-item");

  if (+countPart.children[1].textContent > 1) {
    countPart.children[1].textContent = +countPart.children[1].textContent - 1;
  }

  verifyToken().then((id) =>
    fetch(
      `https://localhost:7164/cart/change-count?userId=${id}&newCount=${countPart.children[1].textContent}&productId=${item.id}`,
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
      }
    )
  );
}

function addToCart(item) {
  verifyToken()
    .then(getUser)
    .then((data) => {
      let requestBody = { PartId: item, CartId: data.cart.id, Count: "1" };

      fetch(`https://localhost:7164/cart/add-to-cart`, {
        //TODO fix add to cart
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(requestBody),
      });
    });
}

// if (partsInCart.length > 0) {
//   partsInCart.forEach((part) => {
//     removePart(part);
//     addCountPart(part);
//     decreaseCountPart(part);
//     RerenderTotal(part);
//   });
// } else {
//   cartBlock.innerHTML = `
//     <div class="empty-cart">
//         <div class="empty-cart-title">Your cart is empty</div> //TODO add empty cart logic
//         <img src="../assets/shoppingCart.svg" alt="">
//     </div>`;
// }
