const partsBlock = document.querySelector(".parts");
const manufacturesBlock = document.querySelector(".all-manufactures");
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-input");

function searchSubmit(event) {)
  event.preventDefault();
  if (event.key === "Enter") {
    console.log(searchInput.value);
  }
}

searchInput.addEventListener("keyup", searchSubmit);
