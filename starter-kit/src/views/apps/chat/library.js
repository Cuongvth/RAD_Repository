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
    cauTraLoi = cauTraLoi.replace(`${item}`, `<span style="color: aquamarine; position: relative;" class="mixFunction"><div style="max-width: 500px; min-width: 350px; min-height: 250px; background: black; position: absolute; left: 50%; display: none; z-index: 9999; padding: 5px;"><img width="100%" src="image" class="mixImageFunction"/><strong style="margin: 0 2px; background-color: black;">Title</strong><p style="margin: 0 2px; background-color: black;">Description</p></div>${item}</span>`);
  }
  
  return cauTraLoi;
}