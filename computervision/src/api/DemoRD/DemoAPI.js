const { HTTP } = require("../HTTPs");

class DemoAPI {
  checkDataLocal(form) {
    return new Promise((resolve, reject) => {
      HTTP.post(`admin/nhandangtructiep`, form, {
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
  checkInData(id) {
    return new Promise((resolve, reject) => {
      HTTP.get(`admin/nhandang?duLieuId=${id}`)
        .then((response) => {
          console.log(response);
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  getDuLieu(page, pageSize) {
    return new Promise((resolve, reject) => {
      HTTP.get(`admin/getdulieu?page=${page}&pageSize=${pageSize}`)
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
