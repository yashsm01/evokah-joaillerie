/* app.js — Evokah Joaillerie */
'use strict';

// ── PRODUCT DATA (extracted from Ecksand collection) ──────────────
const PRODUCTS = [
  {
    id: 1,
    name: 'Love Knot Bezel-Set Yellow Diamond Engagement Ring',
    category: 'Love Knot',
    tag: 'New Arrival',
    style: 'knot',
    basePrice: 12660,
    metals: ['yellow-gold'],
    shapes: ['Lab-grown', 'Natural'],
    img: 'https://ecksand.com/cdn/shop/files/45609_p_14961261576560_img_66500335403376_love-knot-bezel-set-yellow-diamond-engagement-ring.png',
    priceGroup: 'over10000',
  },
  {
    id: 2,
    name: 'Diamond Engagement Ring with Side Diamonds and Secret Heart',
    category: 'Secret Heart',
    tag: 'Bestseller',
    style: 'halo',
    basePrice: 6471,
    metals: ['yellow-gold', 'white-gold', 'rose-gold', 'platinum'],
    shapes: ['Oval'],
    img: 'https://ecksand.com/cdn/shop/files/ecksand-45608-y-7.36-ring.png',
    priceGroup: '5000-10000',
  },
  {
    id: 3,
    name: 'Hidden Cluster Halo Diamond Engagement Ring',
    category: 'Cluster Halo',
    tag: '',
    style: 'cluster',
    basePrice: 11509,
    metals: ['yellow-gold', 'white-gold', 'platinum'],
    shapes: ['Emerald'],
    img: 'https://ecksand.com/cdn/shop/files/45610_p_14961257120112_img_66500058677616_hidden-cluster-halo-diamond-engagement-ring.png',
    priceGroup: 'over10000',
  },
  {
    id: 4,
    name: 'Diamond Engagement Ring with Cathedral Setting and Hidden Diamond',
    category: 'Cathedral',
    tag: '',
    style: 'solitaire',
    basePrice: 3681,
    metals: ['yellow-gold', 'white-gold', 'rose-gold', 'platinum'],
    shapes: ['Oval', 'Round', 'Pear', 'Emerald', 'Cushion', 'Princess'],
    img: 'https://ecksand.com/cdn/shop/files/ecksand-30958-y-1.00-oval-diamond-ring_3790eef0-ed8c-4e51-b1c8-7d0081e01a2a.png',
    priceGroup: '3000-5000',
  },
  {
    id: 5,
    name: 'Hidden Diamond Halo Engagement Ring',
    category: 'Hidden Halo',
    tag: 'Popular',
    style: 'halo',
    basePrice: 3184,
    metals: ['yellow-gold', 'white-gold', 'rose-gold', 'platinum'],
    shapes: ['Round', 'Oval', 'Pear', 'Marquise', 'Princess', 'Cushion'],
    img: 'https://ecksand.com/cdn/shop/files/43668_p_14624095011184_img_67122937168240_hidden-diamond-halo-engagement-ring.png',
    priceGroup: '3000-5000',
  },
  {
    id: 6,
    name: 'Hidden Diamond Halo Engagement Ring with Diamond Pavé',
    category: 'Pavé Halo',
    tag: '',
    style: 'pave',
    basePrice: 3974,
    metals: ['yellow-gold', 'white-gold', 'rose-gold', 'platinum'],
    shapes: ['Round', 'Oval', 'Princess', 'Cushion', 'Radiant', 'Pear'],
    img: 'https://ecksand.com/cdn/shop/files/43659_43659-14k-Yellow_Gold_51646213030256_engagement-ring-with-cathedral-setting-and-diamond-belt_14k_Yellow_Gold_Round_7d6f19bc-7171-477b-af9c-a4869cf50202.png',
    priceGroup: '3000-5000',
  },
  {
    id: 7,
    name: 'Six-Prong Diamond Engagement Ring with Secret Heart',
    category: 'Secret Heart',
    tag: '',
    style: 'solitaire',
    basePrice: 2654,
    metals: ['yellow-gold', 'white-gold', 'rose-gold', 'platinum'],
    shapes: ['Round'],
    img: 'https://ecksand.com/cdn/shop/files/ecksand-05351-y-1.00-round-ring.png',
    priceGroup: 'under3000',
  },
  {
    id: 8,
    name: 'Love Knot Diamond Halo Engagement Ring',
    category: 'Love Knot Halo',
    tag: '',
    style: 'knot',
    basePrice: 3534,
    metals: ['yellow-gold', 'white-gold', 'rose-gold', 'platinum'],
    shapes: ['Round', 'Oval', 'Pear', 'Emerald', 'Princess'],
    img: 'https://ecksand.com/cdn/shop/files/ecksand-37106-y-1.00-round-diamond-ring.png',
    priceGroup: '3000-5000',
  },
  {
    id: 9,
    name: 'Five Diamond Ring',
    category: 'Multi-Stone',
    tag: 'Luxe',
    style: 'cluster',
    basePrice: 21530,
    metals: ['yellow-gold', 'white-gold', 'rose-gold', 'platinum'],
    shapes: ['Natural', 'Lab-grown'],
    img: 'https://ecksand.com/cdn/shop/files/11374-y.png',
    priceGroup: 'over10000',
  },
  {
    id: 10,
    name: 'Eight-Prong Blossom Engagement Ring with Side Diamonds',
    category: 'Blossom',
    tag: '',
    style: 'blossom',
    basePrice: 3779,
    metals: ['yellow-gold', 'white-gold', 'rose-gold', 'platinum'],
    shapes: ['Round', 'Oval', 'Cushion', 'Princess', 'Radiant'],
    img: 'https://ecksand.com/cdn/shop/files/38965_p_9319534428477_img_45224248574269_eight-prong-blossom-engagement-ring-with-side-diamonds.png',
    priceGroup: '3000-5000',
  },
  {
    id: 11,
    name: 'Love Knot Bezel-Set Diamond Engagement Ring',
    category: 'Love Knot Bezel',
    tag: 'New Arrival',
    style: 'knot',
    basePrice: 6748,
    metals: ['yellow-gold', 'white-gold', 'rose-gold'],
    shapes: ['Pear'],
    img: 'https://ecksand.com/cdn/shop/files/45611_p_14961257447792_img_66500341858672_love-knot-bezel-set-diamond-engagement-ring.png',
    priceGroup: '5000-10000',
  },
  {
    id: 12,
    name: 'Solitaire Six-Prongs Engagement Ring with Diamond Accent Pavé',
    category: 'Solitaire Pavé',
    tag: '',
    style: 'pave',
    basePrice: 3534,
    metals: ['yellow-gold', 'white-gold', 'rose-gold', 'platinum'],
    shapes: ['Round', 'Oval', 'Princess', 'Emerald', 'Cushion'],
    img: 'https://ecksand.com/cdn/shop/files/Ecksand-38950-y-0.70-round-horizon.png',
    priceGroup: '3000-5000',
  },
  {
    id: 13,
    name: 'Engagement Ring with Eagle Prongs and Side Diamonds',
    category: 'Eagle Prong',
    tag: '',
    style: 'solitaire',
    basePrice: 2626,
    metals: ['yellow-gold', 'white-gold', 'rose-gold', 'platinum'],
    shapes: ['Round'],
    img: 'https://ecksand.com/cdn/shop/files/ecksand-32976-y-0.75-round-ring.png',
    priceGroup: 'under3000',
  },
  {
    id: 14,
    name: 'Love Knot Diamond Engagement Ring with Eagle Prongs',
    category: 'Love Knot Eagle',
    tag: '',
    style: 'knot',
    basePrice: 3502,
    metals: ['yellow-gold', 'white-gold', 'rose-gold', 'platinum'],
    shapes: ['Round'],
    img: 'https://ecksand.com/cdn/shop/files/38931_p_9292381946173_img_45106836111677_diamond-engagement-ring-with-eagle-prongs.png',
    priceGroup: '3000-5000',
  },
];

