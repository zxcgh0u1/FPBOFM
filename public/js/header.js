import { getProfile, logout } from '../api/auth.api.js';
import { http } from '../api/http.js';
console.log("header.js загружен");

export async function renderHeader() {
  const header = document.querySelector('header');
  if (!header) return;

  try {
    const user = await getProfile();

    header.innerHTML = `
      <div class="logo">FPBOFM</div>
      <nav>
        <a href="gacha.html">Гача</a>
        <a href="creatures.html">Существа</a>
        <a href="battles.html">Бои</a>
        <a href="tasks.html">Ежедневки</a>
        <a href="gallery.html">Галерея</a>
        <a href="profile.html">Личный кабинет</a>
        <a href="admin.html">Админ</a>
        <span class="user-info">💰 ${user.wallet.balance} монет</span>
        <a href="#" id="logout">Выйти</a>
      </nav>
    `;

    document.querySelector('#logout').addEventListener('click', (e) => {
      e.preventDefault();
      logout();
      window.location.href = 'login.html';
    });
  } catch {
    header.innerHTML = `
      <div class="logo">FPBOFM</div>
      <nav>
        <a href="login.html">Войти</a>
        <a href="register.html">Регистрация</a>
      </nav>
    `;
  }
}
