export const templateMess = info => {
  var str = "";
  for (let index = 0; index < info.length; index++) {
    const element = info[index];

    str = str + "<br>- " + element.title;
    str = str + "<br> " + element.snippet + "<br>";
  }

  str = str + `<br><span style="font-weight:900">Learn more:</span><br><br>`;

  for (let index = 0; index < info.length; index++) {
    const element = info[index];

    str =
      str +
      `<a style="margin: 5px; height:24px; display: inline-block; border-radius:5px; background-color: aquamarine; color:black" href="${element.link}" target="_blank">
      <span>${element.displayLink}</span>
    </a>`;
  }
  str = str + "<br><br>";
  str =
    str +
    `<div style="display: flex; gap: 2px; text-align: center;">`;
  for (let index = 0; index < info.length; index++) {
    const element = info[index];

    const link = element.pagemap.metatags[0]["og:image"];
    if (link != undefined) {
      if (link.includes("http")) {
        str =
          str +
          `<br><div style="flex-basis: calc(33.33% - 10px); height: 200px; background-color: #f1f1f1; margin-bottom: 10px;">
        <img class="mixImageFunction" src="${link}" style="width: 100%; height: 100%; object-fit: cover;">
        </div><br>`;
      } else {
      }
    }
  }
  str = str + `</div>`;
  str = str + "<br>";

  return str;
};