const METAL_LABELS = {
  'yellow-gold': 'Yellow Gold',
  'white-gold':  'White Gold',
  'rose-gold':   'Rose Gold',
  'platinum':    'Platinum',
};

// ── STATE ──────────────────────────────────────────────────────────
let activeStyle  = 'all';
let activeMetal  = 'all';
let activePrice  = 'all';
let activeSort   = 'featured';
let isListMode   = false;

// ── DOM REFS ───────────────────────────────────────────────────────
const grid        = document.getElementById('productsGrid');
const resultCount = document.getElementById('resultCount');
const noResults   = document.getElementById('noResults');
const modalOverlay= document.getElementById('modalOverlay');
const modalBody   = document.getElementById('modalBody');
const header      = document.getElementById('siteHeader');
const annBar      = document.getElementById('announcementBar');

// ── FORMAT PRICE ───────────────────────────────────────────────────
function fmt(n){ return '$' + n.toLocaleString('en-CA') + ' CAD'; }

// ── CARD HTML ──────────────────────────────────────────────────────
function cardHTML(p){
  const swatches = p.metals.map(m =>
    `<span class="swatch ${m}" title="${METAL_LABELS[m]}"></span>`).join('');
  return `
    <div class="product-card" data-id="${p.id}" tabindex="0" role="button" aria-label="${p.name}">
      <div class="card-image-wrap">
        ${p.tag ? `<span class="card-badge">${p.tag}</span>` : ''}
        <button class="card-wishlist" aria-label="Add to wishlist" onclick="wishlist(event,${p.id})">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x400/F7E7CE/A9A9A9?text=Ring'" />
        <div class="card-swatches">${swatches}</div>
      </div>
      <div class="card-body">
        <p class="card-category">${p.category}</p>
        <h3 class="card-name">${p.name}</h3>
        <p class="card-sub">${p.shapes.join(' · ')}</p>
        <div class="card-footer">
          <p class="card-price"><span>From</span>${fmt(p.basePrice)}</p>
          <button class="card-cta" onclick="openModal(event,${p.id})">Quick View</button>
        </div>
      </div>
    </div>`;
}

