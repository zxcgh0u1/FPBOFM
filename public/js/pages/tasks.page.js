
import * as http from '../api/http.js';

export async function init(){
  console.log('tasks.page.js init');
  const list = document.getElementById('tasks-list');
  const daily = document.getElementById('claim-daily');

  daily?.addEventListener('click', async () => {
    try{
      const r = await http.post('/tasks/daily', {});
      alert(`+${r.reward} монет!`);
      await load();
    }catch(e){
      alert('Ошибка: ' + e.message);
    }
  });

  async function load(){
    try{
      const tasks = await http.get('/tasks');
      list.innerHTML = tasks.map(t => `<div class="card">${t.title} — ${t.done ? '✅' : '⏳'} (награда: ${t.reward})</div>`).join('');
    }catch(e){
      list.innerHTML = `<span style="color:#ff4d4f">${e.message}</span>`;
    }
  }
  await load();
}
