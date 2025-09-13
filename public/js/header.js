import { store } from '/js/state/store.js';

export function renderHeader() {
  const header = document.querySelector('.topbar');
  if (!header) return;

  const user = store.user;

  header.innerHTML = `
    <a class="logo" href="/">FPBOFM</a>
    <nav>
      <a href="/gacha.html">Гача</a>
      <a href="/creatures.html">Существа</a>
      <a href="/battles.html">Бои</a>
      <a href="/tasks.html">Ежедневки</a>
      <a href="/gallery.html">Галерея</a>
      <a href="/profile.html">Личный кабинет</a>
      ${user ? `<a href="#" id="logout-link">Выйти</a>` : `<a href="/login.html">Войти</a>`}
    </nav>
  `;

  const logoutLink = document.getElementById('logout-link');
  if (logoutLink) {
    logoutLink.addEventListener('click', e => {
      e.preventDefault();
      localStorage.removeItem('token');
      location.href = '/login.html';
    });
  }
}
