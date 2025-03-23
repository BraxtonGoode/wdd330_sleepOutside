import {
  getLocalStorage,
  setLocalStorage,
  cartCount,
  loadHeaderFooter,
} from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <label> qty:
  <input name="quantity" type="number" class="cart-card__quantity" value="${item.Quantity}">
  </label>
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
  // Add event listeners for quantity changes
  document.querySelectorAll(".cart-card__quantity").forEach((input) => {
    input.addEventListener("input", changeCartItemQuantity);
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

  // Remove the item from the cart in local storage
  let cart = getLocalStorage("so-cart") || [];
  cart = cart.filter((item) => item.Id !== itemId);
  setLocalStorage("so-cart", cart);

  // Re-render the cart contents
  renderCartContents();
}
function changeCartItemQuantity(event) {
  const value = event.target.value;
  const parent = event.target.parentElement;
  const itemId = parent.parentElement.querySelector(".cart-item-id").value;
  // fetching cart contents
  let cart = getLocalStorage("so-cart") || [];
  // Getting the current item by id
  let product = cart.filter((item) => item.Id == itemId);
  // iterating through each item in the cart, looking for the item that needs editing
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].Id == product[0].Id) {
      // Setting the original value to prevent qty from going below 0
      let previousValue = cart[i].Quantity;
      // Setting the item's quantity to the inputed value
      cart[i].Quantity = value;
      // If qty reaches 0, ask if item should be removed from cart
      if (value <= 0) {
        if (confirm("Do you want to remove this item from your cart?")) {
          cart = cart.filter((item) => item.Id !== itemId);
          setLocalStorage("so-cart", cart);
          renderCartContents();
        } else {
          // If kept in cart, qty is returned to 1
          event.target.value = previousValue;
        }
      } else {
        setLocalStorage("so-cart", cart);
        cartCount();
      }
    }
  }
}
await loadHeaderFooter();
renderCartContents();
