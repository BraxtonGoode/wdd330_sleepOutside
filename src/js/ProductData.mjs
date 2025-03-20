const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {
    //this.category = category;
    //this.path = `../json/${this.category}.json`;
  }

  async getData(category) {console.log(category)
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const product = await fetch(`${baseURL}product/${id}`);
    return (await convertToJson(product)).Result;
  }
}
