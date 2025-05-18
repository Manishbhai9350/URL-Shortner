import UrlModel from "../models/url.model.js";
import { ConflictError } from "../utils/ErrorHandler.js";

export const SaveShortUrl = async (full,short,userId) => {
  try {
    const ShortUrl = new UrlModel({
      full,
      short,
    });
    if(userId) {
      ShortUrl.user = userId
    }
    await ShortUrl.save();
    return ShortUrl
  } catch (error) {
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