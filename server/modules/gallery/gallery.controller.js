
import service from './gallery.service.js';

async function list(req, res){
  try{ res.json(await service.list()); }
  catch(e){ res.status(400).json({ error:e.message }); }
}
async function add(req, res){
  try{ await service.add(); res.status(501).json({ error:'Добавление пока не реализовано' }); }
  catch(e){ res.status(400).json({ error:e.message }); }
}

export default { list, add };
