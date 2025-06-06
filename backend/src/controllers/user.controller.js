import { CreateUser, LoginUser } from "../services/auth.services.js"
import WrappAsync from "../utils/WrappAsync.js"
import {signToken} from '../utils/jwt.util.js'
import {Hash} from '../utils/bcrypt.util.js'
import { cookieOptions } from "../config/cookie.config.js"
import UrlModel from "../models/url.model.js"

export const RegisterUserController = WrappAsync(async (req,res) => {
    const {email,password,username} = req.body

    const HashedPassword = await Hash(password)

    const User = await CreateUser({email,password:HashedPassword,username})

    const Payload = {email,username,id:User._id}

    const AccessToken = signToken(Payload)

    res.cookie('access-token',AccessToken,cookieOptions).status(201).json({
        message:'Registration Successfull',
        success:true,
        user:{email,username}
    })

})

export const LoginUserController = async (req,res) => {

    const {email,password} = req.body

    const LoginedUser = await LoginUser({email,password})

    const Payload = {email,username:LoginedUser.username,id:LoginedUser._id}

    const AccessToken = signToken(Payload)

    res.cookie('access-token',AccessToken,cookieOptions).status(201).json({
        message:'Login Successfull',
        success:true,
        user:{email,username:LoginedUser.username}
    })

}

export const GetUser = async (req,res) => {
    const {username,email,_id} = req.user;
    return res.status(200).json({
        success:true,
        user:{
            username,
            email,
            _id
        }
    })
}


export const LogOutController = async (req, res) => {
  res.cookie('access-token', '',cookieOptions).status(200).json({ message: 'Logged out successfully',success:true });
};
