// const { Configuration, OpenAIApi } = require("openai");

// class APIOpenAI{

//   static openai = new OpenAIApi(new Configuration({
//     apiKey: "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",
//   }));

//   static async callAPIOpenAI(context)
//   {
//     try {
//       const chat_completion = await openai.createChatCompletion({
//         model: "gpt-3.5-turbo",
//         messages: context,
//       });

//       console.log({ role: chat_completion.data.choices.role, content: chat_completion.data.choices.content });

//       return { role: chat_completion.data.choices.role, content: chat_completion.data.choices.content };
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

// export default APIOpenAI;