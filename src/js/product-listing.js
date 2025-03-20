import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

const category = getParam("category");

if (category) {
  document.querySelector("#top-products").textContent =
    `Top Products: ${category}`;
}

const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const list = new ProductList(category, dataSource, element);

list.init();

await loadHeaderFooter();
