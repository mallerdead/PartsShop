function renderOrders(orders) {
  if (window.location.href.includes("historyPage.html")) {
    renderHistoryPage(orders);
  } else if (window.location.href.includes("orderMoreInfo.html")) {
    renderOrderPage(orders);
  }
}

function renderHistoryPage(orders) {
  const historyBlock = document.querySelector(".history-items");

  historyBlock.innerHTML = `
    <div class="items-title">
        <div class="order-name">Order name</div>
        <div class="order-id">Order number</div>
        <div class="order-date">Order date</div>
        <div class="order-total-price">Order price</div>
        <div class="order-state">Order status</div>
    </div>`;

  orders.forEach((order) => {
    let status = Array.from(
      new Set(order.products.map((product) => product.status))
    );
    historyBlock.innerHTML += `
    <a class="history-item" href="orderMoreInfo.html?partId=${order.id}">
        <div class="order-name">${order.name}</div>
        <div class="order-id">${order.id}</div>
        <div class="order-date">${order.date
          .split("T")[0]
          .split("-")
          .join(".")}</div>
        <div class="order-total-price">${order.total}</div>
        <div class="order-state">${status.join("; ")}</div>
    </a>`;
  });
}

function renderOrderPage(orders) {
  const urlParams = new URLSearchParams(window.location.search);
  const order = orders.find((element) => {
    return element.id === +urlParams.get("partId");
  });
  const titlePage = document.querySelector(".title-page");
  const orderBlock = document.querySelector(".order-items");
  const orderInfoBlock = document.querySelector(".order-info");

  titlePage.innerHTML = `Order: ${order.name}`;
  orderBlock.innerHTML = `
    <div class="items-title">
      <div class="name-item">Manufacturer</div>
      <div class="description-item">Part description</div>
      <div class="vendor-code-item">Part code</div>
      <div class="item-count">Part count</div>
      <div class="price-item">Part price</div>
      <div class="item-state">Part status</div>
    </div>`;

  order.products.forEach((product) => {
    orderBlock.innerHTML += `
    <a class="order-item" href="productInfo.html?partId=${product.part.id}">
        <div class="name-item">${product.part.name}</div>
        <div class="description-item">${product.part.description}</div>
        <div class="vendor-code-item">${product.part.vendorCode}</div>
        <div class="item-count">${product.count}</div>
        <div class="price-item">$ ${product.part.price}</div>
        <div class="item-state">${product.status}</div> 
    </a>`;
  });
  orderInfoBlock.innerHTML = `
        <div class="order-total">
            <div class="total-count">${order.totalCount}</div>
            &nbsp;items for
            <div class="total-price">$ ${order.total}</div>
          </div>`;
}
