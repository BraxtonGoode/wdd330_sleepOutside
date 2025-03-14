// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(key) {
  const queryString = window.location.search;
  const queryParams = new URLSearchParams(queryString);
  return queryParams.get(key);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  };
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// Cart count indicator
export function cartCount() {
  const cartIndicator = document.querySelector("sup");
  const currentCart = getLocalStorage("so-cart");
  let count = 0;
  
  try {
      if (currentCart !== null) {
          
          currentCart.forEach(i => {
              count++;
          });
          cartIndicator.classList.add("cart-count");
          cartIndicator.textContent = count;
      }
      if (count <= 0) {
          cartIndicator.classList.remove("cart-count");
      }
  } catch {
      console.error("Error in cartCount() if-statement.");
  }
}
