export interface ChatUsers {
  userName: string;
  dp: string;
  _id: string;
}

export interface UserInfo {
  _id: string;
  name: string;
  userName: string;
  email?: string;
  phoneNumber?: Number;
  dp: string;
  bio?: string;
  gender?: string;
  city?: string;
  isBlock?: Boolean;
  blockedUsers?: string[];
  blockingUsers?: string[];
  followers: string[];
  following: string[];
  requests?: string[];
  requested?: string[];
  updatedAt?: string;
  createdAt?: string;
  savedPost: string[];
  accountDeactive?: boolean;
}

export interface IuserChatList {
  chatName: string;
  isGroupChat: boolean;
  groupAdmin?: string;
  users: UserInfo[];
  updatedAt: string;
  createdAt: string;
  _id: string;
}

export interface Imessage {
  _id: string;
  chatId: IuserChatList;
  content: string;
  sender: {
    _id: string;
    userName: string;
    dp: string;
  };
  updatedAt: string;
  createdAt: string;
}
