import { GetUrlsFromId } from '../dao/mongo.db.dao.js';
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

export const GetUserUrlsController = async (req,res) => {
  try {
    const {id} = req.user;
    if(!id) throw new Error('UnAuthenticated')
    
    const Urls = await GetUrlsFromId(id)

    res.status(200).json({
      success:true,
      Urls
    })
  } catch (error) {
    res.status(200).json({
      success:false,
      Urls:[]
    })
  }
}