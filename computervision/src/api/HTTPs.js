const axios = require("axios");

class HTTPSingleton {
  static config = {
    baseURL: "https://rd.dj-xuyenchi.edu.vn",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    timeout: 1000000,
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
