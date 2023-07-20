import axios from "@axios";
import { Configuration, OpenAIApi } from "openai";
import { templateMess } from "./chatRespon";
import { reFormat } from "./library";
import { isTravel } from "./temp";
import { callChatGPT } from "./useAPI";

const openaiGPT = new OpenAIApi(
  new Configuration({
    apiKey: "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",
  }),
);

export const useChatStore = defineStore("chat", {
  // ℹ️ arrow function recommended for full type inference
  state: () => ({
    contacts: [],
    chatsContacts: [],
    profileUser: undefined,
    activeChat: null,
  }),
  actions: {
    async isTravel(sentence) {
      const { data } = await axios.get(`/apps/chat/chats/${userId}`);

      this.activeChat = data;
    },
    async fetchChatsAndContacts(q) {
      const { data } = await axios.get("/apps/chat/chats-and-contacts", {
        params: { q },
      });

      const { chatsContacts, contacts, profileUser } = data;

      this.chatsContacts = chatsContacts;
      this.contacts = contacts;
      this.profileUser = profileUser;
    },
    async getChat(userId) {
      const { data } = await axios.get(`/apps/chat/chats/${userId}`);

      this.activeChat = data;
    },
    async sendMsg(message) {
      const senderId = this.profileUser?.id;

      this.ngucanh = message;

      const { data } = await axios.post(
        `/apps/chat/chats/${this.activeChat?.contact.id}`,
        { message, senderId },
      );

      this.postMsg(data);
    },
    async botSendMsg(message) {
      var  result = { content: "Tôi là một mô hình AI được huấn luyện bởi LTS Edu. Hiện tại tôi chỉ có thể trả lời các câu hỏi về du lịch" };

      // if(await this.isTravelContext(message))
      // {
      result = await  callChatGPT({ role: "user", content: `Trả lời câu hỏi "${message}" dưới dạng danh sách với gạch đầu dòng (-) và viết một câu mô tả khoảng 20 từ sau dấu hai chấm (:)` });

      // }

      const { data } = await axios.post(
        `/apps/chat/chats/${this.activeChat?.contact.id}`,
        {
          message: await reFormat(result.content),
          senderId: 1,
        },
      );

      this.postMsg(data);
    },
    async botSendMsgCustom(items) {
      var respon = "";
      respon = respon + templateMess(items.items) + "<br>";

      const { data } = await axios.post(
        `/apps/chat/chats/${this.activeChat?.contact.id}`,
        { message: respon, senderId: 1 },
      );

      this.postMsg(data);
    },
    async botSendMsgCustomEnd(message) {
      const result = await  callChatGPT({ role: "user", content: `Hãy cho tôi thông tin về\nThời điểm phù hợp\nSố lượng người phù hợp\nChi phí ước tính\nCác thông tin bên lề\nVề việc đi du lịch với ${message}` });

      const { data } = await axios.post(
        `/apps/chat/chats/${this.activeChat?.contact.id}`,
        {
          message: result.content.replace(/\n/g, '<br>'),
          senderId: 1,
        },
      );

      this.postMsg(data);
    },
    async postMsg(data) {
      const { msg, chat } = data;

      // ? If it's not undefined => New chat is created (Contact is not in list of chats)
      if (chat !== undefined) {
        const activeChat = this.activeChat;

        this.chatsContacts.push({
          ...activeChat.contact,
          chat: {
            id: chat.id,
            lastMessage: [],
            unseenMsgs: 0,
            messages: [msg],
          },
        });
        if (this.activeChat) {
          this.activeChat.chat = {
            id: chat.id,
            messages: [msg],
            unseenMsgs: 0,
            userId: this.activeChat?.contact.id,
          };
        }
      } else {
        this.activeChat?.chat?.messages.push(msg);
      }

      // Set Last Message for active contact
      const contact = this.chatsContacts.find(c => {
        if (this.activeChat) return c.id === this.activeChat.contact.id;

        return false;
      });

      contact.chat.lastMessage = msg;
    },
    async isTravelContext(message) {
      const result = await callChatGPT(isTravel(message));

      const content = result.content;

      message = content.replace(message, "");
      var numbers =content.match(/\d+/g);
      try {
        numbers= numbers.map(Number);
      } catch (error) {
        return false;
      }
      
      return !(numbers[0]<60);
    }, 
  },
});
