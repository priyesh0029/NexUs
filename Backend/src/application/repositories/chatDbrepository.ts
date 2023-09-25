import { chatRepositoryMongoDbType } from "../../framework/database/mongoDb/repositories/chatRepository";

export const chatRepositoryInterface = (
  repository: ReturnType<chatRepositoryMongoDbType>
) => {
  //handle Access Or CreateChat
  const handleAccessOrCreateChat = async (user: string, userId: string) =>
    await repository.accessOrCreateChatHandle(user, userId);

//handle Access Or CreateChat
const handleAccessOrCreateGroupChat = async (users: string[], userId: string) =>
await repository.accessOrCreateGroupChatHandle(users, userId);

  // get all users chat 
  const usersChatFetch = async (userId: string) => await repository.getChatsOfUser(userId);

  return {
    handleAccessOrCreateChat,
    handleAccessOrCreateGroupChat,
    usersChatFetch
  };
};

export type chatRepositoryInterfaceType = typeof chatRepositoryInterface;
