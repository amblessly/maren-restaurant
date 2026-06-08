/* ============================================
   MAREN — Fine Dining  |  script.js
   ============================================ */

'use strict';

// ─── MENU DATA ───────────────────────────────────────────────────────────────
const menuData = {
  starters: [
    {
      title: 'Sea Urchin Custard',
      desc: 'Hokkaido uni, dashi gelée, crispy rice, micro shiso',
      price: '$38',
      tag: 'Signature',
      img: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=600&q=75',
    },
    {
      title: 'Aged Duck Tartare',
      desc: 'Seven-day aged Pekin duck, black walnut vinaigrette, nasturtium',
      price: '$34',
      tag: 'Chef\'s Pick',
      img: 'https://images.unsplash.com/photo-1515516969-d4008cc6241a?w=600&q=75',
    },
    {
      title: 'Smoked Tomato Consommé',
      desc: 'Heirloom tomato, cold-smoked over cherry wood, herb oil',
      price: '$22',
      tag: 'Seasonal',
      img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=75',
    },
  ],
  mains: [
    {
      title: 'Wagyu Short Rib A5',
      desc: '72-hour braised Wagyu, truffle jus, celery root puree',
      price: '$95',
      tag: 'Signature',
      img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=75',
    },
    {
      title: 'Dover Sole Meunière',
      desc: 'Hand-dived sole, brown butter, capers, lemon, pearl onion',
      price: '$78',
      tag: 'Classic',
      img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=75',
    },
    {
      title: 'Forest Mushroom Risotto',
      desc: 'Aged Carnaroli, porcini, Parmigiano, black truffle shavings',
      price: '$52',
      tag: 'Vegetarian',
      img: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=75',
    },
  ],
  desserts: [
    {
      title: 'Valrhona Noir Fondant',
      desc: '72% dark chocolate, salted caramel, hazelnut praline',
      price: '$24',
      tag: 'Signature',
      img: 'https://images.unsplash.com/photo-1602351447937-745cb720612f?w=600&q=75',
    },
    {
      title: 'Citrus Tart Moderne',
      desc: 'Meyer lemon curd, Italian meringue, yuzu sorbet',
      price: '$20',
      tag: 'Seasonal',
      img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=75',
    },
    {
      title: 'Miso Ice Cream',
      desc: 'White miso caramel, black sesame tuile, toasted rice',
      price: '$18',
      tag: 'Chef\'s Pick',
      img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=75',
    },
  ],
};

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
const navbar     = document.getElementById('navbar');
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('navLinks');
const overlay    = document.getElementById('mobileOverlay');
const mobLinks   = document.querySelectorAll('.mob-link');
const allNavLinks = document.querySelectorAll('.nav-link');

// Scroll-triggered blur
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Hamburger toggle
hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  overlay.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

// Close mobile menu on link click
mobLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const observerOptions = { rootMargin: '-40% 0px -50% 0px', threshold: 0 };
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      allNavLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, observerOptions);

sections.forEach(s => sectionObserver.observe(s));

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────
const revealEls = document.querySelectorAll(
  '.reveal-up, .reveal-fade, .reveal-left, .reveal-right'
);

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => revealObserver.observe(el));

// Trigger hero reveals immediately
document.querySelectorAll('.hero .reveal-up, .hero .reveal-fade').forEach((el, i) => {
  setTimeout(() => el.classList.add('visible'), 300 + i * 180);
});

// ─── MENU TABS ────────────────────────────────────────────────────────────────
const tabs     = document.querySelectorAll('.tab');
const menuGrid = document.getElementById('menuGrid');

