const service = require('./users.service');

exports.getMe = async (req, res) => {
  try {
    const me = await service.getMe(req.user.id);
    res.json(me);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const users = await service.getAll();
    res.json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
