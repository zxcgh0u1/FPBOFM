
import * as service from './battles.service.js';

async function history(req,res){
  try{ res.json(await service.history(req.user.id)); }
  catch(e){ res.status(400).json({ error:e.message }); }
}

async function start(req,res){
  try{ res.json(await service.start(req.user.id, req.body.opponentId)); }
  catch(e){ res.status(400).json({ error:e.message }); }
}

export default { history, start };
