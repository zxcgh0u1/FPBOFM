import { Router } from 'express';
import * as ctrl from './tasks.controller.js';
import { authMiddleware } from '../../auth/auth.middleware.js'; // 👈 так правильно

const router = Router();

router.get('/', authMiddleware, ctrl.list);
router.post('/daily', authMiddleware, ctrl.daily);

export default router;
