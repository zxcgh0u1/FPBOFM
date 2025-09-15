import * as service from './battles.service.js';

export async function getHistory(req, res) {
  try {
    const userId = req.user.id;
    const battles = await service.getBattleHistory(userId);
    res.json(battles);
  } catch (err) {
    console.error('Ошибка истории боёв:', err);
    res.status(400).json({ error: 'Ошибка при получении истории боёв' });
  }
}

export async function startBattle(req, res) {
  try {
    const userId = req.user.id;
    const { opponentId } = req.body;

    if (!opponentId) {
      return res.status(400).json({ error: 'Не указан ID противника' });
    }
    if (opponentId === userId) {
      return res.status(400).json({ error: 'Нельзя сражаться с самим собой' });
    }

    const battle = await service.createBattle(userId, opponentId);
    res.json(battle);
  } catch (err) {
    console.error('Ошибка создания боя:', err);
    res.status(400).json({ error: 'Ошибка при создании боя' });
  }
}
