
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './auth/auth.routes.js';
import creaturesRoutes from './modules/creatures/creatures.routes.js';
import gachasRoutes from './modules/gachas/gachas.routes.js';
import galleryRoutes from './modules/gallery/gallery.routes.js';
import tasksRoutes from './modules/tasks/tasks.routes.js';
import battlesRoutes from './modules/battles/battles.routes.js';
import currencyRoutes from './modules/currency/currency.routes.js';
import usersRoutes from './modules/users/users.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cookieParser());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/creatures', creaturesRoutes);
app.use('/api/gachas', gachasRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/battles', battlesRoutes);
app.use('/api/currency', currencyRoutes);
app.use('/api/users', usersRoutes);

// static
app.use(express.static(path.join(__dirname, '../public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
