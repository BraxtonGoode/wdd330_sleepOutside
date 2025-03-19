import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { cartCount, loadHeaderFooter, getParam } from "./utils.mjs";

const category = getParam("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const list = new ProductList(category, dataSource, element);

await loadHeaderFooter();
list.init();