// ── RENDER ─────────────────────────────────────────────────────────
function render(){
  let list = PRODUCTS.filter(p => {
    if (activeStyle !== 'all' && p.style !== activeStyle) return false;
    if (activeMetal !== 'all' && !p.metals.includes(activeMetal)) return false;
    if (activePrice !== 'all' && p.priceGroup !== activePrice) return false;
    return true;
  });

  list = list.sort((a,b) => {
    if (activeSort === 'price-asc')  return a.basePrice - b.basePrice;
    if (activeSort === 'price-desc') return b.basePrice - a.basePrice;
    if (activeSort === 'name-asc')   return a.name.localeCompare(b.name);
    return a.id - b.id;
  });

  grid.innerHTML = list.map(cardHTML).join('');
  resultCount.innerHTML = `Showing <strong>${list.length}</strong> ring${list.length !== 1 ? 's' : ''}`;
  noResults.classList.toggle('hidden', list.length > 0);

  // Click to open modal
  grid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.card-cta') || e.target.closest('.card-wishlist')) return;
      openModal(e, +card.dataset.id);
    });
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter') openModal(e, +card.dataset.id);
    });
  });
}

// ── MODAL ──────────────────────────────────────────────────────────
function openModal(e, id){
  e.stopPropagation();
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const swatches = p.metals.map((m,i) =>
    `<span class="modal-swatch ${m} ${i===0?'active':''}" title="${METAL_LABELS[m]}" onclick="selectSwatch(this)"></span>`).join('');
  modalBody.innerHTML = `
    <div class="modal-img">
      <img src="${p.img}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/400x400/F7E7CE/A9A9A9?text=Ring'" />
    </div>
    <div class="modal-info">
      <p class="modal-category">${p.category}</p>
      <h2 class="modal-name">${p.name}</h2>
      <p class="modal-price">From ${fmt(p.basePrice)}</p>
      <div class="modal-swatches">
        <label>Metal</label>
        <div class="modal-swatch-row">${swatches}</div>
      </div>
      <div class="modal-actions">
        <button class="btn btn-primary" onclick="addToCart(${p.id})">Add to Cart</button>
        <a href="#" class="btn btn-outline">View Full Details</a>
      </div>
    </div>`;
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(){
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

function selectSwatch(el){
  el.closest('.modal-swatch-row').querySelectorAll('.modal-swatch').forEach(s=>s.classList.remove('active'));
  el.classList.add('active');
}

// ── CART ───────────────────────────────────────────────────────────
let cartCount = 0;
function addToCart(id){
  cartCount++;
  document.querySelector('.cart-badge').textContent = cartCount;
  const p = PRODUCTS.find(x => x.id === id);
  showToast(`✓ ${p.name.split(' ').slice(0,4).join(' ')}… added to cart`);
  closeModal();
}

function wishlist(e, id){
  e.stopPropagation();
  const btn = e.currentTarget;
  btn.style.color = '#9B111E';
  showToast('Added to wishlist ♥');
}

// ── TOAST ──────────────────────────────────────────────────────────
function showToast(msg){
  let toast = document.getElementById('toast');
  if (!toast){
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = 'position:fixed;bottom:32px;left:50%;transform:translateX(-50%);background:#1a1a1a;color:#FFFFF0;padding:14px 28px;font-size:.82rem;letter-spacing:.06em;z-index:999;pointer-events:none;opacity:0;transition:opacity .3s ease';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.style.opacity = '0', 3000);
}

// ── FILTER RESET ───────────────────────────────────────────────────
window.resetFilters = function(){
  activeStyle = 'all';
  activeMetal = 'all';
  activePrice = 'all';
  activeSort  = 'featured';
  document.getElementById('metalFilter').value = 'all';
  document.getElementById('priceFilter').value = 'all';
  document.getElementById('sortFilter').value  = 'featured';
  document.querySelectorAll('.style-pill').forEach(p => p.classList.toggle('active', p.dataset.filter === 'all'));
  render();
};

// ── EVENT LISTENERS ────────────────────────────────────────────────
document.querySelectorAll('.style-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.style-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeStyle = btn.dataset.filter;
    render();
  });
});

