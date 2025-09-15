
import jwt from 'jsonwebtoken';
import { security } from '../config/security.js';

export function authMiddleware(req, res, next){
  try{
    const h = req.headers.authorization;
    const token = (req.cookies && req.cookies[security.COOKIE_NAME]) ||
                  (h && h.startsWith('Bearer ') ? h.slice(7) : null);
    if(!token) return res.status(401).json({ error: 'Unauthorized' });
    const payload = jwt.verify(token, security.JWT_SECRET);
    req.user = { id: payload.sub, email: payload.email };
    next();
  }catch(e){
    res.status(401).json({ error: 'Unauthorized' });
  }
}
