
import { Router } from 'express';
import ctrl from './gallery.controller.js';
import { authMiddleware } from '../../auth/auth.middleware.js';

const router = Router();

router.get('/', ctrl.list);
router.post('/', authMiddleware, ctrl.add);

export default router;
