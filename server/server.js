require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const authRoutes = require('./auth/auth.routes');
const usersRoutes = require('./modules/users/users.routes');
const currencyRoutes = require('./modules/currency/currency.routes');
const gachasRoutes = require('./modules/gachas/gachas.routes');
const creaturesRoutes = require('./modules/creatures/creatures.routes');
const battlesRoutes = require('./modules/battles/battles.routes');
const tasksRoutes = require('./modules/tasks/tasks.routes');
const galleryRoutes = require('./modules/gallery/gallery.routes');


const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());


// статика фронта
app.use(express.static(path.join(__dirname, '..', 'public')));


// API
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/currency', currencyRoutes);
app.use('/api/gachas', gachasRoutes);
app.use('/api/creatures', creaturesRoutes);
app.use('/api/battles', battlesRoutes);
app.use('/api/tasks', require('./modules/tasks/tasks.routes'));
app.use('/api/gallery', galleryRoutes);


// SPA/мультистраничный фронт: отдать index.html по умолчанию
app.get('*', (req, res) => {
res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`FPBOFM server running on http://localhost:${PORT}`));