import {CreateShortUrl} from '../services/short.url.service.js'


export const CreateShortUrlController =  async (req, res) => {
  try {
    const { url } = req.body;

    const ShortUrl = await CreateShortUrl(url);

    res.status(201).json({
      ShortUrl,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something Went Wrong",
      success: false,
    });
  }
}