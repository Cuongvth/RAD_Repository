import axios from "axios";

export class HTTPSingleton {
  static config = {
    baseURL: "https://apirad.ltsgroup.tech/api/OCRAPI",
    
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
