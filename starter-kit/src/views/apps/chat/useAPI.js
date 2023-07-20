import { HTTP } from "@/api/searchApi";
import { Configuration, OpenAIApi } from "openai";

const key = "AIzaSyBCMPOLxksMJ5gqfDrkVbz9cJv-W5haNl4";
const cx = "370680eb1781b459c";

const openaiGPT = new OpenAIApi(
  new Configuration({
    apiKey: "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",
  }),
);

export function searchGoogle(q, num) {
  return new Promise((resolve, reject) => {
    HTTP.get(`?q=${q}&key=${key}&cx=${cx}&num=${num}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function callChatGPT(context) {
  return new Promise(async (resolve, reject) => {
    const result = await openaiGPT.createChatCompletion({
      model: "gpt-3.5-turbo-16k",
      messages: [
        context,
      ],
    });
  
    resolve({ role: "assistant", content: result.data.choices[0].message.content });
  });
}