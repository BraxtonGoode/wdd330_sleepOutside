import { getLocalStorage, setLocalStorage, cartCount } from "./utils.mjs";


function getProductCard(product) {
  const showDiscount = product.SuggestedRetailPrice > product.FinalPrice;
  // color swatches
  let colorSwatches = getColorSwatches(product.Colors);
  return `
        <section class="product-detail">
          <h3>${product.Brand.Name}</h3>
          <h2 class="divider">${product.NameWithoutBrand}</h2>
          <img class="divider" src="${product.Images.PrimaryLarge}" alt="${product.NameWithoutBrand}">
          ${showDiscount ? `<p class="product__retail">$${product.SuggestedRetailPrice.toFixed(2)}</p>` : ""}
          <p class="product__price">$${product.FinalPrice}</p>
          ${showDiscount ? `<p class="product-card__discount-amount">Save $${(product.SuggestedRetailPrice - product.FinalPrice).toFixed(2)}</p>` : ""}
          <input id="product-color" type="hidden" value="${product.Colors[0].ColorCode}" />
          <div class="product__color">            
            ${colorSwatches}
          </div>
          <p class="product__description">${product.DescriptionHtmlSimple}</p>
          <div class="product-detail__add">
              <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
          </div>
        </section>
    `;
}

function getColorSwatches(colors) {
  let swatches = "";
  colors.forEach((color, index) => {
    swatches += `
      <figure>      
        <image src="${color.ColorChipImageSrc}"            
          alt="${color.ColorName}" 
          title="${color.ColorName}" 
          onclick="
            document.getElementById('product-color').value = '${color.ColorCode}';
            this.parentNode.parentNode.querySelectorAll('img').forEach((img) => {
              img.classList.remove('color-selected');
            });
            this.classList.add('color-selected');
          "          
          class='${index === 0 ? "color-selected" : ""}'
          />
        <figcaption>${color.ColorName}</figcaption>
      </figure>
    `;
  });
  return swatches;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // get the product from the product id pass into the constructor
    this.product = await this.dataSource.findProductById(this.productId);
    // create the product detail page from the dynamic html
    this.renderProductDetails("main");
    // find the add to cart button and wire up the click event
    document.getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  //get cart from local storage, add the product and update localstorage
  addProductToCart() {
    // Declaring duplicate, to check for duplicate items
    let duplicate = false;
    // get the cart from local storage; initialize array if necessary
    let cart = getLocalStorage("so-cart") || [];
    let item = this.product; // simplify the variable name to work with
    // give quanitiy variable if none exists
    if (item.Quantity == undefined) {
      item.Quantity = 1;
    }
    // cycle through every item in the cart, to see if ID is already in cart
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].Id == item.Id) {
        cart[i].Quantity += 1;
        duplicate = true;
      }
    }
    // push the product into the cart array if it isn't already there.
    if (duplicate == false) {
      cart.push(item);
    }
    setLocalStorage("so-cart", cart);
    cartCount()
    // Cart animation
    document.querySelector("svg").classList.toggle("anim");
    setTimeout(() => {
      document.querySelector("svg").classList.toggle("anim"); //Untoggle class so it will play when clicked a second time
    }, 1200);
  }

  renderProductDetails(selector) {
    // find the parent node for housing the product - see `main`
    const htmlElement = document.querySelector(selector);
    // add product card to main tag
    htmlElement.insertAdjacentHTML(
      "afterBegin",
      getProductCard(this.product)
    );
  }
}
