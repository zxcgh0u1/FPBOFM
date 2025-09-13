const service = require('./battles.service');

exports.startBattle = async (req, res) => {
  try {
    const { opponentId } = req.body;
    const battle = await service.startBattle(req.user.id, opponentId);
    res.json(battle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.listBattles = async (req, res) => {
  try {
    const battles = await service.listBattles(req.user.id);
    res.json(battles);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
