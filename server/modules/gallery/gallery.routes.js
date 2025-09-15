import { Router } from 'express';
import ctrl from './gallery.controller.js';
import { authMiddleware } from '../../auth/auth.middleware.js';

const router = Router();

// Галерея теперь доступна всем без авторизации
router.get('/', ctrl.list);

// Добавление только для авторизованных (пока не реализовано)
router.post('/', authMiddleware, ctrl.add);

export default router;
