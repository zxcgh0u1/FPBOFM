import service from './users.service.js';

export async function profile(req, res) {
  try {
    const user = await service.getProfile(req.user.id);
    res.json(user);
  } catch (err) {
    console.error('Ошибка получения профиля:', err);
    res.status(500).json({ error: 'Ошибка получения профиля' });
  }
}

export default { profile };
