import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";

// create the initial datasource to use in the product listing to tents
const dataSource = new ProductData("tents");
// use `.product-list` class selector to select the <ul> tag
// then await the `init()` method to open the thread
const productList = new ProductList(dataSource, ".product-list");
await productList.init();
