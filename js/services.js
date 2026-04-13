/* ============================================================
   SERVICES PAGE LOGIC
   Filtering and Interaction
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initFiltering();
});

function initFiltering() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const serviceCards = document.querySelectorAll('.service-card');

  if (!filterPills.length || !serviceCards.length) return;

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      // 1. Update UI (Active state)
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterValue = pill.getAttribute('data-filter');

      // 2. Filter Cards
      serviceCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('hidden');
          // Re-trigger reveal animation if hidden before
          if (card.classList.contains('reveal')) {
            card.classList.add('visible');
          }
        } else {
          card.classList.add('hidden');
        }
      });

      // 3. Handle Empty States (Optional: if we ever have empty categories)
    });
  });
}
