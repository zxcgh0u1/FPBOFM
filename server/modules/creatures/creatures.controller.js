const service = require('./creatures.service');

exports.list = async (req, res) => {
  try { res.json(await service.list(req.user.id)); }
  catch (e) { res.status(400).json({ message: e.message }); }
};

exports.upgrade = async (req, res) => {
  try { res.json(await service.upgrade(req.user.id, Number(req.params.id))); }
  catch (e) { res.status(400).json({ message: e.message }); }
};
