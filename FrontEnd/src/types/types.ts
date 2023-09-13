interface UserInfo {
    _id?:string
    name: string;
    userName: string;
    email ?:string
    phoneNumber?: Number
    dp: string
    bio?:string
    gender?: string
    city?:string
    isBlock?: Boolean
    blockedUsers?:string[]
    blockingUsers?:string[]
    followers: string[]
    following: string[]
    requests?:string[]
    requested?:string[]
    updatedAt ?: string
    createdAt ?: string
    savedPost : string[]
  }

  interface IuserHomeSlice{
    name: string;
    userName: string;
    dp: string
    savedPost : string[];
    followers : string[];
    following : string[];
  }
  interface Post{
      postedUser:string,
      description:string,
      imgNames: string[],
      isBlocked:boolean,
      liked:[{
        userName:string;
        dp:string;
      }],
      reports:[],
      _id : string,
      updatedAt : string,
      createdAt : string,
      dp:string
  }

  interface iPostSlice{
    postedUser:string,
    description:string,
    imgNames: string[],
    isBlocked:boolean,
    liked:[],
    reports:[],
    _id : string,
    updatedAt : string,
    createdAt : string,
    dp:string
}

  interface Comment{
    _id :string
    postId :string
    userName:string
    comment:string
    liked:[{
      userName:string;
      dp:string;
    }],
    reply:{
      _id:string
      userName : string,
      comment : string,
      liked:[{
        userName:string;
        dp:string;
      }],
      updatedAt : string,
      createdAt : string
    }[];
    updatedAt : string,
    createdAt : string,
    dp :string
}

interface Reply {
  [x: string]: any;
  _id:string
  userName: string;
  comment: string;
  dp:string;
  liked:[{
    userName:string;
    dp:string;
  }],
  updatedAt: string;
  createdAt: string;
}

interface ISearchTab {
  openSearchTab: boolean;
  setOpenSearchTab: React.Dispatch<React.SetStateAction<boolean>>;
}