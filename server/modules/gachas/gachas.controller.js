const svc = require('./gachas.service');
const { prisma } = require('../../db/client');

async function respond(inst, res) {
  const spec = await prisma.creatureSpec.findUnique({ where: { id: inst.specId } });
  res.json({ instanceId: inst.id, name: spec.name, rarity: spec.rarity, imageUrl: spec.imageUrl || null });
}

exports.openEgg = async (req, res) => {
  try { const { instance } = await svc.openEgg(req.user.id); await respond(instance, res); }
  catch (e) { res.status(400).json({ message: e.message }); }
};

exports.openChest = async (req, res) => {
  try { const { instance } = await svc.openChest(req.user.id); await respond(instance, res); }
  catch (e) { res.status(400).json({ message: e.message }); }
};