function renderMenu(category) {
  const items = menuData[category];
  menuGrid.innerHTML = items.map(item => `
    <div class="menu-card reveal-up">
      <img class="menu-card-img" src="${item.img}" alt="${item.title}" loading="lazy" />
      <div class="menu-card-body">
        <h3 class="menu-card-title">${item.title}</h3>
        <p class="menu-card-desc">${item.desc}</p>
        <div class="menu-card-footer">
          <span class="menu-price">${item.price}</span>
          <span class="menu-tag">${item.tag}</span>
        </div>
      </div>
    </div>
  `).join('');

  // Animate new cards in
  requestAnimationFrame(() => {
    const cards = menuGrid.querySelectorAll('.menu-card');
    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 80}ms`;
      requestAnimationFrame(() => card.classList.add('visible'));
    });
  });
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    menuGrid.style.opacity = '0';
    menuGrid.style.transform = 'translateY(10px)';
    setTimeout(() => {
      renderMenu(tab.dataset.tab);
      menuGrid.style.transition = 'opacity 0.4s, transform 0.4s';
      menuGrid.style.opacity = '1';
      menuGrid.style.transform = 'none';
    }, 200);
  });
});

// Initial render
renderMenu('starters');
menuGrid.style.opacity = '1';

// ─── GUEST STEPPER ────────────────────────────────────────────────────────────
let guestCount = 2;
const guestDisplay = document.getElementById('guestCount');
const guestInput   = document.getElementById('guests');

document.getElementById('guestMinus').addEventListener('click', () => {
  if (guestCount > 1) {
    guestCount--;
    guestDisplay.textContent = guestCount;
    guestInput.value = guestCount;
  }
});

document.getElementById('guestPlus').addEventListener('click', () => {
  if (guestCount < 10) {
    guestCount++;
    guestDisplay.textContent = guestCount;
    guestInput.value = guestCount;
  }
});

// ─── FORM VALIDATION & SUBMIT ─────────────────────────────────────────────────
const form        = document.getElementById('reserveForm');
const successMsg  = document.getElementById('formSuccess');

function showError(input, msg) {
  input.classList.add('error');
  const errEl = input.closest('.form-group')?.querySelector('.field-err');
  if (errEl) errEl.textContent = msg;
}

function clearError(input) {
  input.classList.remove('error');
  const errEl = input.closest('.form-group')?.querySelector('.field-err');
  if (errEl) errEl.textContent = '';
}

function validateForm() {
  let valid = true;
  const fname  = document.getElementById('fname');
  const lname  = document.getElementById('lname');
  const email  = document.getElementById('email');
  const rdate  = document.getElementById('rdate');
  const rtime  = document.getElementById('rtime');

  [fname, lname, email, rdate, rtime].forEach(clearError);

  if (!fname.value.trim()) { showError(fname, 'First name is required.'); valid = false; }
  if (!lname.value.trim()) { showError(lname, 'Last name is required.'); valid = false; }
  if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    showError(email, 'A valid email is required.'); valid = false;
  }
  if (!rdate.value) { showError(rdate, 'Please select a date.'); valid = false; }
  if (!rtime.value) { showError(rtime, 'Please select a sitting.'); valid = false; }

  return valid;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!validateForm()) return;

  const btn = form.querySelector('.btn-submit');
  btn.disabled = true;
  btn.querySelector('.btn-text').textContent = 'Confirming…';

  setTimeout(() => {
    form.querySelectorAll('input, select').forEach(el => el.value = '');
    guestCount = 2;
    guestDisplay.textContent = 2;
    guestInput.value = 2;
    btn.style.display = 'none';
    successMsg.classList.add('visible');
  }, 1200);
});

// Ripple on submit button
const submitBtn = form.querySelector('.btn-submit');
submitBtn.addEventListener('click', function(e) {
  const ripple = this.querySelector('.btn-ripple');
  const rect   = this.getBoundingClientRect();
  const size   = Math.max(rect.width, rect.height) * 2;
  ripple.style.width  = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left   = `${e.clientX - rect.left}px`;
  ripple.style.top    = `${e.clientY - rect.top}px`;
  ripple.style.opacity = '1';
  setTimeout(() => { ripple.style.opacity = '0'; }, 500);
});

// Clear errors on input
form.querySelectorAll('input, select').forEach(input => {
  input.addEventListener('input', () => clearError(input));
});
