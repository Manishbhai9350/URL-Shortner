import { Router } from "express";
import {AuthUserMiddleware} from '../middleware/user.auth.js'
import { CreateShortUrlController,CreateCustomShortUrlController } from "../controllers/short.url.controller.js";


const router = Router()



router.post('/',CreateShortUrlController)
router.post('/custom',AuthUserMiddleware,CreateCustomShortUrlController)


export  {router as ShortUrlRouter}