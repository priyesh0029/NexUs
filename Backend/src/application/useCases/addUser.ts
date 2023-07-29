import { userTypeDbRepository } from "../repositories/userDbRepositories";
import { authServiceInterfaceType } from "../services/authServiceInterface";

export const registerUser = (
  user: {
    name: string;
    username: string;
    number: string;
    email: string;
    password: string;
  },
  userRepoDb: ReturnType<userTypeDbRepository>,
  authServiceInterfaceApp: ReturnType<authServiceInterfaceType>
) => {
    user.email = user.email.toLowerCase();
};
