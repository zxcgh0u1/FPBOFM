import * as service from './battles.service.js';

// Получить историю боёв
export async function getHistory(req, res) {
  try {
    const userId = req.user.id;
    const battles = await service.getHistory(userId);
    res.json(battles);
  } catch (err) {
    console.error('Ошибка истории боёв:', err);
    res.status(500).json({ error: 'Не удалось загрузить историю боёв' });
  }
}

// Начать новый бой
export async function startBattle(req, res) {
  try {
    const { opponentId } = req.body;
    const userId = req.user.id;

    if (!opponentId) {
      return res.status(400).json({ error: 'Укажите ID соперника' });
    }

    // ❗️ временно победителя выбираем случайно
    const winnerId = Math.random() > 0.5 ? userId : opponentId;

    const battle = await service.createBattle(userId, opponentId, winnerId);
    res.json(battle);
  } catch (err) {
    console.error('Ошибка старта боя:', err);
    res.status(500).json({ error: 'Не удалось начать бой' });
  }
}
