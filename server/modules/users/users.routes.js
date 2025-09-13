const router = require('express').Router();
const { authMiddleware } = require('../../auth/auth.middleware');
const c = require('./users.controller');

router.use(authMiddleware);
router.get('/me', c.getMe);
router.get('/', c.getAll);

module.exports = router;
