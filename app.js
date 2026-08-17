/* ==========================================================
   MB SPORT EIRL — CATERPILLAR CATALOG JAVASCRIPT
   ========================================================== */

const WHATSAPP_PHONE = '51933412395'; // +51 933 412 395

const CATALOG = [
  {
    id: 'cat-second-shift-honey',
    name: 'Second Shift Steel Toe (Honey)',
    category: 'st',
    type: 'Punta de Acero · ST',
    price: 489.00,
    oldPrice: 569.00,
    image: 'images/second_shift_honey.jpg',
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    specs: [
      'Puntera de acero ASTM F2413-18',
      'Protección EH contra circuitos abiertos',
      'Cuero Full Grain Oil Nobuck repelente al agua',
      'Construcción Goodyear Welt de alta resistencia'
    ]
  },
  {
    id: 'cat-second-shift-darkbrown',
    name: 'Second Shift ST (Dark Brown)',
    category: 'st',
    type: 'Punta de Acero · ST',
    price: 489.00,
    oldPrice: 569.00,
    image: 'images/second_shift_darkbrown.jpg',
    sizes: ['39', '40', '41', '42', '43', '44'],
    specs: [
      'Punta de acero certificada ASTM F2413-18',
      'Suela de goma T3 resistente a hidrocarburos',
      'Cuero engrasado Dark Brown de alto calibre',
      'Forro de malla de nylon transpirable'
    ]
  },
  {
    id: 'cat-invader-hi',
    name: 'Invader Hi ST Black / Yellow',
    category: 'st',
    type: 'Punta de Acero · ST',
    price: 529.00,
    oldPrice: 620.00,
    image: 'images/invader_hi.jpg',
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    specs: [
      'Puntera de acero de perfil industrial agresivo',
      'Suela todoterreno de tracción Caterpillar',
      'Plantilla acolchada Rebound para jornadas largas',
      'Construcción cementada flexible y resistente'
    ]
  },
  {
    id: 'cat-streamline-ct',
    name: 'Streamline 2.0 Composite Toe',
    category: 'ct',
    type: 'Punta Composite · CT',
    price: 519.00,
    oldPrice: 599.00,
    image: 'images/streamline_ct.jpg',
    sizes: ['39', '40', '41', '42', '43'],
    specs: [
      'Puntera Composite no metálica ultra ligera',
      'Diseño sneaker deportivo de alta flexibilidad',
      'Entresuela DUOFUSE con amortiguación premium',
      '100% libre de metales para arcos detectores'
    ]
  },
  {
    id: 'cat-munising-wp',
    name: 'Munising 6" WP Composite Toe',
    category: 'waterproof',
    subCategory: 'ct',
    type: 'Waterproof · Composite Toe',
    price: 589.00,
    oldPrice: 690.00,
    image: 'images/munising_wp.jpg',
    sizes: ['39', '40', '41', '42', '43', '44'],
    specs: [
      'Membrana Waterproof impermeable sellada',
      'Punta Composite ligera no magnética',
      'Tecnología EASE para absorción de impactos',
      'Suela antideslizante Slip Resistant CAT'
    ]
  },
  {
    id: 'cat-excavator-xl',
    name: 'Excavator XL 6" WP Composite',
    category: 'waterproof',
    subCategory: 'ct',
    type: 'Waterproof · Heavy Duty',
    price: 649.00,
    oldPrice: 750.00,
    image: 'images/excavator_xl.jpg',
    sizes: ['40', '41', '42', '43', '44'],
    specs: [
      'Construcción SuperDuty XL de ultra durabilidad',
      'Impermeabilidad total con sellado de costuras',
      'Puntera Composite con refuerzo exterior de goma',
      'Aislante térmico Thinsulate y suela vibram-grade'
    ]
  },
  {
    id: 'cat-colorado-classic',
    name: 'Colorado 2.0 Classic Boot (Honey)',
    category: 'urban',
    type: 'Línea Urbana · Clásica',
    price: 439.00,
    oldPrice: 519.00,
    image: 'images/colorado_classic.jpg',
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    specs: [
      'Ícono mundial del calzado Caterpillar',
      'Cuero Nobuck premium color amarillo CAT',
      'Cuello acolchado para confort en el tobillo',
      'Suela de goma moldeada de máxima duración'
    ]
  },
  {
    id: 'cat-intruder-sneaker',
    name: 'Intruder Chunky Sneaker CAT',
    category: 'urban',
    type: 'Línea Urbana · Streetwear',
    price: 419.00,
    oldPrice: 489.00,
    image: 'images/intruder_sneaker.jpg',
    sizes: ['38', '39', '40', '41', '42', '43'],
    specs: [
      'Diseño Chunky emblemático de Caterpillar',
      'Capellada combinada de nobuck y malla transpirable',
      'Suela de plataforma con tacos de tracción gruesos',
      'Estilo urbano de alta tendencia internacional'
    ]
  }
];

