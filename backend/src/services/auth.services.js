import { RegisterUser } from "../dao/index.js"
import { GetUserByEmail } from "../dao/mongo.db.dao.js"
import { Compare } from "../utils/bcrypt.util.js"
import { UnauthorizedError } from "../utils/ErrorHandler.js"



export const CreateUser = async (UserDetails) => {
    const User = await RegisterUser(UserDetails)
    return User
}


export const LoginUser = async ({email,password}) => {
    const User = await GetUserByEmail(email)
    const HashedPass = User.password 
    const IsPasswordMatched = Compare(password,HashedPass)
    if(!IsPasswordMatched) {
        throw new UnauthorizedError('Wrong Credentials')
    }
    return User
}
