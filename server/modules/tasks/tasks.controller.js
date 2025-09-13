const service = require('./tasks.service');

exports.list = async (req, res) => {
  try {
    const tasks = await service.list(req.user.id);
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.claimDaily = async (req, res) => {
  try {
    const reward = await service.claimDaily(req.user.id);
    res.json({ ok: true, reward });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};
