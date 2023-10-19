const cartBtn = document.querySelector(".cart-btn");
function renderCart(cart) {
  if (cart.count != 0) {
    cartBtn.innerHTML = `${cart.count} items for $ ${cart.totalPrice}`;
  } else {
    cartBtn.innerHTML = `Empty`;
  }
}

function removePart(partId, cartId) {
  let requestBody = { partId: partId, cartId: cartId, count: 0 };

  return fetch(`https://localhost:7164/cart/remove-part`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(requestBody),
  }).then((response) => {
    if (response.status == 200) {
      return response.json();
    } else {
      Promise.reject;
    }
  });
}
function addToCart(partId, cartId) {
  let requestBody = { partId: partId, cartId: cartId, Count: 1 };

  return fetch(`https://localhost:7164/cart/add-to-cart`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(requestBody),
  });
}

function changeCartProductCount(partId, cartId, count) {
  let requestBody = { partId: partId, cartId: cartId, count: count };

  return fetch(`https://localhost:7164/cart/change-count`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(requestBody),
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      Promise.reject();
    }
  });
}
