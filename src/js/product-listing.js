﻿import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

await loadHeaderFooter();

const category = getParam("category") || "tents";
const dataSource = new ProductData();
const element = document.querySelector(".product-list");

const listing = new ProductList(category, dataSource, element);
await listing.init();
