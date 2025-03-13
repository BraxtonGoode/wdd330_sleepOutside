import {renderListWithTemplate} from "./utils.mjs";

"./utils.mjs"

// this is the function that will be passed into the utils function
// that will be used to create the product card
function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/?product=${product.Id}">
        <img
          src="${product.Image}"
          alt="${product.Name}"
        />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p></a
      >
    </li>  
  `;
}

// export this class so that it can be used multiple places
// but for now, the main.js file
export default class ProductList {
  constructor(dataSource, htmlElement) {
    this.dataSource = dataSource;
    this.htmlElement = htmlElement;
  }

  // initialize the datasource to get the data and call render
  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

  // this is just a pass through that calls the utils function
  // but added `clear` for when this class wants to utilize
  // it in the utils function
  renderList(list, clear = false) {
      renderListWithTemplate(productCardTemplate, this.htmlElement, list, undefined, clear);
  }
}
