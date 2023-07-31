import dotenv from 'dotenv'

dotenv.config()

const configKeys = {
    MONGO_URL : process.env.MONGODB_URL as string,
    JWT_SECRET : process.env.JWT_TOKEN_KEY as string,
    PORT : process.env.PORT as string
}

export default configKeys;