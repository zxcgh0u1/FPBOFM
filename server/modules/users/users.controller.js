
import { prisma } from '../../db/client.js';

async function me(req,res){
  try{
    const user = await prisma.user.findUnique({ where: { id: req.user.id }, include: { wallet: true } });
    res.json({ id: user.id, email: user.email, username: user.username, wallet: user.wallet });
  }catch(e){ res.status(400).json({ error: e.message }); }
}

export default { me };
