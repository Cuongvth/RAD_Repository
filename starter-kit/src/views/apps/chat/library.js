import { GGSearch } from "../../../plugins/searchApi";

const key = "AIzaSyDT-poUu1uiWFEWU4mP7IeajTItbjdNU2o";
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
      if(isNaN(temp[index].split(".")[0]) && !temp[index].includes("-"))
      {
        continue;
      }
      if(temp[index].includes(":"))
      {
        lstDanhTu.push(temp[index].split(":")[0].replace(/^\d+\.\s*/, '').replace('-', ''));
      }  
      else
      {
        lstDanhTu.push(temp[index].replace(/^\d+\.\s*/, '').replace('-', ''));
      }   
    }
    resolve( await replaceElement(lstDanhTu, cauTraLoi));
  });
}
async function replaceElement(arr, cauTraLoi){
  for(var item of arr){
    cauTraLoi = cauTraLoi.replace(`${item}`, `<span style="color:aquamarine" class="mixFunction" onmouseover="this.style.cursor='pointer';">${item}</span>`);
  }
  
  return cauTraLoi;
}
export async function ggSearch(q){
  return await searchGoogle(q, 5);
}