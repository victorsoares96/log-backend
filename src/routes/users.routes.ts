import { Router } from 'express';

import UserController from '../controllers/user.controller';

const router = Router();

router.get('/users', UserController.index);
router.post('/users', UserController.store);

export default router;
