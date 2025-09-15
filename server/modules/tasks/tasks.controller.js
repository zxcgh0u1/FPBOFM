
import service from './tasks.service.js';

async function list(req,res){
  try{ res.json(await service.list(req.user.id)); }
  catch(e){ res.status(400).json({ error:e.message }); }
}

async function daily(req,res){
  try{ res.json(await service.claimDaily(req.user.id)); }
  catch(e){ res.status(400).json({ error:e.message }); }
}

export default { list, daily };
