import { Router } from 'express';
import { authMiddleware } from '../../auth/auth.middleware.js';
import ctrl from './users.controller.js';

const router = Router();

router.use(authMiddleware);

// профиль пользователя
router.get('/profile', ctrl.profile);

export default router;
