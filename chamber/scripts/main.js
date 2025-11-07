// ===============================
// Navigation Toggle
// ===============================
const navToggle = document.querySelector('#nav-toggle');
const siteNav = document.querySelector('#site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// ===============================
// Footer Dates
// ===============================
const yearEl = document.getElementById('year');
const lastModEl = document.getElementById('last-mod');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (lastModEl) {
  lastModEl.textContent = new Date(document.lastModified).toLocaleString();
}

// ===============================
// View Toggle (Grid / List)
// ===============================
const btnGrid = document.getElementById('btn-grid');
const btnList = document.getElementById('btn-list');
const directory = document.getElementById('directory');

function setView(mode) {
  if (!directory) return;

  const isGrid = mode === 'grid';

  directory.classList.toggle('grid', isGrid);
  directory.classList.toggle('list', !isGrid);

  btnGrid?.classList.toggle('selected', isGrid);
  btnGrid?.setAttribute('aria-pressed', String(isGrid));

  btnList?.classList.toggle('selected', !isGrid);
  btnList?.setAttribute('aria-pressed', String(!isGrid));
}

btnGrid?.addEventListener('click', () => setView('grid'));
btnList?.addEventListener('click', () => setView('list'));

// Default view on load
setView('grid');