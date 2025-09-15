
import { Router } from 'express';
import ctrl from './auth.controller.js';
import { authMiddleware } from './auth.middleware.js';

const router = Router();

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.get('/me', authMiddleware, ctrl.me);
router.post('/logout', authMiddleware, ctrl.logout);

export default router;
