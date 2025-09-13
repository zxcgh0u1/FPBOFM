const router = require('express').Router();
const { authMiddleware } = require('../../auth/auth.middleware');
const c = require('./currency.controller');

router.use(authMiddleware);

router.get('/', c.getWallet);
router.post('/add', c.addFunds);

module.exports = router;
