import { Router } from 'express';
import { bedRegister, showRoomList, print } from '../controller/bed.controller.js';
import { userAuthMain } from '../middleware/userAuth.main.js';
const router = new Router();

router.post('/register', userAuthMain, bedRegister);
router.get('/showRoomList', showRoomList);
router.post('/print', print);

export default router;