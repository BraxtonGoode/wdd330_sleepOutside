import { getLocalStorage, setLocalStorage, cartCount, loadHeaderFooter } from "./utils.mjs";


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
    <input type="hidden" class="cart-item-id" value="${item.Id}">
  <button class="cart-card__remove">X</button>
</li>`;

  return newItem;
}
//updates the cart html; will initialize it too if the page wasn't loaded already
function updateCartHTML(cartItems) {
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Add event listeners to remove buttons
  document.querySelectorAll(".cart-card__remove").forEach((button) => {
    button.addEventListener("click", removeCartItem);
  });

  if (cartItems.length > 0) {
    const totalCost = cartItems.reduce(
      (previous, current) => previous + current.ListPrice,
      0,
    );
    document.querySelector("#total-cost").textContent =
      `$${totalCost.toLocaleString()}`;
    document.querySelector(".cart-footer").classList.remove("hidden");
  } else {
    document.querySelector(".cart-footer").classList.add("hidden");
  }

  cartCount();
}
function renderCartContents() {
  // adding `|| []` so when the cart is empty, we don't get a null value for the cartItems
  const cartItems = getLocalStorage("so-cart") || [];
  updateCartHTML(cartItems);
}

function removeCartItem(event) {
  const button = event.target;
  const itemId = button.parentElement.querySelector(".cart-item-id").value;
  console.log("Removing item with ID:", itemId);

  // Remove the item from the cart in local storage
  let cart = getLocalStorage("so-cart") || [];
  cart = cart.filter((item) => item.Id !== itemId);
  setLocalStorage("so-cart", cart);

  // Re-render the cart contents
  renderCartContents();
}
await loadHeaderFooter();
renderCartContents();
