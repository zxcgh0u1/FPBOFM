const service = require('./currency.service');

exports.getWallet = async (req, res) => {
  try { res.json(await service.getWallet(req.user.id)); }
  catch (e) { res.status(400).json({ message: e.message }); }
};

exports.addFunds = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ message: 'Некорректная сумма' });
    res.json(await service.addFunds(req.user.id, amount));
  } catch (e) { res.status(400).json({ message: e.message }); }
};
