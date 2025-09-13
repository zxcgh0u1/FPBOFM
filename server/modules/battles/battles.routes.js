const router = require('express').Router();
const { authMiddleware } = require('../../auth/auth.middleware');
const c = require('./battles.controller');

router.use(authMiddleware);

router.post('/start', c.startBattle);
router.get('/', c.listBattles);

module.exports = router;
