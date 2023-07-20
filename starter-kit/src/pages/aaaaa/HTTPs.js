import axios from "axios";

export class HTTPSingleton {
  static config = {
    // baseURL: "https://rd.dj-xuyenchi.edu.vn",
    
    // baseURL: "https://localhost:7228",
    baseURL: "https://localhost:7116",
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

export const HTTP = HTTPSingleton.getInstance().getHTTP();
