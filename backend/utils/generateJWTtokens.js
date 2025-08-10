import jwt from "jsonwebtoken"
import {ACCESS_TOKEN_EXPIRY,ACCESS_TOKEN_SECRET,NODE_ENV} from '../envVariables.js'

const generateTokenAndSetCookie = (userID, res)=>{
    const token = jwt.sign(
        {userID},ACCESS_TOKEN_SECRET,{expiresIn:ACCESS_TOKEN_EXPIRY}
    )

    res.cookie('jwt',token,{
        maxAge:15*24*60*50*1000,//*Save the token max expiry in milisecounds
        httpOnly:true,//*prevernts XSS Attackts cross site scripting attacks
        sameSite:'strict',
        secure: NODE_ENV !== 'development',
    })
}

export default generateTokenAndSetCookie