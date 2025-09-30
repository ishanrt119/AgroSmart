import { ChatUser, Conversation } from '../types';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';

export const AI_ASSISTANT_USER_ID = 'user_ai';

export const AI_ASSISTANT_USER: ChatUser = { 
  id: AI_ASSISTANT_USER_ID, 
  name: TRANSLATIONS[Language.EN].aiAssistant, 
  avatar: '✨' 
};

export const ALL_USERS: ChatUser[] = [
  { id: 'user_0', name: 'Krishna Kumar', avatar: 'K' },
  { id: 'user_1', name: 'Ramesh Singh', avatar: 'R' },
  { id: 'user_2', name: 'Sunita Devi', avatar: 'S' },
  { id: 'user_3', name: 'Vikram Choudhary', avatar: 'V' },
  { id: 'user_4', name: 'Anjali Sharma', avatar: 'A' },
  { id: 'user_5', name: 'Mohan Gupta', avatar: 'M' },
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv_ai',
    name: TRANSLATIONS[Language.EN].aiAssistant,
    members: [ALL_USERS[0], AI_ASSISTANT_USER],
    messages: [
      { id: 'msg_ai_1', senderId: AI_ASSISTANT_USER_ID, text: TRANSLATIONS[Language.EN].aiWelcomeMessage, timestamp: 'Now' },
    ],
    isGroup: false,
    avatar: '✨',
  },
  {
    id: 'conv_1',
    name: 'Ramesh Singh',
    members: [ALL_USERS[0], ALL_USERS[1]],
    messages: [
      { id: 'msg_1', senderId: 'user_1', text: 'Namaste Krishna ji, how is the maize crop this season?', timestamp: '10:30 AM' },
      { id: 'msg_2', senderId: 'user_0', text: 'Namaste Ramesh ji. It is going well, but the rainfall has been a bit less than expected.', timestamp: '10:32 AM' },
    ],
    isGroup: false,
    avatar: 'R',
  },
  {
    id: 'conv_2',
    name: 'Potato Farmers Group',
    members: [ALL_USERS[0], ALL_USERS[2], ALL_USERS[3]],
    messages: [
      { id: 'msg_3', senderId: 'user_2', text: 'Is anyone seeing signs of late blight on their potato crops?', timestamp: 'Yesterday' },
      { id: 'msg_4', senderId: 'user_3', text: 'I saw some spots on my plants. I am planning to spray a fungicide tomorrow.', timestamp: 'Yesterday' },
      { id: 'msg_5', senderId: 'user_0', text: 'Thanks for the heads-up. I will check my fields first thing in the morning.', timestamp: 'Yesterday' },
    ],
    isGroup: true,
    avatar: '🥔',
  },
  {
    id: 'conv_3',
    name: 'Sunita Devi',
    members: [ALL_USERS[0], ALL_USERS[2]],
    messages: [
       { id: 'msg_6', senderId: 'user_2', text: 'I heard the market price for ginger is good. Are you planning to sell?', timestamp: '2 days ago' },
    ],
    isGroup: false,
    avatar: 'S',
  },
];