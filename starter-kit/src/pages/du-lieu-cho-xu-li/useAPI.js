import { HTTP } from "@/api/httpOCR";

export function getDuLieuCount() {
  return new Promise((resolve, reject) => {
    HTTP.get(`admin/getdulieucount`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function getDuLieu(page, pageSize) {
  return new Promise((resolve, reject) => {
    HTTP.get(`admin/getdulieu?page=${page}&pageSize=${pageSize}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}