
import * as http from '../api/http.js';
import { $ } from '../utils/dom.js';

export async function init(){
  console.log('login.page.js init');
  const form = $('#login-form');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    try{
      await http.post('/auth/login', {
        email: fd.get('email'),
        password: fd.get('password')
      });
      location.href = '/index.html';
    }catch(err){
      alert('Ошибка: ' + err.message);
    }
  });
}
