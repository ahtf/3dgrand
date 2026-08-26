/* =========================================================
   3DGrand - EASY SETTINGS
   فقط این بخش را برای اطلاعات واقعی کسب‌وکارت ویرایش کن.
   شماره واتساپ باید با کد کشور و بدون + نوشته شود.
   نمونه ایران: 989121234567
   ========================================================= */
const CONFIG = {
  whatsappNumber: "",
  phoneNumber: "",
  instagramUsername: "3dgrand",
  email: "info@3dgrand.ir",
  defaultWhatsAppMessage: "سلام، برای سفارش/استعلام قیمت پرینت سه‌بعدی پیام می‌دهم.",

  products: [
    {
      name: "کابل جمع‌کن",
      description: "نظم‌دهنده جمع‌وجور برای نگهداری مرتب کابل روی میز یا داخل کیف.",
      price: "استعلام قیمت",
      code: "P-001"
    },
    {
      name: "ابزار اندازه‌گیری انحنا",
      description: "ابزار کاربردی برای مقایسه و تشخیص شعاع و انحنای سطوح.",
      price: "استعلام قیمت",
      code: "P-002"
    },
    {
      name: "قطعه سفارشی",
      description: "ساخت قطعه بر اساس فایل سه‌بعدی، اندازه یا نمونه موجود شما.",
      price: "بر اساس فایل",
      code: "CUSTOM"
    }
  ]
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function encode(text) {
  return encodeURIComponent(text);
}

function whatsappUrl(message = CONFIG.defaultWhatsAppMessage) {
  const number = CONFIG.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encode(message)}`;
}

function setupContactLinks() {
  $$('[data-whatsapp]').forEach(link => {
    link.href = whatsappUrl();
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  $$('[data-instagram]').forEach(link => {
    link.href = `https://instagram.com/${CONFIG.instagramUsername.replace(/^@/, "")}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  $$('[data-phone]').forEach(link => {
    link.href = `tel:${CONFIG.phoneNumber.replace(/\s/g, "")}`;
    link.textContent = CONFIG.phoneNumber;
  });

  $$('[data-email]').forEach(link => {
    link.href = `mailto:${CONFIG.email}`;
    link.textContent = CONFIG.email;
  });
}

function renderProducts() {
  const grid = $('#productGrid');
  if (!grid) return;

  grid.innerHTML = CONFIG.products.map((product, i) => {
    const msg = `سلام، درباره محصول «${product.name}» با کد ${product.code} سوال دارم.`;
    return `
      <article class="product-card reveal">
        <div class="product-visual"><span>${String(i + 1).padStart(2, '0')}</span></div>
        <div class="product-body">
          <div class="product-top">
            <h3>${product.name}</h3>
            <span class="price">${product.price}</span>
          </div>
          <p>${product.description}</p>
          <a class="btn" href="${whatsappUrl(msg)}" target="_blank" rel="noopener noreferrer">سفارش این محصول</a>
        </div>
      </article>`;
  }).join('');
}

function setupMenu() {
  const btn = $('#menuBtn');
  const nav = $('#mainNav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });

  $$('#mainNav a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }));
}

function setupReveal() {
  const items = $$('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(el => observer.observe(el));
}

function setupHeader() {
  const header = $('.site-header');
  const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function init() {
  $('#year').textContent = new Date().getFullYear();
  renderProducts();
  setupContactLinks();
  setupMenu();
  setupHeader();
  setupReveal();
}

document.addEventListener('DOMContentLoaded', init);
