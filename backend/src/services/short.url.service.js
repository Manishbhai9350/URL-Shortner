import { GetUrlFromShort, SaveShortUrl } from "../dao/index.js";
import UrlModel from "../models/url.model.js";
import { GetRedirectUrl, NormalizeToHttps } from "../utils/app.helper.js";
import { ConflictError } from "../utils/ErrorHandler.js";
import { GenerateUrl } from "../utils/helper.util.js";



export const CreateShortUrl = async (full) => {
    const short = GenerateUrl();
    const ShortUrl = await SaveShortUrl(full,short)
    console.log(ShortUrl)
    return ShortUrl
}


export const RedirectFromShortUrl =  async (req, res) => {
  try {
    const { short } = req.params;

    console.log(short)

    const Url = await GetUrlFromShort(short);

    if (!Url) {
      return res.status(400).json({
        message: "Undefined URL",
        success: false,
      });
    }

    res.redirect(Url.redirect);
  } catch (error) {
    return res.status(400).json({
      message: "Undefined URL",
      success: false,
    });
  }
}


export const CreateCustomUrl = async ({url,slug,userId}) => {
  const Exist = await UrlModel.findOne({short:slug})
  if(Exist) throw new ConflictError('Short Url Already Exist')
  
  const ShortUrl = await SaveShortUrl(url,slug,userId)

  return ShortUrl
}