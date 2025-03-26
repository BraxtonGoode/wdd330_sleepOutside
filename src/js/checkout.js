import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const checkoutProcess = new CheckoutProcess(document.querySelector(".order-summary"));
checkoutProcess.init();

document.querySelector("#checkout").addEventListener("submit", e => {
    e.preventDefault();
    const form = document.forms[0]
    const checkValid = form.checkValidity();
    form.reportValidity();
    if (checkValid){
        checkoutProcess.checkout(e.target);
    }
    
});



await loadHeaderFooter();
