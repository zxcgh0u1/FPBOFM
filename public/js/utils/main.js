
import { renderHeader } from './header.js';
import { init as initIndex } from '../pages/index.page.js';
import { init as initGacha } from '../pages/gacha.page.js';
import { init as initCreatures } from '../pages/creatures.page.js';
import { init as initBattles } from '../pages/battles.page.js';
import { init as initTasks } from '../pages/tasks.page.js';
import { init as initGallery } from '../pages/gallery.page.js';
import { init as initProfile } from '../pages/profile.page.js';
import { init as initLogin } from '../pages/login.page.js';
import { init as initRegister } from '../pages/register.page.js';

renderHeader();

const page = document.body.dataset.page;
const inits = {
  index: initIndex,
  gacha: initGacha,
  creatures: initCreatures,
  battles: initBattles,
  tasks: initTasks,
  gallery: initGallery,
  profile: initProfile,
  login: initLogin,
  register: initRegister,
  admin: () => {}
};

if (inits[page]) {
  inits[page]().catch(err => console.error(err));
}
