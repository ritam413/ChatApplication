import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import { ACCESS_TOKEN_SECRET } from '../envVariables.js';
const protectRoute =async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized User' })
        }

        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET)

        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized User' })
        }

        const user = await User.findById(decoded.userId).select("-password")
        
        if(!user)
            return res.status(401).json({ message: 'User Not Found' })

        req.user = user;

        next();
    } catch (error) {
        console.log('Error in Protect Route Middleware', error)
        res.status(500).json({ message: 'Error in Protect Route Middleware, or couldnot pass ProtectRoute check' })
    }
}

export {protectRoute}