import express   from 'express'
import { sendMessages ,getMessages} from '../Controllers/messages.controller.js';
import { protectRoute } from '../middlewares/protectRoute.js';
import { upload } from '../middlewares/multer.middleware.js'
const router = express.Router();

router.post('/send/:id',
    upload.array("media",10),
    protectRoute,
    sendMessages)

router.get('/:id',protectRoute,getMessages)
export default router;