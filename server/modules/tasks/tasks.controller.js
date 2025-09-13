const service = require('./tasks.service');

exports.list = async (req, res) => {
  try { res.json(await service.list(req.user.id)); }
  catch (e) { res.status(400).json({ message: e.message }); }
};

exports.claimDaily = async (req, res) => {
  try { res.json({ ok: true, reward: await service.claimDaily(req.user.id) }); }
  catch (e) { res.status(400).json({ ok: false, message: e.message }); }
};
