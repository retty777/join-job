const products = [
  {
    id: 'rose-dawn',
    title: 'Розовый рассвет',
    flowers: ['роза', 'эвкалипт'],
    price: 3500,
    popular: 1,
    image: 'https://images.unsplash.com/photo-1509043759401-136742328bb3?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'white-classic',
    title: 'Белая классика',
    flowers: ['роза', 'альстромерия'],
    price: 4200,
    popular: 2,
    image: 'https://images.unsplash.com/photo-1509043759401-136742328bb3?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'tulip-spring',
    title: 'Весенние тюльпаны',
    flowers: ['тюльпан'],
    price: 2800,
    popular: 3,
    image: 'https://images.unsplash.com/photo-1523567941053-95a38d43f5d2?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'lavender-dream',
    title: 'Лавандовая мечта',
    flowers: ['ирис', 'лаванда'],
    price: 3900,
    popular: 4,
    image: 'https://images.unsplash.com/photo-1491002052546-bf38f186af0b?q=80&w=1200&auto=format&fit=crop'
  },
];

const cardsContainer = document.getElementById('cards');
const searchInput = document.getElementById('search');
const sortSelect = document.getElementById('sort');
const productInput = document.getElementById('product');
const form = document.getElementById('order-form');
const formStatus = document.getElementById('form-status');

function renderCards(list) {
  const fragment = document.createDocumentFragment();
  list.forEach((p) => {
    const card = document.createElement('article');
    card.className = 'card';
    const thumb = document.createElement('div');
    thumb.className = 'thumb';
    thumb.style.backgroundImage = `url(${p.image})`;

    const body = document.createElement('div');
    body.className = 'body';

    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = p.title;

    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.textContent = p.flowers.join(', ');

    const row = document.createElement('div');
    row.className = 'row';

    const price = document.createElement('div');
    price.className = 'price';
    price.textContent = `${p.price.toLocaleString('ru-RU')} ₽`;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = 'Выбрать';
    btn.addEventListener('click', () => {
      productInput.value = p.title;
      window.location.hash = '#order';
      productInput.focus();
    });

    row.append(price, btn);
    body.append(title, meta, row);
    card.append(thumb, body);
    fragment.append(card);
  });

  cardsContainer.innerHTML = '';
  cardsContainer.append(fragment);
}

function applyFilters() {
  const q = (searchInput.value || '').trim().toLowerCase();
  const sort = sortSelect.value;
  let list = products.filter((p) =>
    p.title.toLowerCase().includes(q) || p.flowers.some(f => f.includes(q))
  );

  if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
  else list.sort((a, b) => a.popular - b.popular);

  renderCards(list);
}

searchInput.addEventListener('input', applyFilters);
sortSelect.addEventListener('change', applyFilters);

renderCards(products);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  formStatus.textContent = '';

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // simple validation
  const required = ['name', 'phone', 'product', 'datetime', 'address'];
  for (const field of required) {
    if (!data[field] || String(data[field]).trim() === '') {
      formStatus.textContent = 'Пожалуйста, заполните обязательные поля.';
      return;
    }
  }

  try {
    // Mock submission. Replace URL with your backend endpoint.
    await new Promise((res) => setTimeout(res, 800));
    form.reset();
    formStatus.textContent = 'Заявка отправлена! Мы свяжемся с вами в ближайшее время.';
  } catch (err) {
    console.error(err);
    formStatus.textContent = 'Ошибка при отправке. Попробуйте ещё раз.';
  }
});