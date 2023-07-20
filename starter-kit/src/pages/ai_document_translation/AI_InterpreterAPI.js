import { HTTP } from "@/api/http_AI_InterpreterAPI";

export function uploadDocument(form) {
  return new Promise((resolve, reject) => {
    HTTP.post(`upload`, form, {
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

export function convertDocument(targetLanguage, imagePaths) {
  return new Promise((resolve, reject) => {
    HTTP.post(`convert?targetLanguage=${targetLanguage}`, imagePaths)
      .then(response => {
        resolve({ data: response.data });
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
}

export function downloadDocument(filePath, translatedBlocks) {
  return new Promise((resolve, reject) => {
    HTTP.post(`download?filePath=${filePath}`, translatedBlocks, {
      responseType: "arraybuffer",
    })
      .then(response => {
        resolve({ data: response.data });
      })
      .catch(error => {
        reject(error);
      });
  });
}
