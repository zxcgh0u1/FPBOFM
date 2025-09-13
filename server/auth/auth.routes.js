const router = require('express').Router();
const ctrl = require('./auth.controller');
const { authMiddleware } = require('./auth.middleware');

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.get('/me', authMiddleware, ctrl.me);

module.exports = router;
