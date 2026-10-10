/* ==========================================================================
   Avanti – Landing Page
   ========================================================================== */

/**
 * Busca: ao clicar na lupa (ou pressionar Enter), exibe o termo
 * digitado abaixo do campo.
 */
function initSearch() {
  const form = document.querySelector('.search__form');
  const input = document.getElementById('search-input');
  const result = document.getElementById('search-result');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const term = input.value.trim();
    result.textContent = term ? `Você buscou por: '${term}'` : '';
  });
}

/**
 * Mega-menu: abre ao passar o mouse (ou focar pelo teclado) em um
 * departamento e fecha ao sair da área do menu.
 */
function initMegaMenu() {
  const nav = document.querySelector('.nav');
  const megaMenu = document.getElementById('mega-menu');
  const title = megaMenu.querySelector('.mega-menu__title');
  const departments = nav.querySelectorAll('.nav__item--dept');

  const close = () => {
    megaMenu.hidden = true;
    departments.forEach((item) => item.classList.remove('is-active'));
  };

  const open = (item) => {
    close();
    item.classList.add('is-active');
    title.textContent = item.textContent.trim();
    megaMenu.hidden = false;
  };

  departments.forEach((item) => {
    item.addEventListener('mouseenter', () => open(item));
    item.addEventListener('focusin', () => open(item));
  });

  nav.querySelector('.nav__item--all').addEventListener('mouseenter', close);
  nav.addEventListener('mouseleave', close);

  nav.addEventListener('focusout', (event) => {
    if (!nav.contains(event.relatedTarget)) close();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });
}

/**
 * Menu lateral do mobile, aberto pelo botão hambúrguer.
 */
function initMobileMenu() {
  const toggle = document.querySelector('.header__menu-toggle');
  const menu = document.getElementById('menu-mobile');
  const closeButton = menu.querySelector('.menu-mobile__close');

  const setOpen = (isOpen) => {
    menu.hidden = !isOpen;
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('is-menu-open', isOpen);

    if (isOpen) closeButton.focus();
    else toggle.focus();
  };

  toggle.addEventListener('click', () => setOpen(true));
  closeButton.addEventListener('click', () => setOpen(false));

  // Fecha ao clicar fora do painel
  menu.addEventListener('click', (event) => {
    if (event.target === menu) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) setOpen(false);
  });
}

/**
 * Preenche cada carrossel de produtos com cópias do card definido
 * no <template id="product-card-template">.
 */
function renderProductCards() {
  const template = document.getElementById('product-card-template');

  document.querySelectorAll('.showcase__swiper').forEach((carousel) => {
    const wrapper = carousel.querySelector('.swiper-wrapper');
    const total = Number(carousel.dataset.products) || 0;

    for (let i = 0; i < total; i++) {
      wrapper.appendChild(template.content.cloneNode(true));
    }
  });
}

initSearch();
initMegaMenu();
initMobileMenu();
renderProductCards();
