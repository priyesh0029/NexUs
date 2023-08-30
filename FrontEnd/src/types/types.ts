interface UserInfo {
    name: string;
    userName: string;
    email ?:string
    phoneNumber?: Number
    dp?: string
    bio?:string
    gender?: string
    city?:string
    isBlock?: Boolean
    blockedUsers?:string[]
    blockingUsers?:string[]
    followers?: string[]
    following?: string[]
    requests?:string[]
    requested?:string[]
    updatedAt ?: string
    createdAt ?: string
  }

  interface Post{
      postedUser:string,
      description:string,
      imgNames: string[],
      isBlocked:boolean,
      liked:string[],
      reports:[],
      _id : string,
      updatedAt : string,
      createdAt : string
  }

  interface Comment{
    _id :string
    postId :string
    userName:string
    comment:string
    liked:string[],
    reply:{
      _id:string
      userName : string,
      comment : string,
      liked : [],
      updatedAt : string,
      createdAt : string
    }[];
    updatedAt : string,
    createdAt : string
}

interface Reply {
  _id:string
  userName: string;
  comment: string;
  liked: [];
  updatedAt: string;
  createdAt: string;
}