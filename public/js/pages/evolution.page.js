import * as http from '../api/http.js';

export async function init() {
  const list = document.getElementById('creatures-list');
  const baseSlot = document.getElementById('base-slot');
  const fodderSlot = document.getElementById('fodder-slot');
  const evolveBtn = document.getElementById('evolve-btn');

  let baseId = null;
  let fodderId = null;

  try {
    const creatures = await http.get('/creatures');
    if (!creatures.length) {
      list.innerHTML = `<p>Нет существ для эволюции</p>`;
      return;
    }

    list.innerHTML = creatures.map(c => `
      <div class="creature-card" data-id="${c.id}">
        <h3>${c.spec.name} ${'★'.repeat(c.stars)}</h3>
        <p>LVL: ${c.level}</p>
        <p>${c.spec.rarity}</p>
        <button class="select-btn">Выбрать</button>
      </div>
    `).join('');

    list.querySelectorAll('.select-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.closest('.creature-card').dataset.id;
        const name = btn.closest('.creature-card').querySelector('h3').innerText;

        if (!baseId) {
          baseId = id;
          baseSlot.innerText = `Базовое: ${name}`;
        } else if (!fodderId && id !== baseId) {
          fodderId = id;
          fodderSlot.innerText = `Кормовое: ${name}`;
        }

        evolveBtn.disabled = !(baseId && fodderId);
      });
    });

    evolveBtn.addEventListener('click', async () => {
      try {
        const res = await http.post('/creatures/upgrade-stars', { baseId, fodderId });
        alert(`✅ ${res.spec.name} теперь ${'★'.repeat(res.stars)}`);
        location.reload();
      } catch (e) {
        alert(`Ошибка: ${e.message}`);
      }
    });
  } catch (e) {
    list.innerHTML = `<p style="color:red">Ошибка: ${e.message}</p>`;
  }
}
