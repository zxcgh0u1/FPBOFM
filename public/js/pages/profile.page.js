
import * as http from '../api/http.js';

export async function init(){
  console.log('profile.page.js init');
  const box = document.getElementById('profile-box');
  try{
    const me = await http.get('/auth/me');
    const wallet = await http.get('/currency/wallet').catch(()=>({balance:'?'}));
    box.innerHTML = `
      <div><b>${me.username}</b> (${me.email})</div>
      <div>Баланс: ${wallet.balance}</div>
    `;
  }catch(e){
    box.innerHTML = `<span style="color:#ff4d4f">Ошибка профиля: ${e.message}</span>`;
  }
}
