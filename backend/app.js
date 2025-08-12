import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();

app.use(cors({
    origin:process.env.CORS_ORGIGIN,
    credentials:true,
}))

app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(express.static('public'))
app.use(cookieParser());


// here are the routes of the backend , it is good practise to put my routes import like this 
import authRoutes from './Routes/auth.routes.js'
import messageRoutes from './Routes/message.routes.js'
import userRoutes from './Routes/user.routes.js'

app.use('/api/auth', authRoutes)
app.use('/api/messages',messageRoutes)
app.use('/api/users',userRoutes)

export {app}