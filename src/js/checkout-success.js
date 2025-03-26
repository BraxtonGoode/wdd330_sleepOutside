import { loadHeaderFooter, setLocalStorage } from "./utils.mjs";
setLocalStorage("so-cart", []);

const urlParams = new URLSearchParams(window.location.search);
const orderNumber = urlParams.get("orderNumber");
document.getElementById("order-number").innerText = orderNumber;

loadHeaderFooter();
