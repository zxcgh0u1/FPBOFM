import { Router } from 'express';
import { authMiddleware } from '../../auth/auth.middleware.js';
import controller from './gachas.controller.js';

const router = Router();
router.use(authMiddleware);

router.post('/egg', controller.egg);
router.post('/chest', controller.chest);

export default router;
