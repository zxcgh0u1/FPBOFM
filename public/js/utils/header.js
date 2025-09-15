
import * as http from '../api/http.js';

export async function renderHeader(){
  const header = document.getElementById('app-header');
  const me = await http.get('/auth/me').catch(()=>null);

  header.innerHTML = `
  <nav class="nav">
    <div class="logo">🐍 FPBOFM</div>
    <div class="menu">
      <a href="/index.html">Главная</a>
      <a href="/gacha.html">Гача</a>
      <a href="/creatures.html">Существа</a>
      <a href="/battles.html">Бои</a>
      <a href="/tasks.html">Задания</a>
      <a href="/gallery.html">Галерея</a>
      <a href="/profile.html">Профиль</a>
      ${me ? '<a id="logout" href="#">Выйти</a>' : '<a href="/login.html">Войти</a>'}
    </div>
  </nav>`;

  const path = location.pathname;
  header.querySelectorAll('.menu a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  const logout = header.querySelector('#logout');
  if (logout) {
    logout.addEventListener('click', async (e) => {
      e.preventDefault();
      await http.post('/auth/logout', {});
      location.href = '/login.html';
    });
  }
}
