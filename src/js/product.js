import { getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter, showBreadcrumbs } from "./utils.mjs";

const productId = getParam("product");
const dataSource = new ExternalServices("tents");
const product = new ProductDetails(productId, dataSource);
await product.init();
await loadHeaderFooter();
const category =
  product.product.Category.charAt(0).toUpperCase() +
  product.product.Category.slice(1);

showBreadcrumbs(`${category} -> ${productId}`);
