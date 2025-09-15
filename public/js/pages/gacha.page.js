
import * as http from '../api/http.js';

export async function init(){
  console.log('gacha.page.js init');
  const egg = document.getElementById('open-egg');
  const chest = document.getElementById('open-chest');
  const out = document.getElementById('gacha-result');

  const handler = (endpoint) => async () => {
    out.textContent = 'Открываем...';
    try{
      const data = await http.post('/gachas/' + endpoint, {});
      out.innerHTML = `<div>Выпало: <b>${data.spec.name}</b> (${data.spec.rarity}) — добавлено к вам. Баланс: ${data.balance}</div>`;
    }catch(e){
      out.innerHTML = `<span style="color:#ff4d4f">Ошибка: ${e.message}</span>`;
    }
  };

  egg?.addEventListener('click', handler('egg'));
  chest?.addEventListener('click', handler('chest'));
}
