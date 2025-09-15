
import * as http from '../api/http.js';
import { $ } from '../utils/dom.js';

export async function init(){
  console.log('battles.page.js init');
  const btn = $('#start-battle');
  const input = $('#opponent-id');
  const list = document.getElementById('battle-history');

  btn?.addEventListener('click', async () => {
    try{
      const data = await http.post('/battles/start', { opponentId: input.value.trim() });
      alert(`Победитель: ${data.winnerId === data.aId ? 'Вы' : 'Соперник'}`);
      await load();
    }catch(e){
      alert('Ошибка: ' + e.message);
    }
  });

  async function load(){
    try{
      const hist = await http.get('/battles/history');
      list.innerHTML = hist.map(b => `<div class="card">Бой: ${b.aId} vs ${b.bId}. Победил: ${b.winnerId}</div>`).join('');
    }catch(e){
      list.innerHTML = `<span style="color:#ff4d4f">${e.message}</span>`;
    }
  }

  await load();
}
