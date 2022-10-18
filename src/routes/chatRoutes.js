import {Router} from 'express'
import ChatController from '../controllers/chatController.js'

const router = Router()
const controllerChat = new ChatController()

router.get('/', controllerChat.getMessages);
router.get('/:email', controllerChat.getUserMessages);

export default router