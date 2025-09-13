const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { prisma } = require('../db/client');


function sign(user) {
const payload = { id: user.id, username: user.username };
return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || '7d' });
}


exports.register = async (req, res) => {
const { email, username, password } = req.body;
if (!email || !username || !password) return res.status(400).json({ message: 'Заполните все поля' });
const exists = await prisma.user.findFirst({ where: { OR: [{ email }, { username }] } });
if (exists) return res.status(409).json({ message: 'Email или ник уже заняты' });
const passwordHash = await bcrypt.hash(password, 10);
const user = await prisma.user.create({ data: { email, username, passwordHash, wallet: { create: { balance: Number(process.env.ECON_START_BALANCE || 1000) } } } });
res.json({ token: sign(user) });
};


exports.login = async (req, res) => {
const { email, password } = req.body;
const user = await prisma.user.findUnique({ where: { email }, include: { wallet: true } });
if (!user) return res.status(401).json({ message: 'Неверные данные' });
const ok = await bcrypt.compare(password, user.passwordHash);
if (!ok) return res.status(401).json({ message: 'Неверные данные' });
res.json({ token: sign(user) });
};


exports.me = async (req, res) => {
const me = await prisma.user.findUnique({ where: { id: req.user.id }, include: { wallet: true } });
res.json(me);
};