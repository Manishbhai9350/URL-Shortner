import {Router} from 'express'
import { RegisterUserController, LoginUserController, LogOutController, GetUser} from '../controllers/user.controller.js'
import { AuthUserMiddleware } from '../middleware/user.auth.js'


const router = Router()

router.post('/register',RegisterUserController)
router.post('/login',LoginUserController)
router.get('/logout',LogOutController)
router.get('/me',AuthUserMiddleware,GetUser)



export {router as AuthRoutes}
