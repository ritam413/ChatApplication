import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import { ACCESS_TOKEN_SECRET } from '../envVariables.js';
import chalk from 'chalk';
const protectRoute = async (req, res, next) => {
    try {
        //* changing this beacuse frontend cant get this :
        // const token = req.cookies.jwt;
        const authHeader = req.headers['authorization'];
        console.log("Auth Header: ",req.headers['authorization']);
        const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"
        console.log(chalk.red("Token: ",token));

        if (!token) {
            console.log("No token found");
            return res.status(401).json({ message: 'No Token Found' })
        }

        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET)
        console.log('Decoded JWT:', decoded);

        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized User' })
        }

        
        const user = await User.findById(decoded._id).select("-password") //when using frontend
        // const user = await User.findById(decoded.userId).select("-password") //when using postman

        console.log('User: ',user)
        if (!user){
            console.log("User Not Found in DB with ID",decoded._id)
            return res.status(401).json({ message: 'User Not Found' })
        }
        console.log("Decoded: ",decoded)
        console.log('User Found:', user.username);
        
        req.user = decoded;

        next();
    } catch (error) {
        console.log('Error in Protect Route Middleware', error)
        res.status(500).json({ message: 'Error in Protect Route Middleware, or couldnot pass ProtectRoute check' })
    }
}

export { protectRoute }