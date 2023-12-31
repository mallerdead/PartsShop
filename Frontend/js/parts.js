const partsBlock = document.querySelector(".parts");
const manufacturesBlock = document.querySelector(".all-manufactures");
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-input");

function searchSubmit(event) {
  event.preventDefault();

  if (localStorage.getItem("searchString") == searchInput.value) {
    renderParts(JSON.parse(localStorage.getItem("searchResult")));
  } else {
    fetch(
      `https://localhost:7164/parts/find-part?searchData=${searchInput.value}`
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          Promise.reject();
        }
      })
      .then((data) => {
        localStorage.setItem("searchResult", JSON.stringify(data));
        localStorage.setItem("searchString", searchInput.value);
        renderParts(data);
      });
  }
}

function renderParts(data) {
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
    <div class="manufacture" id="${part.manufactureId}">
      <div class="manufacture-wrapper">
        <div class="name-manufacture">${part.manufacturer.name}</div>
      </div>
    </div>`;

    partsBlock.innerHTML += `
    <div class="part" id="${part.id}">
    <div class="part-info">
      <div class="manufacturer-part">${part.manufacturer.name}</div>
      <div class="number-part">${part.vendorCode}</div>
      <div class="description-part">${part.description}</div>
      <div class="availability-part">${part.availability}</div>
      <div class="delivery-part">${part.delivery} Days</div>
      <div class="price-part">$ ${part.price}</div>
    </div>
    <div class="btns-parts-wrapper">
      <button class="add-to-cart"></button>
      <button class="more-info"></button>
    </div>
  </div>`;
  }

  const addToCartBtns = partsBlock.querySelectorAll(".add-to-cart");

  addToCartBtns.forEach((addToCartBtn) => {
    addToCartBtn.addEventListener("click", () => {
      verifyToken()
        .then(getUser)
        .then((user) =>
          addToCart(addToCartBtn.parentNode.parentNode.id, user.cart.id)
        )
        .then((response) => {
          if (response.status == 200) {
            return response.json();
          } else {
            Promise.reject();
          }
        })
        .then(renderCart);
    });
  });

  const manufacturesBtn = document.querySelectorAll(".manufacture");
  manufacturesBtn.forEach((btn) =>
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
    })
  );

  const moreInfoButtons = document.querySelectorAll(".more-info");
  moreInfoButtons.forEach((btn) =>
    btn.addEventListener("click", () => {
      window.location.href =
        "productInfo.html" +
        "?partId=" +
        encodeURIComponent(btn.parentNode.parentNode.id);
    })
  );
}

async function getPartById(id) {
  try {
    const response = await fetch(`https://localhost:7164/parts/part?id=${id}`);
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error("Request failed");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

searchForm.addEventListener("submit", searchSubmit);
