const baseUrl = "https://localhost:7124";

import { HTTP } from "../HTTPs";

export function uploadDocument(formData) {
  return new Promise((resolve, reject) => {
    HTTP.post(`upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        resolve({ data: response.data });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function convertDocument(targetLanguage, imagePaths) {
  return new Promise((resolve, reject) => {
    HTTP.post(`convert?targetLanguage=${targetLanguage}`, imagePaths)
      .then((response) => {
        resolve({ data: response.data });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function downloadDocument(filePath, translatedBlocks) {
  return new Promise((resolve, reject) => {
    HTTP.post(`download?filePath=${filePath}`, translatedBlocks, {
      responseType: "arraybuffer",
    })
      .then((response) => {
        resolve({ data: response.data });
      })
      .catch((error) => {
        reject(error);
      });
  });
}
