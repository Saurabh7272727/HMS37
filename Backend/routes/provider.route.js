import { Router } from 'express';
import { entryResgister } from '../controller/provider.controller.js';
import { userAuthMain } from '../middleware/userAuth.main.js';
const router = new Router();


router.post('/enter', userAuthMain, entryResgister);

export default router;