export interface IadminInfo {
  _id: string;
  userName: string;
  password: string;
  email: string;
}

export interface IallPosts {
  id: null;
  allPosts: {
    postId: string
     postedUserName: string
    postedUserUName: string
    postedUserDp: string
    postedEmail: string
    reports: number
    isBlocked: string
    postContent: string[]
    description: string
    createdAt: string
    updatedAt: string
  };
}
