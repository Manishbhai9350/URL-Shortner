import UrlModel from "../models/url.model.js";

export const SaveShortUrl = async (full,short,userId) => {
    const ShortUrl = new UrlModel({
      full,
      short,
    });
    if(userId) {
      ShortUrl.user = userId
    }
    await ShortUrl.save();
    return ShortUrl
}


export const GetUrlFromShort = async (short) => {
  const url = await UrlModel.findOne({ short });
  return url
}