import axios from "@axios";
import { Configuration, OpenAIApi } from "openai";
import { templateMess } from "./chatRespon";
import { ggSearch, reFormat } from "./library";
import { context1, context2, context3 } from "./temp";

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

      const { data } = await axios.post(
        `/apps/chat/chats/${this.activeChat?.contact.id}`,
        { message, senderId },
      );

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
    async botSendMsg(message) {
      const result = await openaiGPT.createChatCompletion({
        model: "gpt-3.5-turbo-16k",
        messages: [
          context1,
          context2,
          context3,
          { role: "user", content: message },
        ],
      });

      const { data } = await axios.post(
        `/apps/chat/chats/${this.activeChat?.contact.id}`,
        {
          message: await reFormat(result.data.choices[0].message.content),
          senderId: 1,
        },
      );

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
    async botSendMsgCustom(message) {
      const items = await ggSearch(message);

      var respon = `<span style="font-size:24px;font-weight:550">${message}</span><br>`;
      respon = respon + templateMess(items.items) + "<br>";

      const { data } = await axios.post(
        `/apps/chat/chats/${this.activeChat?.contact.id}`,
        { message: respon, senderId: 1 },
      );

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
  },
});
