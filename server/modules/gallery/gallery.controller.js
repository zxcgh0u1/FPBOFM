const service = require('./gallery.service');

exports.list = async (_req, res) => {
  try { res.json(await service.list()); }
  catch (e) { res.status(400).json({ message: e.message }); }
};
