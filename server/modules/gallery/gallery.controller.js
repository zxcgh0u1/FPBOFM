const service = require('./gallery.service');

exports.list = async (req, res) => {
  try {
    const creatures = await service.list();
    res.json(creatures);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
