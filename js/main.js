// ── CATEGORY CARDS ──
  document.querySelectorAll('.cat-card').forEach(card => {
    card.addEventListener('click', () => {
      const target = card.dataset.href;
      if (target) document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ── NAVBAR SCROLL ──
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 10);
  });

  function updateCartBadge() {
    const badge = document.getElementById('cart-count');
    badge.textContent = cartCount;
    badge.style.display = cartCount > 0 ? 'flex' : 'none';
  }

  // ── MOBILE MENU ──
  document.getElementById('hamburger-btn').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  document.getElementById('mobile-close').addEventListener('click', closeMobile);
  function closeMobile() {
    document.getElementById('mobile-menu').classList.remove('open');
    document.body.style.overflow = '';
  }

  // ── CART ──
  let cartItems = [];
  let cartCount = 0;

  document.getElementById('cart-btn').addEventListener('click', () => {
    document.getElementById('cart-sidebar').classList.add('open');
    document.getElementById('cart-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  function closeCart() {
    document.getElementById('cart-sidebar').classList.remove('open');
    document.getElementById('cart-overlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  function addToCart(name, price, btn) {
    cartCount++;
    updateCartBadge();
    cartItems.push({ name, price });

    const empty = document.getElementById('cart-empty');
    if (empty) empty.style.display = 'none';

    const body = document.getElementById('cart-body');
    const item = document.createElement('div');
    item.className = 'cart-item';
    item.innerHTML = `
      <div class="cart-item-img">
        <img src="https://placehold.co/72x72/F7F7F5/333?text=👟" alt="${name}">
      </div>
      <div style="flex:1">
        <div class="cart-item-name">${name}</div>
        <div class="cart-item-price">${price}</div>
        <button class="cart-item-remove" onclick="this.closest('.cart-item').remove(); updateCartCount(-1);">× إزالة</button>
      </div>
    `;
    body.appendChild(item);

    updateTotal();

    btn.textContent = '✓ تمت الإضافة';
    btn.style.background = '#2a6a3a';
    setTimeout(() => {
      btn.textContent = '+ أضف للسلة';
      btn.style.background = '';
    }, 2000);
  }

  function updateCartCount(delta) {
    cartCount = Math.max(0, cartCount + delta);
    updateCartBadge();
    updateTotal();
  }

  function updateTotal() {
    const items = document.querySelectorAll('.cart-item');
    if (items.length === 0) {
      const empty = document.getElementById('cart-empty');
      if (empty) empty.style.display = '';
    }
    document.getElementById('cart-total').textContent = cartCount * 1000 + ' ج.م';
  }

  // ── PRODUCT FILTER ──
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;
      document.querySelectorAll('.pcard').forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ── COUNTDOWN TIMER ──
  const end = new Date();
  end.setDate(end.getDate() + 3);
  end.setHours(end.getHours() + 14);

  function tick() {
    const now = new Date();
    const diff = Math.max(0, end - now);
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('td').textContent = String(d).padStart(2, '0');
    document.getElementById('th').textContent = String(h).padStart(2, '0');
    document.getElementById('tm').textContent = String(m).padStart(2, '0');
    document.getElementById('ts').textContent = String(s).padStart(2, '0');
  }
  tick();
  setInterval(tick, 1000);

  // ── SCROLL REVEAL ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ── REVIEWS SCROLL ──
  const track = document.getElementById('reviews-track');
  document.getElementById('rev-next').addEventListener('click', () => {
    track.scrollBy({ left: -336, behavior: 'smooth' });
  });
  document.getElementById('rev-prev').addEventListener('click', () => {
    track.scrollBy({ left: 336, behavior: 'smooth' });
  });