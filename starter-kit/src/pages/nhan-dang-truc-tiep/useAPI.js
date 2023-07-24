import { HTTP } from "@/api/httpOCR";

export function checkDataLocal(form) {
  return new Promise((resolve, reject) => {
    HTTP.post(`nhandangtructiep`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}