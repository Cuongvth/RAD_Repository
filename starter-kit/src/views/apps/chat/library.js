import { GGSearch } from "../../../plugins/searchApi";

const key = "AIzaSyBGnlHQA0-rP2DuwORjgugeE1O6NSXH4YA";
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

    const temp = cauTraLoi.split("#");
    var lstDanhTu = [];

    for (let index = 0; index < temp.length; index++) {
      if(index%2 != 0)
      {
        lstDanhTu.push(temp[index]);
      }     
    }

    // lstDanhTu.forEach(async element => {
    //   const link = await searchGoogle(element, 1);

    //   cauTraLoi =  cauTraLoi.replace(`#${element}#`, `<a href="${link.items[0].link}" target="_blank">${element}</a>`);
    // });

    // resolve(cauTraLoi);

    // await lstDanhTu.forEach(async element => {
    //   const link = await searchGoogle(element, 1);
    //   const str = "#"+element+"#";

    //   cauTraLoi = cauTraLoi.replace(
    //     str,
    //     `<span class="mixFunction" data="${link}"
    //     ">${element}</span>`,
    //   );
    //   console.log(cauTraLoi);
    // });
    resolve( await replaceElement(lstDanhTu, cauTraLoi));
  });
}
async function replaceElement(arr, cauTraLoi){
  for(var item of arr){
    cauTraLoi = cauTraLoi.replace(`#${item}#`, `<span style="color:blue" class="mixFunction" onmouseover="this.style.cursor='pointer';">${item}</span>`);
  }
  
  return cauTraLoi;
}
export async function ggSearch(q){
  return await searchGoogle(q, 5);
}