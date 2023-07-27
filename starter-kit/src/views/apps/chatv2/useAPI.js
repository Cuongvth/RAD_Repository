import { HTTP } from "@/api/azureSearch";
import { Configuration, OpenAIApi } from "openai";

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
        'api-key': "2109cd8e197d441bac41dd8e96a02c16",
      },
    })
      .then(response => {
        console.log(response);
        resolve({ role: "assistant", content: response.data.choices[0].message.content });
      })
      .catch(error => {
        reject(error);
      });
  });
}