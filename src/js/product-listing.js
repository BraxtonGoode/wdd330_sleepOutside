import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam, showBreadcrumbs } from "./utils.mjs";
import Alert from "./alert.mjs";

const category = getParam("category");

if (category) {
  document.querySelector("#top-products").textContent =
    `Top Products: ${category.charAt(0).toUpperCase() + category.slice(1)}`;
}

const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const list = new ProductList(category, dataSource, element);
const alertInstance = new Alert();

await list.init();
alertInstance.init();
await loadHeaderFooter();

const searchInput = document.querySelector("#search");
const searchButton = document.querySelector("#searchButton");

if (searchInput && searchButton) {
  // Function to handle the search logic
  const handleSearch = () => {
    const searchValue = searchInput.value.trim();
    list.filterList(searchValue);

    // If no items are found, display a "No items found" message
    if (list.listElement.childElementCount === 0) {
      const emptyList = document.createElement("p");
      emptyList.classList.add("empty-list");
      emptyList.textContent = "No items found.";
      list.listElement.appendChild(emptyList);
    }
    showBreadcrumbs(
      `${category.charAt(0).toUpperCase() + category.slice(1)} -> ${list.listElement.children.length} items`,
    );
  };

  // Add event listener for button click
  searchButton.addEventListener("click", handleSearch);

  // Add event listener for Enter key press
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default form submission behavior
      handleSearch();
    }
  });
}

showBreadcrumbs(
  `${category.charAt(0).toUpperCase() + category.slice(1)} -> ${list.list.length} items`,
);
