
import { Router } from 'express';
import { authMiddleware } from '../../auth/auth.middleware.js';
import ctrl from './creatures.controller.js';

const router = Router();
router.use(authMiddleware);

router.get('/', ctrl.list);
router.post('/upgrade', ctrl.upgrade);

export default router;
