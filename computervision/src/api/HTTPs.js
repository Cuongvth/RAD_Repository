const axios = require("axios");

class HTTPSingleton {
  static config = {
    // baseURL: "https://rd.dj-xuyenchi.edu.vn",
    baseURL: "https://localhost:7228",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    timeout: 20000,
  };

  constructor() {
    this.HTTP = axios.create(HTTPSingleton.config);
  }

  static getInstance() {
    if (!HTTPSingleton.instance) {
      HTTPSingleton.instance = new HTTPSingleton();
    }
    return HTTPSingleton.instance;
  }

  getHTTP() {
    return this.HTTP;
  }
}

const HTTP = HTTPSingleton.getInstance().getHTTP();

module.exports = { HTTP, HTTPSingleton };
