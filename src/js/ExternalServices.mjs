const baseURL = import.meta.env.VITE_SERVER_URL; // For testing (Ella needs this) "//server-nodejs.cit.byui.edu:3000/"

async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: "servicesError", message: data };
  }
}

export default class ExternalServices {
  constructor() {

  }

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const product = await fetch(`${baseURL}product/${id}`);
    return (await convertToJson(product)).Result;
  }

  async sendOrder(payload) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
    try {
      return await fetch(`${baseURL}checkout`, options).then(convertToJson);
    } catch (error) {
      return null;
    }
  }
}

