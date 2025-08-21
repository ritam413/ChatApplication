import express from 'express'
import {protectRoute} from '../middlewares/protectRoute.js'
import { getUsersForSideBar } from '../Controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js'
import { updateUserProfile } from '../Controllers/user.controller.js';

const router = express.Router();

router.get('/',protectRoute,getUsersForSideBar)
router.patch('/update',
    protectRoute,
    upload.single('profilepic'),
    updateUserProfile
)
 export default router