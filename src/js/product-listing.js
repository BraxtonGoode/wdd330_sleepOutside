import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";
import Alert from "./alert.mjs";

const category = getParam("category");

if (category) {
  document.querySelector("#top-products").textContent =
    `Top Products: ${category.charAt(0).toUpperCase() + category.slice(1)}`;
}

const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const list = new ProductList(category, dataSource, element);
const alertInstance = new Alert();

list.init();
alertInstance.init();
await loadHeaderFooter();
