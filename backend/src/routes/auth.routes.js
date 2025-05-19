import {Router} from 'express'
import { RegisterUserController, LoginUserController} from '../controllers/user.controller.js'


const router = Router()

router.post('/register',RegisterUserController)
router.post('/login',LoginUserController)



export {router as AuthRoutes}
