import { HTTP } from "../HTTPs";

export function checkDataLocal(form) {
  return new Promise((resolve, reject) => {
    HTTP.post(`admin/nhandangtructiep`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
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
export function checkInData(id) {
  return new Promise((resolve, reject) => {
    HTTP.get(`admin/nhandang?duLieuId=${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function getDuLieu(page, pageSize) {
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
export function getCanCuoc(page, pageSize) {
  return new Promise((resolve, reject) => {
    HTTP.get(`admin/getcancuoc?page=${page}&pageSize=${pageSize}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function getCanCuocCount() {
  return new Promise((resolve, reject) => {
    HTTP.get(`admin/getcancuoccount`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function getBLX(page, pageSize) {
  return new Promise((resolve, reject) => {
    HTTP.get(`admin/getblx?page=${page}&pageSize=${pageSize}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function getOneCanCuoc(id) {
  return new Promise((resolve, reject) => {
    HTTP.get(`admin/getonecancuoc?id=${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function getOneBLX(id) {
  return new Promise((resolve, reject) => {
    HTTP.get(`admin/getoneblx?id=${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function getBLXCount() {
  return new Promise((resolve, reject) => {
    HTTP.get(`admin/getblxcount`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function getDuLieuCount() {
  return new Promise((resolve, reject) => {
    HTTP.get(`admin/getdulieucount`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
