import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class CheckoutProcess {
  constructor(summary) {
    this.summary = summary;
    this.subtotal = 0;
    this.tax = 0;
    this.shipping = 0;
    this.total = 0;
  }
  init() {
    this.cart = getLocalStorage("so-cart") || [];

    this.calculate();
    this.displaySubtotal();
    this.displayTax();
    this.displayShippingEstimate();
    this.displayTotal();
  }
  calculate() {
    //subtotal
    this.subtotal = 0;
    this.cart.forEach((item) => {
      this.subtotal += item.FinalPrice * item.Quantity;
    });

    //tax
    this.tax = this.subtotal * 0.06;

    //shipping
    let shipping = 0;
    if (this.cart.length > 0) {
      shipping = 10 + (this.cart.length - 1) * 2;
    }
    this.shipping = shipping;

    //total
    this.total = this.subtotal + this.tax + this.shipping;
  }
  displaySubtotal() {
    this.summary.querySelector("#subtotal").innerHTML =
      `$${this.subtotal.toFixed(2)}`;
  }
  displayTax() {
    this.summary.querySelector("#tax").innerHTML = `$${this.tax.toFixed(2)}`;
  }
  displayShippingEstimate() {
    this.summary.querySelector("#shippingEstimate").innerHTML =
      `$${this.shipping.toFixed(2)}`;
  }
  displayTotal() {
    this.summary.querySelector("#orderTotal").innerHTML =
      `$${this.total.toFixed(2)}`;
  }
  packageItems() {
    return this.cart.map((item) => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.Quantity,
    }));
  }

  convertToOrder(form) {
    const formData = new FormData(form);
    let json = {};

    formData.forEach(function (value, key) {
      json[key] = value;
    });

    json.items = this.packageItems();
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.orderTotal = this.total;
    json.orderDate = new Date().toISOString();

    return json;
  }

  async checkout(form) {
    return await new ExternalServices().sendOrder(this.convertToOrder(form));
  }
}

