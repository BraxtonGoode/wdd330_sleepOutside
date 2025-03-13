import { getLocalStorage, cartCount } from "./utils.mjs";

function renderCartContents() {
  // adding `|| []` so when the cart is empty, we don't get a null value for the cartItems
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  if (cartItems.length > 0) {
    const totalCost = cartItems.reduce((previous, current) => previous + current.ListPrice, 0);
    document.querySelector("#total-cost").textContent = `$${totalCost.toLocaleString()}`;
    document.querySelector(".cart-footer").classList.remove("hidden");
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
cartCount();
