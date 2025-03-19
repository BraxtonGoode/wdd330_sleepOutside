import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const showDiscount = product.SuggestedRetailPrice > product.FinalPrice
    ? ""
    : "hidden";
    return `<li class="product-card">
            <a href="/product_pages/?product=${product.Id}">
              <img
                src="${product.Images.PrimaryMedium}"
                alt="Image of ${product.Name}"
              />
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.Name}</h2>
              <p class="product-card__retail ${showDiscount}">$${product.SuggestedRetailPrice.toFixed(2)}</p>
              <p class="product-card__price">$${product.FinalPrice}</p></a
            >
          </li>`
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        // Declare constructors.
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        // Fetch data promise.
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
        document.querySelector(".title").textContent = `${this.category.charAt(0).toUpperCase() + this.category.slice(1)}`;
    }
    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}
