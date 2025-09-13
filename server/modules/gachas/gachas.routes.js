const router = require('express').Router();
const { authMiddleware } = require('../../auth/auth.middleware');
const c = require('./gachas.controller');

router.use(authMiddleware);

router.post('/egg', c.openEgg);
router.post('/chest', c.openChest);

module.exports = router;
