import CheckoutProcess from "./CheckoutProcess.mjs";
import { alertMessage, loadHeaderFooter, setLocalStorage } from "./utils.mjs";

const checkoutProcess = new CheckoutProcess(
  document.querySelector(".order-summary"),
);
checkoutProcess.init();

document.querySelector("#checkout").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formStatus = e.target.checkValidity() || false;
  e.target.reportValidity();
  if (formStatus) {
    const res = await checkoutProcess.checkout(e.target);
    if (res) {
      setLocalStorage("so-cart", []);
      window.location.href = "/checkout/success.html";
    } else {
      alertMessage("Checkout Failed!");
    }
  } else {
    alertMessage("Inputs are Invalid!");
  }
});

await loadHeaderFooter();
