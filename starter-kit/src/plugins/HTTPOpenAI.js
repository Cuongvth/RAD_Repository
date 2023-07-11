import axios from "axios";

const KEY = "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";

class HeyGPT {
  isTravel(sentence) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `https://api.openai.com/v1/chat/completions`,
          {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content:
                  `tôi có một câu như này hãy kiểm tra xem nó có thuộc lĩnh vực du lịch không nếu có hãy trả lời là Yes ` + sentence,
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${KEY}`,
            },
          },
        )
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  satToGPTQuestion(question) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `https://api.openai.com/v1/chat/completions`,
          {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: question,
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${KEY}`,
            },
          },
        )
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  sayToGPTWrong(code, expectOutput, realOuput) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `https://api.openai.com/v1/chat/completions`,
          {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content:
                  "Đây là đoạn code của tôi bằng C# `" +
                  code +
                  "` tôi mong muốn nhận được kết quả là `" +
                  expectOutput +
                  "` nhưng tôi lại nhân được `" +
                  realOuput +
                  "` giải thích giúp tôi nhưng không hướng dẫn cách sửa để tôi tự nghĩ.",
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${KEY}`,
            },
          },
        )
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  genPractice(level, testCaseCount) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `https://api.openai.com/v1/chat/completions`,
          {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content:
                  "Tạo cho tôi 1 đề bài giải thuật c# " +
                  level +
                  " với " +
                  testCaseCount +
                  " test case với fomat dạng object để tôi có thể phân tích chuỗi là: ketQua = { tenBai: `tên bài ở đây`, practiceLesson :{ problem:`câu hỏi`,problemDetail:`mô tả vấn đề`, codeBegin:`code mặc định là 1 hàm không phải static và không có public` ,explain:`giải thích`,suggest:`gợi ý`,testCases:[{input:đầu vào,output:đầu ra đúng},{input:đầu vào,output:đầu ra đúng}]};",
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${KEY}`,
            },
          },
        )
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export default new HeyGPT();
