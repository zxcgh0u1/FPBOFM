const service = require('./creatures.service');

exports.list = async (req, res) => {
  try {
    const creatures = await service.list(req.user.id);
    res.json(creatures);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.upgrade = async (req, res) => {
  try {
    const upgraded = await service.upgrade(req.user.id, parseInt(req.params.id));
    res.json(upgraded);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
