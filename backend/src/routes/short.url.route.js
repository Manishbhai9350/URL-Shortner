import { Router } from "express";
import { CreateShortUrlController } from "../controllers/short.url.controller.js";


const router = Router()



router.post('/',CreateShortUrlController)


export  {router as ShortUrlRouter}