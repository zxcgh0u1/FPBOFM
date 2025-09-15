
import * as http from '../api/http.js';

export async function init(){
  console.log('gallery.page.js init');
  const list = document.getElementById('gallery-list');
  try{
    const items = await http.get('/gallery');
    list.innerHTML = items.map(g => `
      <div class="card">
        <b>${g.name}</b> — ${g.rarity}<br/>
        <small>HP: ${g.baseHP}, ATK: ${g.baseATK}, DEF: ${g.baseDEF}</small>
      </div>
    `).join('');
  }catch(e){
    list.innerHTML = `<span style="color:#ff4d4f">${e.message}</span>`;
  }
}
