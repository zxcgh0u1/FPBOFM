import service from './tasks.service.js';

export const list = async (req, res) => {
  try {
    const tasks = await service.list(req.user.id);
    res.json(tasks);
  } catch (err) {
    console.error('Ошибка получения заданий:', err);
    res.status(500).json({ message: 'Ошибка получения заданий' });
  }
};

export const daily = async (req, res) => {
  try {
    const result = await service.claimDaily(req.user.id);
    res.json(result);
  } catch (err) {
    console.error('Ошибка ежедневной награды:', err);
    res.status(500).json({ message: 'Ошибка ежедневной награды' });
  }
};
