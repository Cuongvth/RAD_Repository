import { GGSearch } from "../../../plugins/searchApi";

const key = "AIzaSyCzBu43s0DJxkg9g0Gx_KxklW5w36UKG_4";
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

export function reFormat(cauTraLoi) {
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

    await lstDanhTu.forEach(async element => {
      const link = await searchGoogle(element, 1);

      cauTraLoi = cauTraLoi.replace(
        `#${element}#`,
        `<a href="${link.items[0].link}" target="_blank">${element}</a>`,
      );
    }),

    resolve(cauTraLoi);
  });
}