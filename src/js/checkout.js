import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter, setLocalStorage, alertMessage } from "./utils.mjs";

const checkoutProcess = new CheckoutProcess(
  document.querySelector(".order-summary"),
);
checkoutProcess.init();

document.querySelector("#checkout").addEventListener("submit", async (e) => {
  e.preventDefault();
  const isValid = e.target.checkValidity();
  e.target.reportValidity();
  if (isValid) {
    try {
      const response = await checkoutProcess.checkout(e.target);
      setLocalStorage("so-cart", []);
      window.location.href = "/checkout/success.html?orderNumber=" + response.orderId;
    } catch (err) {
      // TODO show error banner
      // loop through map keys and show values in red banners
      Object.keys(err.message).forEach((key) => {
        alertMessage(err.message[key], true);
      })
    }
  }
});

await loadHeaderFooter();