// State
let cart = [];
let activeCategory = 'all';
let searchQuery = '';
let currentSort = 'featured';
let cardSizes = {};
let deliveryMode = 'lima';

// Init
document.addEventListener('DOMContentLoaded', () => {
  try {
    const saved = localStorage.getItem('mb_cart_light');
    if (saved) cart = JSON.parse(saved);
  } catch (e) { }

  CATALOG.forEach(p => { cardSizes[p.id] = p.sizes[0]; });
  updateTabCounts();
  renderCatalog();
  updateCartUI();
});

function fmt(n) {
  return 'S/ ' + Number(n).toFixed(2);
}

function updateTabCounts() {
  document.getElementById('cnt-all').textContent = CATALOG.length;
  document.getElementById('cnt-st').textContent = CATALOG.filter(p => p.category === 'st').length;
  document.getElementById('cnt-ct').textContent = CATALOG.filter(p => p.category === 'ct' || p.subCategory === 'ct').length;
  document.getElementById('cnt-urban').textContent = CATALOG.filter(p => p.category === 'urban').length;
  document.getElementById('cnt-wp').textContent = CATALOG.filter(p => p.category === 'waterproof').length;
}

function renderCatalog() {
  const grid = document.getElementById('productGrid');
  let filtered = CATALOG.filter(p => {
    let matchCat = (activeCategory === 'all')
      || (activeCategory === 'st' && p.category === 'st')
      || (activeCategory === 'ct' && (p.category === 'ct' || p.subCategory === 'ct'))
      || (activeCategory === 'urban' && p.category === 'urban')
      || (activeCategory === 'waterproof' && p.category === 'waterproof');

    let matchSearch = true;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      matchSearch = p.name.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        p.sizes.some(s => s.includes(q));
    }
    return matchCat && matchSearch;
  });

  if (currentSort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  else if (currentSort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  else if (currentSort === 'name-asc') filtered.sort((a, b) => a.name.localeCompare(b.name));

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-msg">
        <p style="font-size: 14px; font-weight: 600; color: var(--text-main);">No se encontraron modelos con los filtros seleccionados.</p>
        <button class="btn-secondary" style="margin-top: 12px;" onclick="resetFilters()">Ver todo el calzado</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(p => {
    const selSize = cardSizes[p.id] || p.sizes[0];
    return `
      <div class="product-card" id="card-${p.id}">
        <!-- Clean Photo without badges -->
        <div class="product-photo-wrap" onclick="openQv('${p.id}')">
          <img src="${p.image}" alt="${p.name}" class="product-photo" onerror="this.src='images/second_shift_honey.jpg'">
        </div>

        <div class="product-content">
          <div class="product-title" onclick="openQv('${p.id}')">${p.name}</div>
          
          <div class="product-specs-summary">
            <span>${p.specs[0]}</span>
            <span>${p.specs[1]}</span>
          </div>

          <div class="size-block">
            <div class="size-header">
              <span>Talla: <strong>${selSize}</strong></span>
              <span style="cursor: pointer; text-decoration: underline;" onclick="openSizeModal()">Equivalencia</span>
            </div>
            <div class="size-pill-row">
              ${p.sizes.map(sz => `
                <button type="button" class="size-box ${sz === selSize ? 'active' : ''}" onclick="selectCardSize('${p.id}', '${sz}')">
                  ${sz}
                </button>
              `).join('')}
            </div>
          </div>

          <div class="product-card-bottom">
            <div class="price-display">
              <span class="price-main">${fmt(p.price)}</span>
              ${p.oldPrice ? `<span class="price-old">${fmt(p.oldPrice)}</span>` : ''}
            </div>
            <button class="btn-add-card" onclick="addToCart('${p.id}')">
              <i class="fa-solid fa-cart-shopping"></i>
              <span>Pedir</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function selectCardSize(prodId, sz) {
  cardSizes[prodId] = sz;
  renderCatalog();
}

function filterCat(cat, el) {
  activeCategory = cat;
  document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
  if (el) {
    el.classList.add('active');
  } else {
    document.querySelectorAll('.cat-tab').forEach(t => {
      if (t.textContent.toLowerCase().includes(cat === 'st' ? 'acero' : (cat === 'ct' ? 'composite' : (cat === 'urban' ? 'urbano' : (cat === 'waterproof' ? 'waterproof' : 'todos'))))) {
        t.classList.add('active');
      }
    });
  }
  renderCatalog();
}

function handleSearch(q) {
  searchQuery = q;
  const mainInput = document.getElementById('searchInput');
  if (mainInput && mainInput.value !== q) mainInput.value = q;
  renderCatalog();
}

function handleSort(val) {
  currentSort = val;
  renderCatalog();
}

function resetFilters() {
  activeCategory = 'all';
  searchQuery = '';
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
  document.querySelector('.cat-tab').classList.add('active');
  renderCatalog();
}

/* Cart Operations */
function addToCart(prodId) {
  const prod = CATALOG.find(p => p.id === prodId);
  if (!prod) return;
  const size = cardSizes[prodId] || prod.sizes[0];

  const exist = cart.find(item => item.id === prodId && item.size === size);
  if (exist) {
    exist.qty += 1;
  } else {
    cart.push({
      id: prod.id,
      name: prod.name,
      price: prod.price,
      image: prod.image,
      size: size,
      qty: 1
    });
  }
  saveCart();
  updateCartUI();
  openCart();
}

function changeQty(idx, delta) {
  if (!cart[idx]) return;
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  saveCart();
  updateCartUI();
}

function deleteCartItem(idx) {
  cart.splice(idx, 1);
  saveCart();
  updateCartUI();
}

function saveCart() {
  try {
    localStorage.setItem('mb_cart_light', JSON.stringify(cart));
  } catch (e) { }
}

function updateCartUI() {
  const count = cart.reduce((a, b) => a + b.qty, 0);
  const subtotal = cart.reduce((a, b) => a + (b.price * b.qty), 0);

  const badge = document.getElementById('cartCountBadge');
  if (badge) badge.textContent = count;
  const mobCount = document.getElementById('mobileBarCount');
  if (mobCount) mobCount.textContent = count;
  const mobTotal = document.getElementById('mobileBarTotal');
  if (mobTotal) mobTotal.textContent = fmt(subtotal);

  const scroll = document.getElementById('cartItemsScroll');
  const bottom = document.getElementById('cartBottomArea');

  if (!scroll || !bottom) return;

  if (cart.length === 0) {
    scroll.innerHTML = `
      <div style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
        <i class="fa-solid fa-cart-shopping" style="font-size: 28px; margin-bottom: 8px; color: var(--text-subtle);"></i>
        <p style="font-size: 13px;">No hay calzado en tu pedido</p>
      </div>
    `;
    bottom.style.display = 'none';
  } else {
    bottom.style.display = 'flex';
    scroll.innerHTML = cart.map((item, i) => `
      <div class="cart-row">
        <img src="${item.image}" alt="${item.name}" class="cart-row-img" onerror="this.src='images/second_shift_honey.jpg'">
        <div>
          <div class="cart-row-name">${item.name}</div>
          <div class="cart-row-meta">Talla: ${item.size}</div>
          <div class="cart-row-price">${fmt(item.price)}</div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 6px;">
          <button class="btn-trash" onclick="deleteCartItem(${i})"><i class="fa-regular fa-trash-can"></i></button>
          <div class="qty-ctrl">
            <button class="qty-btn-sm" onclick="changeQty(${i}, -1)">-</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn-sm" onclick="changeQty(${i}, 1)">+</button>
          </div>
        </div>
      </div>
    `).join('');

    document.getElementById('cartSubtotalVal').textContent = fmt(subtotal);
    document.getElementById('cartTotalVal').textContent = fmt(subtotal);
  }
}

function openCart() {
  document.getElementById('cartBackdrop').classList.add('open');
  document.getElementById('cartPanel').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartBackdrop').classList.remove('open');
  document.getElementById('cartPanel').classList.remove('open');
  document.body.style.overflow = '';
}

/* Quick View */
let qvItem = null;
let qvSize = null;

function openQv(id) {
  const item = CATALOG.find(p => p.id === id);
  if (!item) return;
  qvItem = item;
  qvSize = cardSizes[id] || item.sizes[0];

  const layout = document.getElementById('qvLayout');
  layout.innerHTML = `
    <div class="qv-photo-side">
      <img src="${item.image}" alt="${item.name}" onerror="this.src='images/second_shift_honey.jpg'">
    </div>
    <div class="qv-body-side">
      <div style="font-size: 11px; color: #D97706; font-weight: 700; text-transform: uppercase;">${item.type} · 100% Original</div>
      <div class="product-title" style="font-size: 17px;">${item.name}</div>
      <div style="font-size: 19px; font-weight: 800; color: var(--text-main);">${fmt(item.price)}</div>

      <div>
        <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px; font-weight: 600;">
          Talla: <strong style="color: var(--text-main);">${qvSize}</strong>
        </div>
        <div class="size-pill-row">
          ${item.sizes.map(sz => `
            <button class="size-box ${sz === qvSize ? 'active' : ''}" onclick="setQvSize('${sz}')">
              ${sz}
            </button>
          `).join('')}
        </div>
      </div>

      <div style="font-size: 12px; color: var(--text-body); line-height: 1.5; border-top: 1px solid var(--border-light); padding-top: 10px;">
        <strong style="color: var(--text-main); display: block; margin-bottom: 4px;">Ficha de Seguridad:</strong>
        ${item.specs.map(s => `<div>• ${s}</div>`).join('')}
      </div>

      <button class="btn-primary" style="margin-top: 6px; justify-content: center;" onclick="addQvToCart()">
        <span>Agregar al Pedido</span>
      </button>
    </div>
  `;

  document.getElementById('qvModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function setQvSize(sz) {
  qvSize = sz;
  if (qvItem) cardSizes[qvItem.id] = sz;
  openQv(qvItem.id);
  renderCatalog();
}

function addQvToCart() {
  if (qvItem) {
    addToCart(qvItem.id);
    closeQv();
  }
}

function closeQv() {
  document.getElementById('qvModal').classList.remove('open');
  document.body.style.overflow = '';
}

/* Checkout */
function openCheckout() {
  if (cart.length === 0) return;
  closeCart();
  document.getElementById('checkoutModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  document.getElementById('checkoutModal').classList.remove('open');
  document.body.style.overflow = '';
}

function setDelivery(mode, el) {
  deliveryMode = mode;
  document.querySelectorAll('.delivery-tab').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');

  const lbl = document.getElementById('addressFieldLabel');
  const inp = document.getElementById('orderAddress');
  if (mode === 'lima') {
    lbl.textContent = 'Dirección de Entrega en Lima *';
    inp.placeholder = 'Distrito, Calle, Número, Dpto.';
  } else if (mode === 'provincia') {
    lbl.textContent = 'Ciudad y Agencia de Preferencia *';
    inp.placeholder = 'Ej: Trujillo - Agencia Shalom Av. América o Domicilio';
  } else {
    lbl.textContent = 'Coordinación de Recojo *';
    inp.placeholder = 'Coordinar en almacén';
  }
}

function handleSendOrder(e) {
  e.preventDefault();
  if (cart.length === 0) return;

  const name = document.getElementById('orderName').value.trim();
  const phone = document.getElementById('orderPhone').value.trim();
  const doc = document.getElementById('orderDoc').value.trim() || 'No indicado';
  const addr = document.getElementById('orderAddress').value.trim();
  const pay = document.getElementById('orderPayment').value;
  const subtotal = cart.reduce((a, b) => a + (b.price * b.qty), 0);

  const delivText = deliveryMode === 'lima' ? 'Contraentrega Lima' : (deliveryMode === 'provincia' ? 'Envío Provincia (Shalom/Olva)' : 'Recojo Almacén');

  let msg = `Hola Martin Benites (Import MB Sport EIRL),\n`;
  msg += `Deseo confirmar el siguiente pedido de calzado Caterpillar:\n\n`;
  msg += `DETALLE DEL PEDIDO:\n`;
  cart.forEach((c, idx) => {
    msg += `${idx + 1}. ${c.name} | Talla: ${c.size} | Cant: ${c.qty} | Sub: ${fmt(c.price * c.qty)}\n`;
  });
  msg += `\nTOTAL: ${fmt(subtotal)}\n`;
  msg += `----------------------------\n`;
  msg += `CLIENTE: ${name}\n`;
  msg += `TELÉFONO: ${phone}\n`;
  msg += `DNI/RUC: ${doc}\n`;
  msg += `ENTREGA: ${delivText}\n`;
  msg += `DIRECCIÓN: ${addr}\n`;
  msg += `PAGO: ${pay}\n`;
  msg += `----------------------------\n`;
  msg += `Quedo atento a la confirmación del despacho.`;

  const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;

  cart = [];
  saveCart();
  updateCartUI();
  closeCheckout();
  window.open(url, '_blank');
}

function openSizeModal() {
  document.getElementById('sizeModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSizeModal() {
  document.getElementById('sizeModal').classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOnBg(e, id) {
  if (e.target.id === id) {
    document.getElementById(id).classList.remove('open');
    document.body.style.overflow = '';
  }
}

function toggleFaq(el) {
  const parent = el.parentElement;
  const active = parent.classList.contains('active');
  document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('active'));
  if (!active) parent.classList.add('active');
}
