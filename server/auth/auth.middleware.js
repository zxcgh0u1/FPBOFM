const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ message: 'Требуется авторизация' });

  const token = header.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Требуется авторизация' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: 'Недействительный токен' });
  }
}

module.exports = { authMiddleware };
