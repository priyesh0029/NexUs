import Admin from "../models/adminModels";

export const adminRepositoryMongoDB = () => {

    const findByProperty = async (params: string) => {
        console.log("admin111111 : ", params);
        const admin: any = await Admin.find({
          $or: [{ userName: params }, { email: params }],
        });
        console.log("user : ", admin.length);
        return admin;
      };
    return {
       findByProperty
      };
    };
    
    export type adminTypeRepositoryMongoDB = typeof adminRepositoryMongoDB;