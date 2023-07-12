import { GGSearch } from "../../plugins/searchApi";

const key = "AIzaSyCzBu43s0DJxkg9g0Gx_KxklW5w36UKG_4";
const cx = "370680eb1781b459c";
export function searchGoogle(q, num) {
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