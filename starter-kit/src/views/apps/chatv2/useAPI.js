import { HTTP } from "@/api/azureOpenAI";

export function callChatGPT(context) {
  return new Promise((resolve, reject) => {
    HTTP.post(`deployments/model/chat/completions?api-version=2023-03-15-preview`, {
      messages: [
        context,
      ],
      max_tokens: 800,
      temperature: 0,
      frequency_penalty: 0,
      presence_penalty: 0,
      top_p: 1,
      stop: null,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': "eae45a744ee042e184ec05670de74933",
      },
    })
      .then(response => {
        resolve({ role: "assistant", content: response.data.choices[0].message.content });
      })
      .catch(error => {
        reject(error);
      });
  });
}