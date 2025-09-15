
import service from './gachas.service.js';

async function egg(req, res){
  try{ const r = await service.openEgg(req.user.id); res.json(r); }
  catch(e){ res.status(400).json({ error: e.message }); }
}
async function chest(req, res){
  try{ const r = await service.openChest(req.user.id); res.json(r); }
  catch(e){ res.status(400).json({ error: e.message }); }
}

export default { egg, chest };
