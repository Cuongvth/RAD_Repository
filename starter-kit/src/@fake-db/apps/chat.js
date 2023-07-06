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
      fullName: "Gavin Griffith",
      role: "Frontend Developer",
      about:
        "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",
      avatar: avatar5,
      status: "offline",
    },
  ],
  chats: [
    {
      id: 1,
      userId: 1,
      unseenMsgs: 1,
      messages: [
        {
          message: "How can we help? We're here for you!",
          time: "Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)",
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true,
          },
        },
        {
          message:
            "Hey John, I am looking for the best admin template. Could you please help me to find it out?",
          time: "Mon Dec 10 2018 07:45:23 GMT+0000 (GMT)",
          senderId: 1,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true,
          },
        },
        {
          message: "It should use nice Framework.",
          time: "Mon Dec 10 2018 07:45:55 GMT+0000 (GMT)",
          senderId: 1,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true,
          },
        },
        {
          message: "Absolutely!",
          time: "Mon Dec 10 2018 07:46:00 GMT+0000 (GMT)",
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true,
          },
        },
        {
          message: "Our admin is the responsive admin template.!",
          time: "Mon Dec 10 2018 07:46:05 GMT+0000 (GMT)",
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true,
          },
        },
        {
          message: "Looks clean and fresh UI. 😍",
          time: "Mon Dec 10 2018 07:46:23 GMT+0000 (GMT)",
          senderId: 1,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true,
          },
        },
        {
          message: "It's perfect for my next project.",
          time: "Mon Dec 10 2018 07:46:33 GMT+0000 (GMT)",
          senderId: 1,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true,
          },
        },
        {
          message: "How can I purchase it?",
          time: "Mon Dec 10 2018 07:46:43 GMT+0000 (GMT)",
          senderId: 1,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true,
          },
        },
        {
          message: "Thanks, From our official site  😇",
          time: "Mon Dec 10 2018 07:46:53 GMT+0000 (GMT)",
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true,
          },
        },
        {
          message: "I will purchase it for sure. 👍",
          time: String(previousDay),
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
mock.onGet("/apps/chat/chats-and-contacts").reply((config) => {
  const { q = "" } = config.params;
  const qLowered = q.toLowerCase();

  const chatsContacts = database.chats
    .map((chat) => {
      const contact = JSON.parse(
        JSON.stringify(database.contacts.find((c) => c.id === chat.userId))
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
    chatsContacts: chatsContacts.filter((c) =>
      c.fullName.toLowerCase().includes(qLowered)
    ),
    contacts: database.contacts.filter((c) =>
      c.fullName.toLowerCase().includes(qLowered)
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
mock.onGet(/\/apps\/chat\/chats\/\d+/).reply((config) => {
  // Get user id from URL
  const userId = Number(config.url?.substring(config.url.lastIndexOf("/") + 1));
  const chat = database.chats.find((c) => c.userId === userId);
  if (chat) chat.unseenMsgs = 0;

  return [
    200,
    {
      chat,
      contact: database.contacts.find((c) => c.id === userId),
    },
  ];
});

// ------------------------------------------------
// POST: Add new chat message
// ------------------------------------------------
mock.onPost(/\/apps\/chat\/chats\/\d+/).reply((config) => {
  // Get user id from URL
  const contactId = Number(
    config.url?.substring(config.url.lastIndexOf("/") + 1)
  );

  // Get message from post data
  const { message, senderId } = JSON.parse(config.data);
  let activeChat = database.chats.find((chat) => chat.userId === contactId);

  const newMessageData = {
    message,
    time: String(new Date()),
    senderId,
    feedback: {
      isSent: true,
      isDelivered: false,
      isSeen: false,
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
