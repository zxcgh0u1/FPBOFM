
import { Router } from 'express';
import { authMiddleware } from '../../auth/auth.middleware.js';
import ctrl from './tasks.controller.js';

const router = Router();
router.use(authMiddleware);

router.get('/', ctrl.list);
router.post('/daily', ctrl.daily);

export default router;
