const router = require('express').Router();
const { authMiddleware } = require('../../auth/auth.middleware');
const c = require('./tasks.controller');

router.use(authMiddleware);

router.post('/daily', c.claimDaily);
router.get('/', c.list);

module.exports = router;
