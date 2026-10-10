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

const mobileQuery = window.matchMedia('(max-width: 767px)');

/**
 * Preenche o carrossel com cópias do card definido no
 * <template id="product-card-template">. O mobile usa menos produtos
 * para manter as 3 páginas do layout (2 cards por página).
 */
function renderProductCards(carousel) {
  const template = document.getElementById('product-card-template');
  const wrapper = carousel.querySelector('.swiper-wrapper');
  const { products, productsMobile } = carousel.dataset;
  const total = Number(mobileQuery.matches ? productsMobile : products) || 0;

  wrapper.replaceChildren();
  for (let i = 0; i < total; i++) {
    wrapper.appendChild(template.content.cloneNode(true));
  }
}

/**
 * Carrosséis de produtos: 5 cards por página no desktop e 2 no mobile,
 * com setas e paginação.
 */
function initShowcaseCarousels() {
  const showcases = [...document.querySelectorAll('.showcase')];
  let instances = [];

  const build = () => {
    instances.forEach((swiper) => swiper.destroy(true, true));

    instances = showcases.map((showcase) => {
      const carousel = showcase.querySelector('.showcase__swiper');
      renderProductCards(carousel);

      return new Swiper(carousel, {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 10,
        rewind: true,
        navigation: {
          prevEl: showcase.querySelector('.showcase__arrow--prev'),
          nextEl: showcase.querySelector('.showcase__arrow--next'),
        },
        pagination: {
          el: showcase.querySelector('.showcase__pagination'),
          clickable: true,
        },
        breakpoints: {
          768: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 17 },
          1024: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 17 },
          1280: { slidesPerView: 5, slidesPerGroup: 5, spaceBetween: 17 },
        },
      });
    });
  };

  build();
  mobileQuery.addEventListener('change', build);
}

/**
 * Newsletter: usa a validação nativa do formulário e confirma o
 * cadastro sem recarregar a página.
 */
function initNewsletter() {
  const form = document.querySelector('.newsletter__form');
  const feedback = document.getElementById('newsletter-feedback');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    feedback.textContent = 'Cadastro realizado com sucesso!';
    form.reset();
  });
}

/**
 * Footer no mobile: cada coluna vira um accordion.
 */
function initFooterAccordion() {
  document.querySelectorAll('.footer__toggle').forEach((toggle) => {
    toggle.addEventListener('click', () => {
      if (!mobileQuery.matches) return;

      const column = toggle.closest('.footer__column');
      const isOpen = column.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  });
}

initSearch();
initNewsletter();
initFooterAccordion();
initMegaMenu();
initMobileMenu();
initShowcaseCarousels();
