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
        this.list = [];
    }
    async init() {
        // Fetch data promise.
        const list = await this.dataSource.getData(this.category);
        this.list = list;
        this.renderList(list);
    }

    filterList(searchValue) {
    
      if (!searchValue) {
        // Show the full list if the search term is empty
        this.renderList(this.list);
        return;
      }
    
      const filteredList = this.list.filter(item =>
        item.Name.toLowerCase().includes(searchValue.toLowerCase())
      );
    
      // Re-render the list with the filtered items
      this.renderList(filteredList);
    }

    renderList(list) {
        // Clear the existing list
        this.listElement.innerHTML = "";
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}
