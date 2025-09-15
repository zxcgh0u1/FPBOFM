import * as http from '../api/http.js';

export async function init() {
  console.log('gallery.page.js init');
  const list = document.getElementById('gallery-list');
  try {
    const items = await http.get('/gallery');
    list.innerHTML = items.map(g => {
      const c = g.spec; // теперь правильно
      return `
        <div class="card">
          <b>${c.name}</b> — ${c.rarity}<br/>
          <small>HP: ${c.baseHP}, ATK: ${c.baseATK}, DEF: ${c.baseDEF}</small>
        </div>
      `;
    }).join('');
  } catch (e) {
    list.innerHTML = `<span style="color:#ff4d4f">${e.message}</span>`;
  }
}
