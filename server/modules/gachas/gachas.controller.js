const service = require('./gachas.service');

exports.openEgg = async (req, res) => {
  try {
    const creature = await service.openEgg(req.user.id);
    res.json(creature);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.openChest = async (req, res) => {
  try {
    const creature = await service.openChest(req.user.id);
    res.json(creature);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
