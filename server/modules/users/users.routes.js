
import { Router } from 'express';
import { authMiddleware } from '../../auth/auth.middleware.js';
import ctrl from './users.controller.js';

const router = Router();
router.use(authMiddleware);
router.get('/me', ctrl.me);

export default router;
