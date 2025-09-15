
import { prisma } from '../db/client.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { security } from '../config/security.js';

function issueToken(user){
  const token = jwt.sign({ sub: user.id, email: user.email }, security.JWT_SECRET, { expiresIn: '7d' });
  return token;
}

async function register(req, res){
  try{
    const { email, username, password } = req.body;
    if(!email || !username || !password) return res.status(400).json({ error:'Missing fields' });
    const exists = await prisma.user.findUnique({ where: { email } });
    if(exists) return res.status(400).json({ error:'Email already used' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, username, passwordHash, wallet: { create: { balance: 0 } } }
    });
    res.json({ id: user.id, email: user.email, username: user.username });
  }catch(e){ res.status(400).json({ error: e.message }); }
}

async function login(req, res){
  try{
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if(!user) return res.status(400).json({ error:'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if(!ok) return res.status(400).json({ error:'Invalid credentials' });
    const token = issueToken(user);
    res.cookie(security.COOKIE_NAME, token, security.COOKIE_OPTS);
    res.json({ ok: true });
  }catch(e){ res.status(400).json({ error: e.message }); }
}

async function me(req, res){
  try{
    if(!req.user) return res.status(401).json({ error:'Unauthorized' });
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    res.json({ id: user.id, email: user.email, username: user.username });
  }catch(e){ res.status(400).json({ error: e.message }); }
}

async function logout(req, res){
  res.clearCookie(security.COOKIE_NAME, security.COOKIE_OPTS);
  res.json({ ok: true });
}

export default { register, login, me, logout };
