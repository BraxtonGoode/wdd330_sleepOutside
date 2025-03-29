const baseURL = import.meta.env.VITE_SERVER_URL; // For testing (Ella needs this) "//server-nodejs.cit.byui.edu:3000/"

async function convertToJson(res) {
  const json = await res.json();
  if (res.ok) {
    return json;
  } else {
    throw { name: "servicesError", message: json };
  }
}

export default class ExternalServices {
  constructor() {}

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const product = await fetch(`${baseURL}product/${id}`);
    return (await convertToJson(product)).Result;
  }

  async sendOrder(order) {
    return await fetch(`${baseURL}checkout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then(async (response) => await convertToJson(response))
      .then((json) => json);
  }
}
