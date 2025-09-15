
import { Router } from 'express';
import { authMiddleware } from '../../auth/auth.middleware.js';
import ctrl from './battles.controller.js';

const router = Router();
router.use(authMiddleware);

router.get('/history', ctrl.history);
router.post('/start', ctrl.start);

export default router;
