import mock from "@/@fake-db/mock";
import { genId } from "@/@fake-db/utils";

// Images
import avatar1 from "@images/avatars/avatar-1.png";
import avatar5 from "@images/avatars/avatar-5.png";

const previousDay = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

const database = {
  profileUser: {
    id: 11,
    avatar: avatar1,
    fullName: "John Doe",
    role: "admin",
    about:
      "Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie marshmallow.",
    status: "online",
    settings: {
      isTwoStepAuthVerificationEnabled: true,
      isNotificationsOn: false,
    },
  },
  contacts: [
    {
      id: 1,
      fullName: "LTS Travel AI",
      role: "AI Assistant",
      about:
        "Do you need any help?",
      avatar: avatar5,
      status: "online",
    },
  ],
  chats: [
    {
      id: 1,
      userId: 1,
      unseenMsgs: 0,
      messages: [
        {
          message: "How can we help? We're here for you!",
          time: String(new Date()),
          senderId: 1,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true,
          },
        },
      ],
    },
  ],
};

// ------------------------------------------------
// GET: Return Chats Contacts and Contacts
// ------------------------------------------------
mock.onGet("/apps/chat/chats-and-contacts").reply(config => {
  const { q = "" } = config.params;
  const qLowered = q.toLowerCase();

  const chatsContacts = database.chats
    .map(chat => {
      const contact = JSON.parse(
        JSON.stringify(database.contacts.find(c => c.id === chat.userId)),
      );

      contact.chat = {
        id: chat.id,
        unseenMsgs: chat.unseenMsgs,
        lastMessage: chat.messages.at(-1),
      };

      return contact;
    })
    .reverse();

  const profileUserData = database.profileUser;

  const response = {
    chatsContacts: chatsContacts.filter(c =>
      c.fullName.toLowerCase().includes(qLowered),
    ),
    contacts: database.contacts.filter(c =>
      c.fullName.toLowerCase().includes(qLowered),
    ),
    profileUser: profileUserData,
  };

  return [200, response];
});

// ------------------------------------------------
// GET: Return Single Chat
// ------------------------------------------------
mock
  .onGet("/apps/chat/users/profile-user")
  .reply(() => [200, database.profileUser]);

// ------------------------------------------------
// GET: Return Single Chat
// ------------------------------------------------
mock.onGet(/\/apps\/chat\/chats\/\d+/).reply(config => {
  // Get user id from URL
  const userId = Number(config.url?.substring(config.url.lastIndexOf("/") + 1));
  const chat = database.chats.find(c => c.userId === userId);
  if (chat) chat.unseenMsgs = 0;

  return [
    200,
    {
      chat,
      contact: database.contacts.find(c => c.id === userId),
    },
  ];
});

// ------------------------------------------------
// POST: Add new chat message
// ------------------------------------------------
mock.onPost(/\/apps\/chat\/chats\/\d+/).reply(config => {
  // Get user id from URL
  const contactId = Number(
    config.url?.substring(config.url.lastIndexOf("/") + 1),
  );

  // Get message from post data
  const { message, senderId } = JSON.parse(config.data);
  let activeChat = database.chats.find(chat => chat.userId === contactId);

  const newMessageData = {
    message,
    time: String(new Date()),
    senderId,
    feedback: {
      isSent: true,
      isDelivered: true,
      isSeen: true,
    },
  };

  // If there's new chat for user create one
  let isNewChat = false;
  if (activeChat === undefined) {
    isNewChat = true;
    database.chats.push({
      id: genId(database.chats),
      userId: contactId,
      unseenMsgs: 0,
      messages: [],
    });
    activeChat = database.chats.at(-1);
  } else {
    activeChat.messages.push(newMessageData);
  }
  const response = { msg: newMessageData };
  if (isNewChat) response.chat = activeChat;

  return [201, response];
});
