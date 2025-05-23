import {Router} from 'express'
import { RegisterUserController, LoginUserController, LogOutController} from '../controllers/user.controller.js'


const router = Router()

router.post('/register',RegisterUserController)
router.post('/login',LoginUserController)
router.get('/logout',LogOutController)



export {router as AuthRoutes}
