
import * as http from '../api/http.js';
import { $ } from '../utils/dom.js';

export async function init(){
  console.log('register.page.js init');
  const form = $('#register-form');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    try{
      await http.post('/auth/register', {
        email: fd.get('email'),
        username: fd.get('username'),
        password: fd.get('password')
      });
      location.href = '/login.html';
    }catch(err){
      alert('Ошибка: ' + err.message);
    }
  });
}
