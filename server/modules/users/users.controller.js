const service = require('./users.service');

exports.getMe = async (req, res) => {
  try { res.json(await service.getMe(req.user.id)); }
  catch (e) { res.status(400).json({ message: e.message }); }
};

exports.getAll = async (_req, res) => {
  try { res.json(await service.getAll()); }
  catch (e) { res.status(400).json({ message: e.message }); }
};
