import { GetUserById } from "../dao/mongo.db.dao.js"
import { verifyToken } from "../utils/jwt.util.js"





export const AuthUserMiddleware = async (req,res,next) => {
    const AccessToken = req.cookies['access-token']
    if(!AccessToken) {
        return res.status(401).json({
            message:'Unauthorized',
            success:false
        })
    }
    const Decoded = verifyToken(AccessToken)
    if(!Decoded) {
        return res.status(401).json({
            message:'Unauthorized',
            success:false
        })
    }
    const User  = await GetUserById(Decoded.id)
    if(!User) {
        return res.status(401).json({
            message:'Unauthorized',
            success:false
        })
    }
    req.user = User;
    next()
}