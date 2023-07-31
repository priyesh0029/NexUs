import { authServiceType } from "../../framework/services/authServices"


export const authServiceInterface = (services : ReturnType <authServiceType>)=>{
    
    //password encryption
    const encryptPassword = async (password: string) => {
        return await services.encryptPassword(password);
    };

    //generate token

    const generateToken =  async(payload : string) =>{
        return  await services.generateToken(payload)
    }

    //password compare

    return{
        encryptPassword,
        generateToken
    }
}

export type authServiceInterfaceType = typeof authServiceInterface