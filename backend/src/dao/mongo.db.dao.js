import UrlModel from "../models/url.model.js";




export const CreateNewUrlDAO = async (full,short) => {
    const ShortUrl = new UrlModel({
      full,
      short,
    });

    await ShortUrl.save();
    return ShortUrl
}