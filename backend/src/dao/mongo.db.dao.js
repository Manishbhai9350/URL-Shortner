import UrlModel from "../models/url.model.js";
import UserModel from '../models/user.model.js';
import { GetRedirectUrl, NormalizeToHttps } from "../utils/app.helper.js";
import { ConflictError } from "../utils/ErrorHandler.js";

export const SaveShortUrl = async (full,short,userId) => {
  try {
    const ShortUrl = new UrlModel({
      full:NormalizeToHttps(GetRedirectUrl({slug:short})),
      short,
      redirect:NormalizeToHttps(full)
    });
    if(userId) {
      ShortUrl.user = userId
    }
    console.log(userId)
    console.log(ShortUrl)
    await ShortUrl.save();
    return ShortUrl
  } catch (error) {
    console.log(error)
    throw new ConflictError(error.message)
  }
}


export const GetUrlFromShort = async (short) => {
  try{
  const url = await UrlModel.findOneAndUpdate({ short },{$inc:{click:1}});
  return url
  } catch (error) {
    throw new ConflictError(error.message)
  }
}

export const GetUrlsFromId = async (id) => {
  const Urls = await UrlModel.find({user:id})
  return Urls;
}


export const RegisterUser = async ({username,email,password}) => {
  const ExistingUser = await UserModel.findOne({email})

  if(ExistingUser) {
    throw new ConflictError('Wrong Credentials')
  }

  const User = await UserModel.create({email,username,password})

  if(!User) {
    throw new Error('Something Went Wrong')
  }

  return User
}


export const GetUserById = async (id) => {
  const User = await UserModel.findById(id)
  return User
}

export const GetUserByEmail = async (email) => {
  const User = await UserModel.findOne({email})
  return User
}