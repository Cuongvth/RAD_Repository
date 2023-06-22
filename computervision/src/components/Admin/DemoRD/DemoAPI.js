const { HTTP } = require("../HTTPs");

class DemoAPI {
  check(form) {
    return new Promise((resolve, reject) => {
      HTTP.post(`api/r&d/check`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

module.exports = new DemoAPI();
