const char1 = [
  "a",
  "á",
  "à",
  "ạ",
  "ã",
  "ả",
  "ă",
  "ắ",
  "ằ",
  "ặ",
  "ẳ",
  "ẵ",
  "â",
  "ấ",
  "ầ",
  "ẩ",
  "ậ",
  "ẫ",
];
const char2 = ["e", "é", "è", "ẹ", "ẻ", "ẽ", "ê", "ế", "ề", "ễ", "ễ", "ệ"];
const char3 = [
  "o",
  "ó",
  "ò",
  "ọ",
  "õ",
  "ỏ",
  "ô",
  "ố",
  "ồ",
  "ỗ",
  "ộ",
  "ổ",
  "ơ",
  "ớ",
  "ờ",
  "ỡ",
  "ợ",
  "ở",
];
const char4 = ["u", "ù", "ú", "ũ", "ụ", "ủ", "ư", "ứ", "ừ", "ử", "ữ", "ự"];
const char5 = ["i", "í", "ì", "ị", "ỉ", "ĩ"];
const char6 = ["y", "ý", "ỳ", "ỷ", "ỵ", "ỹ"];
const getArrCharator = (char) => {
  if (char1.includes(char)) {
    return char1;
  }
  if (char2.includes(char)) {
    return char2;
  }
  if (char3.includes(char)) {
    return char3;
  }
  if (char4.includes(char)) {
    return char4;
  }
  if (char5.includes(char)) {
    return char5;
  }
  if (char6.includes(char)) {
    return char6;
  }
  return [char];
};

let arr = [];

const getArrResult = (str, index, current) => {
  if (index == str.length) {
    arr.push(current);
    return;
  }
  var c = str[index];
  var caseChar = getArrCharator(c);
  caseChar.forEach((element) => {
    var update = current + element;
    getArrResult(str, index + 1, update);
  });
};

const fs = require("fs");
const jsonString = fs.readFileSync("tinh.json", "utf8");
const data = JSON.parse(jsonString);
const tinhThanh = data.tinhThanh;

a = 0;

tinhThanh.forEach((element) => {
  getArrResult(element, 0, "");
  const jsonString = JSON.stringify(arr);
  fs.writeFileSync(`${a++}.json`, jsonString);
  arr = [];
});
