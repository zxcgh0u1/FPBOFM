
import { Router } from 'express';
import { authMiddleware } from '../../auth/auth.middleware.js';
import ctrl from './gachas.controller.js';

const router = Router();
router.use(authMiddleware);

router.post('/egg', ctrl.egg);
router.post('/chest', ctrl.chest);

export default router;
