import { HTTP } from "@/api/httpOCR";

export function getBLX(page, pageSize) {
  return new Promise((resolve, reject) => {
    HTTP.get(`admin/getblx?page=${page}&pageSize=${pageSize}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function getBLXCount() {
  return new Promise((resolve, reject) => {
    HTTP.get(`admin/getblxcount`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}