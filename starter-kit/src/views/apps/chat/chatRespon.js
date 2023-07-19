// export const templateMess = info => {
//   var str = "";
//   for (let index = 0; index < info.length; index++) {
//     const element = info[index];

//     str = str + "<br>- " + element.title;
//     str = str + "<br> " + element.snippet + "<br>";
//   }

//   str = str + `<br><span style="font-weight:900">Learn more:</span><br><br>`;

//   for (let index = 0; index < info.length; index++) {
//     const element = info[index];

//     str =
//       str +
//       `<a style="margin: 5px; height:24px; display: inline-block; border-radius:5px; background-color: aquamarine; color:black" href="${element.link}" target="_blank">
//       <span>${element.displayLink}</span>
//     </a>`;
//   }
//   str = str + "<br><br>";
//   str =
//     str +
//     `<div style="display: flex; gap: 2px; text-align: center;">`;
//   for (let index = 0; index < info.length; index++) {
//     const element = info[index];

//     const link = element.pagemap.metatags[0]["og:image"];
//     if (link != undefined) {
//       if (link.includes("http")) {
//         str =
//           str +
//           `<br><div style="flex-basis: calc(33.33% - 10px); height: 200px; background-color: #f1f1f1; margin-bottom: 10px;">
//         <img class="mixImageFunction" src="${link}" style="width: 100%; height: 100%; object-fit: cover;">
//         </div><br>`;
//       } else {
//       }
//     }
//   }
//   str = str + `</div>`;
//   str = str + "<br>";

//   return str;
// };

export const templateMess = info => {
  var str = "";
  for (let index = 0; index < info.length; index++) {
    const element = info[index];

    const link = element.pagemap.metatags[0]["og:image"];
    if (link != undefined) {
      if (!link.includes("http")) {
        link = "https://career.lotus-qa.com/wp-content/uploads/sites/3/2022/05/LTS-GROUP-2.png";
      } else {
      }
    }

    str =
      str +
      `<div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
      "
    >
      <div style="width: 65%;">
      <a href="${element.link}" style="text-decoration: 0"
      ><h5
        style="
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0;
          margin-bottom: 10px;
        "
      >
      ${element.htmlTitle}
      </h5></a
    >
        <a
          style="
            margin-bottom: 10px;
            display: inline-block;
            background-color: aquamarine;
            padding: 2px 10px;
            border-radius: 5px;
            color: black;
            text-decoration: 0;
          "
          href="${element.link}"
          >${element.displayLink}</a
        >
        <p
          style="
            display: -webkit-box;
            -webkit-line-clamp: 5;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 0;
          "
        >
          ${element.htmlSnippet}
        </p>
      </div>
      <div style="text-align: center; background-color: black; width: 35%;">
        <img
          src="${link}"
          height="200px"
          width="100%"
        />
      </div>
    </div>`;
  }

  return str;
};
