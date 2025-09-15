
import * as http from '../api/http.js';

export async function init(){
  console.log('creatures.page.js init');
  const list = document.getElementById('creatures-list');
  if (!list) return;

  try{
    const creatures = await http.get('/creatures');
    console.log('creatures:', creatures);
    if(!creatures.length){
      list.innerHTML = '<p>Пока пусто. Откройте яйцо в гаче!</p>';
      return;
    }
    list.innerHTML = creatures.map(c => `
      <div class="creature-card">
        <h3>${c.spec.name} (${c.stars}★)</h3>
        <p>Редкость: ${c.spec.rarity}</p>
        <p>HP: ${c.spec.baseHP}, ATK: ${c.spec.baseATK}, DEF: ${c.spec.baseDEF}</p>
        <button class="btn upgrade" data-id="${c.id}">📈 Прокачать</button>
      </div>
    `).join('');

    list.querySelectorAll('.upgrade').forEach(btn => {
      btn.addEventListener('click', async () => {
        try{
          const updated = await http.post('/creatures/upgrade', { creatureId: btn.dataset.id });
          alert(`✅ ${updated.spec.name} теперь ${updated.stars}★`);
          location.reload();
        }catch(e){
          alert(`Ошибка: ${e.message}`);
        }
      });
    });
  }catch(e){
    list.innerHTML = `<p style="color:#ff4d4f">Ошибка: ${e.message}</p>`;
  }
}
