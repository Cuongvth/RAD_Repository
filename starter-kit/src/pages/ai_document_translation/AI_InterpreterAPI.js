import { HTTP } from "@/api/http_AI_InterpreterAPI";

export function uploadDocument(formData) {
  return new Promise((resolve, reject) => {
    HTTP.post(`upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(response => {
        resolve({ data: response.data });
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function convertDocument(targetLanguage, filePath, imagePaths) {
  return new Promise((resolve, reject) => {
    HTTP.post(`convert?targetLanguage=${targetLanguage}&filePath=${filePath}`, imagePaths)
      .then(response => {
        resolve({ data: response.data });
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
}

export function downloadDocument(folderName) {
  return new Promise((resolve, reject) => {
    HTTP.get(`download/${folderName}`, {
      responseType: 'blob',
    })
      .then(response => {
        resolve({ data: response.data });
      })
      .catch(error => {
        reject(error);
      });
  });
}