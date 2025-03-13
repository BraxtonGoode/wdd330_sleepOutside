import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
 // adding `|| []` so when the cart is empty, we don't get a null value for the cartItems
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // add event listeners to remove buttons
  const removeButtons = document.querySelectorAll(".cart-card__remove");
  removeButtons.forEach((button) => {
    button.addEventListener("click", removeCartItem);
  });
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
  <input type="hidden" class="cart-item-ID" value="${item.Id}" />
  <button class="cart-card__remove">X</button>
</li>`;

  return newItem;
}

// remove item from cart (takes event as argument)
function removeCartItem(event) {
  const button = event.target;
  const itemId = button.parentElement.querySelector(".cart-item-ID").value;


  const cartItems = getLocalStorage("so-cart");
  const newCart = cartItems.filter((item) => item.Id !== itemId);
  setLocalStorage("so-cart", newCart);

  renderCartContents();
}



renderCartContents();
