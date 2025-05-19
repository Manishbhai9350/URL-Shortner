import {CreateShortUrl,CreateCustomUrl} from '../services/short.url.service.js'


export const CreateShortUrlController =  async (req, res) => {
  try {
    const { url } = req.body;

    const ShortUrl = await CreateShortUrl(url);

    res.status(201).json({
      ShortUrl,
      success: true,
    })
  } catch (error) {
    res.status(400).json({
      message: "Something Went Wrong",
      success: false,
    });
  }
}


export const CreateCustomShortUrlController = async (req,res) => {
  try{
    console.log(req.body)
    const {url,slug} = req.body
    const ShortUrl = await CreateCustomUrl({url,slug,userId:req.user._id})
    if(!ShortUrl) throw new Error("Something Went Wrong")
    res.status(201).json({
      ShortUrl,
      success:true
    })
  } catch(error){
    throw new Error(error?.message || 'Something Went Wrong')  
  }
}