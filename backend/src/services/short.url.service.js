import { GetUrlFromShort, SaveShortUrl } from "../dao/index.js";
import { GenerateUrl } from "../utils/helper.util.js";



export const CreateShortUrl = async (full) => {
    const short = GenerateUrl();
    const ShortUrl = await SaveShortUrl(full,short)
    return ShortUrl
}


export const RedirectFromShortUrl =  async (req, res) => {
  try {
    const { short } = req.params;

    const Url = await GetUrlFromShort(short);

    if (!Url) {
      return res.status(400).json({
        message: "Undefined URL",
        success: false,
      });
    }

    res.redirect(Url.full);
  } catch (error) {
    return res.status(400).json({
      message: "Undefined URL",
      success: false,
    });
  }
}