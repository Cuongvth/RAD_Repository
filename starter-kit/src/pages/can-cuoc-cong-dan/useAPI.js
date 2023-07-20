import { HTTP } from "@/api/httpOCR";

export function getCanCuoc(page, pageSize) {
  return new Promise((resolve, reject) => {
    HTTP.get(`admin/getcancuoc?page=${page}&pageSize=${pageSize}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function getCanCuocCount() {
  return new Promise((resolve, reject) => {
    HTTP.get(`admin/getcancuoccount`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}