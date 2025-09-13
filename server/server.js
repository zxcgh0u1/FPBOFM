const path = require('path');
const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

// статика
app.use(express.static(path.join(__dirname, '..', 'public')));

// API-модули
app.use('/api/auth', require('./auth/auth.routes'));
app.use('/api/users', require('./modules/users/users.routes'));
app.use('/api/gallery', require('./modules/gallery/gallery.routes'));
app.use('/api/tasks', require('./modules/tasks/tasks.routes'));
app.use('/api/currency', require('./modules/currency/currency.routes'));
app.use('/api/creatures', require('./modules/creatures/creatures.routes'));
app.use('/api/gachas', require('./modules/gachas/gachas.routes'));
app.use('/api/battles', require('./modules/battles/battles.routes'));

// single-page навигация простая (если нужно)
app.get('/', (_, res) => res.sendFile(path.join(__dirname, '..', 'public', 'index.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`FPBOFM server running on http://localhost:${PORT}`));
