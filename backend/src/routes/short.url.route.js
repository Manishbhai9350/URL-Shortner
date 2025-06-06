import { Router } from "express";
import {AuthUserMiddleware} from '../middleware/user.auth.js'
import { CreateShortUrlController,CreateCustomShortUrlController, GetUserUrlsController } from "../controllers/short.url.controller.js";


const router = Router()



router.post('/',CreateShortUrlController)
router.post('/custom',AuthUserMiddleware,CreateCustomShortUrlController)
router.get('/urls',AuthUserMiddleware,GetUserUrlsController)

export  {router as ShortUrlRouter}