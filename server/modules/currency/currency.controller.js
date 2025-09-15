
import { getWallet } from './currency.service.js';

async function wallet(req,res){
  try{ res.json(await getWallet(req.user.id)); }
  catch(e){ res.status(400).json({ error:e.message }); }
}
export default { wallet };
