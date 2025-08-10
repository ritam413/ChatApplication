import express from 'express';
import {registerUser,loginUser,logoutUser,welcomeUser} from '../Controllers/auth.controller.js'
import {upload} from '../middlewares/multer.middleware.js'
const router = express.Router();

router.get('/',welcomeUser)
router.post('/register',
    upload.single('profilepic'),
    registerUser)
router.post('/login',
    upload.none(),
    loginUser)
router.post('/logout',logoutUser)


export default router;