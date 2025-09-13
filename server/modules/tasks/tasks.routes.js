const router = require('express').Router();
const { authMiddleware } = require('../../auth/auth.middleware');
const c = require('./tasks.controller');

router.use(authMiddleware);
router.get('/', c.list);
router.post('/daily', c.claimDaily);

module.exports = router;
