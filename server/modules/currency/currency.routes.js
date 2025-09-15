
import { Router } from 'express';
import { authMiddleware } from '../../auth/auth.middleware.js';
import ctrl from './currency.controller.js';

const router = Router();
router.use(authMiddleware);

router.get('/wallet', ctrl.wallet);

export default router;
