import { GGSearch } from "../../../plugins/searchApi";

const key = "AIzaSyDjWHbXj6BScpuFs5VzuME7q4UqnjRIl00";
const cx = "370680eb1781b459c";
function searchGoogle(q, num) {
  return new Promise((resolve, reject) => {
    GGSearch.get(`?q=${q}&key=${key}&cx=${cx}&num=${num}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export async function reFormat(cauTraLoi) {
  return new Promise(async (resolve, reject) => {
    cauTraLoi =  cauTraLoi.replace(/\n/g, '<br>');

    const temp = cauTraLoi.split("<br>");
    var lstDanhTu = [];

    for (let index = 0; index < temp.length; index++) {
      if(!temp[index].includes("-"))
      {
        continue;
      }
      if(temp[index].includes(":"))
      {
        lstDanhTu.push(temp[index].split(":")[0].replace('-', ''));
      }  
      else
      {
        lstDanhTu.push(temp[index].replace('-', ''));
      }   
    }
    resolve( await replaceElement(lstDanhTu, cauTraLoi));
  });
}
async function replaceElement(arr, cauTraLoi){
  for(var item of arr){
    cauTraLoi = cauTraLoi.replace(`${item}`, `<span style="color: aquamarine; position: relative" class="mixFunction"><div style="max-width: 500px; min-width: 350px; max-height: 400px; min-height: 250px; background-color: black; position: absolute; left: 50%; display: none; z-index: 9999;"><img width="100%" src="image"/><strong style="margin: 0 2px">Title</strong><p style="margin: 0 2px">Description</p></div>${item}</span>`);
  }
  
  return cauTraLoi;
}
export async function ggSearch(q){
  return await searchGoogle(q, 5);
}