interface IUserInfo {
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
    savedPost : string[],
    accountDeactive ?:boolean
  }