document.getElementById('metalFilter').addEventListener('change', e => { activeMetal = e.target.value; render(); });
document.getElementById('priceFilter').addEventListener('change', e => { activePrice = e.target.value; render(); });
document.getElementById('sortFilter').addEventListener('change',  e => { activeSort  = e.target.value; render(); });

document.getElementById('gridView').addEventListener('click', () => {
  isListMode = false;
  grid.classList.remove('list-mode');
  document.getElementById('gridView').classList.add('active');
  document.getElementById('listView').classList.remove('active');
});
document.getElementById('listView').addEventListener('click', () => {
  isListMode = true;
  grid.classList.add('list-mode');
  document.getElementById('listView').classList.add('active');
  document.getElementById('gridView').classList.remove('active');
});

// Modal close
document.getElementById('modalClose').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Search
document.getElementById('searchBtn').addEventListener('click', () => {
  document.getElementById('searchOverlay').classList.add('open');
  document.getElementById('searchInput').focus();
});
document.getElementById('searchClose').addEventListener('click', () => {
  document.getElementById('searchOverlay').classList.remove('open');
});

// Announcement bar
document.getElementById('annClose').addEventListener('click', () => {
  annBar.style.display = 'none';
});

// Header scroll shadow
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// Newsletter
document.getElementById('nlForm').addEventListener('submit', e => {
  e.preventDefault();
  showToast('Thank you for subscribing! ✦');
  e.target.reset();
});

// ── INIT ───────────────────────────────────────────────────────────
render();
