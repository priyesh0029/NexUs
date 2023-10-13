import { adminTypeRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/adminRepository";


export const adminDbRepository = (
  repository: ReturnType<adminTypeRepositoryMongoDB>
) => {
    const findByProperty = async (params: string) =>
    await repository.findByProperty(params);

  return {
    findByProperty
  };
};

export type adminTypeDbRepository = typeof adminDbRepository;