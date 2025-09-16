import { openEgg, openChest } from './gachas.service.js';

export async function egg(req, res) {
  try {
    const userId = Number(req.user.id);
    const result = await openEgg(userId);
    return res.json(result);
  } catch (e) {
    console.error('Ошибка гачи (яйцо):', e);
    return res.status(400).json({ message: e.message || 'Ошибка гачи' });
  }
}

export async function chest(req, res) {
  try {
    const userId = Number(req.user.id);
    const result = await openChest(userId);
    return res.json(result);
  } catch (e) {
    console.error('Ошибка гачи (сундук):', e);
    return res.status(400).json({ message: e.message || 'Ошибка гачи' });
  }
}

export default { egg, chest };
