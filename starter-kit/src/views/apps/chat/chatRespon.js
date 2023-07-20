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
      <a href="${element.link}" style="text-decoration: 0" target="_blank"
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
          target="_blank"
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
