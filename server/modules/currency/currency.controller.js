const service = require('./currency.service');

exports.getWallet = async (req, res) => {
  try {
    const wallet = await service.getWallet(req.user.id);
    res.json(wallet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.addFunds = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Некорректная сумма' });
    }

    const wallet = await service.addFunds(req.user.id, amount);
    res.json(wallet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
