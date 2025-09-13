const router = require('express').Router();
const { authMiddleware } = require('../../auth/auth.middleware');
const c = require('./creatures.controller');

router.use(authMiddleware);

router.get('/', c.list);
router.post('/upgrade/:id', c.upgrade);

module.exports = router;
