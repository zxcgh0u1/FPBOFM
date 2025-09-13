const router = require('express').Router();
const { authMiddleware } = require('../../auth/auth.middleware');
const c = require('./gallery.controller');

router.use(authMiddleware);

router.get('/', c.list);

module.exports = router;
