import { Router } from 'express';
import { authMiddleware } from '../../auth/auth.middleware.js';
import * as controller from './battles.controller.js';

const router = Router();

router.use(authMiddleware);

// История боёв
router.get('/history', controller.getHistory);

// Начать бой
router.post('/start', controller.startBattle);

export default router;
