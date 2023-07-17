export const isTravel =context=>{
  return { role: "assistant", content: "câu hỏi `"+context+"` có bao nhiêu phần trăm liên quan đến du lịch. Hãy trả lời bằng cách xuống dòng và hiển thị một con số phần trăm. tôi muốn 1 con số cụ thể và không trả lời thêm gì hết" };
};
export const isTravelConfirm =context=>{
  return { role: "assistant", content: "tôi muốn 1 con số cụ thể" };
};