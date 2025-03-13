import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

(async () => {
    const tentData = new ProductData("tents");
    const tentList = new ProductList(
    "tents",
    tentData,
    document.querySelector(".product-list"),
    );
    await tentList.init();
})();

