/* ==========================================================================
   Avanti – Landing Page
   ========================================================================== */

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

renderProductCards();
