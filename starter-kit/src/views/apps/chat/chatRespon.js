export const templateMess=  info=>{
  var str = "<br>- " + info.title; 

  str= str + "<br> " + info.snippet;
 
  const link =info.pagemap.metatags[0]["og:image"];
  if(link.includes("http")){
    str = str + `<br><img style="width:30%" src="${info.pagemap.metatags[0]["og:image"]}" /><br>`;
  }
  
  str = str +`<span style="font-weight:900">Learn more:</span> <br><a style="margin:2px 2px 2px 2px;height:24px; display: inline-block; border-radius:5px;background-color: green;color:black" href="${info.link} target="_blank">
      ${info.displayLink}
    </a>`;

  return str;
};