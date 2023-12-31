interface UserInfo {
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
  reports: string[];
  followers: string[];
  following: string[];
  requests?: string[];
  requested?: string[];
  updatedAt?: string;
  createdAt?: string;
  savedPost: string[];
  accountDeactive?: boolean;
}

interface IgoogleLoginResponse {
  name: string;
  email: string;
}

interface IAdminUserLise {
  _id: string;
  dp: string;
  userName: string;
  name: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  reports: string[];
  isBlock: boolean;
}

interface IuserChatList {
  chatName: string;
  isGroupChat: boolean;
  groupAdmin?: { _id: string; name: string; userName: string; dp: string };
  users: UserInfo[];
  latestMessage: {
    chatId: string;
    content: string;
    createdAt: string;
    sender: string;
    updatedAt: string;
    _id: string;
  };
  updatedAt: string;
  createdAt: string;
  _id: string;
}

interface Imessage {
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

interface IuserHomeSlice {
  _id: string;
  name: string;
  userName: string;
  dp: string;
  savedPost: string[];
  followers: string[];
  following: string[];
}
interface Post {
  postedUser: string;
  description: string;
  imgNames: string[];
  isBlocked: boolean;
  liked: {
    userName: string;
    dp: string;
    deactive?: boolean;
  }[];
  reports: [];
  _id: string;
  updatedAt: string;
  createdAt: string;
  dp: string;
}

interface iPostSlice {
  postedUser: string;
  description: string;
  imgNames: string[];
  isBlocked: boolean;
  liked: [];
  reports: [];
  _id: string;
  updatedAt: string;
  createdAt: string;
  dp: string;
}

interface Comment {
  _id: string;
  postId: string;
  userName: string;
  comment: string;
  isBlocked: boolean;
  liked: [
    {
      userName: string;
      dp: string;
    }
  ];
  reply: {
    _id: string;
    userName: string;
    comment: string;
    liked: [
      {
        userName: string;
        dp: string;
      }
    ];
    updatedAt: string;
    createdAt: string;
  }[];
  updatedAt: string;
  createdAt: string;
  dp: string;
}

interface Reply {
  [x: string]: any;
  _id: string;
  userName: string;
  comment: string;
  dp: string;
  liked: [
    {
      userName: string;
      dp: string;
    }
  ];
  updatedAt: string;
  createdAt: string;
}

interface ISearchTab {
  openSearchTab: boolean;
  setOpenSearchTab: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IuserReports {
  _id: string;
  userName: string;
  dp: string;
  name: string;
  email: string;
  reports: [
    {
      reportedUserUname: string;
      reportedUserName: string;
      name: string;
      dp: string;
      reason: string;
      createdAt: string;
    }
  ];
}

interface IallPosts {
  postId: string;
  postedUserName: string;
  postedUserUName: string;
  postedUserDp: string;
  postedEmail: string;
  reports: number;
  isBlocked: boolean;
  postContent: string[];
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface ICommentReportDetails {
  reportedUserUname: string;
  reportedUserName: string;
  dp: string;
  reason: string;
  createdAt: string;
}

interface IcommentReport {
  _id: string;
  comment: string;
  commentCreated: string;
  commetedUserDp: string;
  commetedUserEmail: string;
  commetedUserName: string;
  commetedUserUname: string;
  post: string[];
  postedUserDp: string;
  postedUserName: string;
  postedUserUname: string;
  isBlocked: boolean;
  reports: ICommentReportDetails[];
}

interface IreplyReports {
  reportedUserUname: string;
  reportedUserName: string;
  dp: string;
  reason: string;
  createdAt: string;
}

interface IReportedReplies {
  _id: string;
  comment: string;
  commetedUserDp: string;
  commetedUserName: string;
  commetedUserUname: string;
  isBlocked: boolean;
  post: string[];
  postedUserDp: string;
  postedUserName: string;
  postedUserUname: string;
  replyId : string;
  repliedUserDp: string;
  repliedUserEmail: string;
  repliedUserName: string;
  repliedUserUname: string;
  replyComment : string;
  replyCreatedAt: string;
  reports: IreplyReports[]
}

interface IreplyDetails{
  comment:string
  replyComment : string
}