import { CreateUrlDataBase } from "../dao/index.js";
import { GenerateUrl } from "../utils/helper.util.js";



export const CreateShortUrl = async (url) => {
    const short = GenerateUrl();
    const ShortUrl = await CreateUrlDataBase(url,short)
    console.log(ShortUrl)
    return ShortUrl
}