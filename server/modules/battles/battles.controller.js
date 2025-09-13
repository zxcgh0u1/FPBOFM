const svc = require('./battles.service');

exports.startBattle = async (req, res) => {
  try { res.json(await svc.startBattle(req.user.id, req.body.opponentId)); }
  catch (e) { res.status(400).json({ message: e.message }); }
};

exports.listBattles = async (req, res) => {
  try { res.json(await svc.listBattles(req.user.id)); }
  catch (e) { res.status(400).json({ message: e.message }); }
};
