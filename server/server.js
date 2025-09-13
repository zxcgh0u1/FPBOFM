const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware: правильные заголовки для js и css
app.use((req, res, next) => {
  if (req.path.endsWith('.js')) {
    res.type('application/javascript');
  }
  if (req.path.endsWith('.css')) {
    res.type('text/css');
  }
  next();
});

// ✅ Раздаём статические файлы из public
app.use(express.static(path.join(__dirname, '../public')));

// ✅ API (твои роуты)
app.use('/api/auth', require('./auth/auth.routes'));
app.use('/api/battles', require('./modules/battles/battles.routes'));
app.use('/api/creatures', require('./modules/creatures/creatures.routes'));
app.use('/api/currency', require('./modules/currency/currency.routes'));
app.use('/api/gachas', require('./modules/gachas/gachas.routes'));
app.use('/api/gallery', require('./modules/gallery/gallery.routes'));
app.use('/api/tasks', require('./modules/tasks/tasks.routes'));
app.use('/api/users', require('./modules/users/users.routes'));

// ✅ Старт сервера
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
