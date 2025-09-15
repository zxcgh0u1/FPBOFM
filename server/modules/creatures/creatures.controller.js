
import service from './creatures.service.js';

async function list(req, res){
  try{
    const data = await service.list(req.user.id);
    res.json(data);
  }catch(e){ res.status(400).json({ error: e.message }); }
}

async function upgrade(req, res){
  try{
    const { creatureId } = req.body;
    if(!creatureId) return res.status(400).json({ error:'Не передан ID существа' });
    const updated = await service.upgrade(req.user.id, creatureId);
    res.json(updated);
  }catch(e){ res.status(400).json({ error: e.message }); }
}

export default { list, upgrade };
