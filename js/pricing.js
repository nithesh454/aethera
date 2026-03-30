// ============================================================
// AUTOSTACK — Pricing Page JS
// Toggle, FAQ, dynamic pricing from Supabase
// ============================================================

const FALLBACK_PACKAGES = [
  {
    name: 'Starter',
    tagline: 'Perfect for first-time AI adopters',
    price: 4999,
    price_monthly: 2999,
    features: ['1 AI Chatbot', 'Basic n8n Workflow', 'WhatsApp Integration', '1 Month Support', 'Documentation'],
    is_popular: false,
    cta_label: 'Get Started'
  },
  {
    name: 'Growth',
    tagline: 'For businesses ready to scale',
    price: 14999,
    price_monthly: 8999,
    features: ['AI Chatbot + RAG System', '3 n8n Workflows', 'WhatsApp + Web Integration', 'Analytics Dashboard', '3 Months Support', 'Priority Response'],
    is_popular: true,
    cta_label: 'Choose Growth'
  },
  {
    name: 'Enterprise',
    tagline: 'Full AI transformation',
    price: null,
    price_monthly: null,
    features: ['Everything in Growth', 'Full AI Backend', 'Custom Integrations', 'Dedicated Support', 'Monthly Strategy Calls', 'Source Code Included'],
    is_popular: false,
    cta_label: "Let's Talk"
  }
];

let isMonthly = false;

document.addEventListener('DOMContentLoaded', () => {
  loadPricing();
  initToggle();
  initFAQ();
});

async function loadPricing() {
  let packages = await supabaseQuery('pricing_packages', {
    filters: 'is_active=eq.true',
    order: 'sort_order.asc'
  });

  if (!packages || packages.length === 0) {
    packages = FALLBACK_PACKAGES;
  }

  renderPricingCards(packages);
}

function renderPricingCards(packages) {
  const container = document.getElementById('pricing-cards');
  if (!container) return;

  container.innerHTML = packages.map(pkg => {
    const isPopular = pkg.is_popular;
    const cardClass = isPopular ? 'popular' : 'standard';

    let priceOne = pkg.price
      ? `₹${Number(pkg.price).toLocaleString('en-IN')}`
      : 'Custom';
    let priceMonthly = pkg.price_monthly
      ? `₹${Number(pkg.price_monthly).toLocaleString('en-IN')}`
      : 'Custom';

    const features = (pkg.features || []).map(f => `<li>${f}</li>`).join('');

    const ctaBtn = isPopular
      ? `<button class="btn-seal-small" onclick="window.location='booking.html'">${pkg.cta_label || 'Choose Growth'}</button>`
      : `<a href="booking.html" class="btn-brass" style="width:100%;text-align:center;display:block;">${pkg.cta_label || 'Get Started'}</a>`;

    return `
      <div class="pricing-card ${cardClass} reveal">
        ${isPopular ? '<div class="popular-ribbon">Most Popular</div>' : ''}
        <div class="pricing-tab">${pkg.name}</div>
        <div class="pricing-card-body">
          <p style="font-family:var(--font-body);font-size:13px;margin-bottom:4px;opacity:0.7;">${pkg.tagline || ''}</p>
          <div class="price">
            <span class="price-onetime">${priceOne}</span>
            <span class="price-monthly" style="display:none;">${priceMonthly}</span>
          </div>
          <div class="price-period">
            <span class="period-onetime">One-time payment</span>
            <span class="period-monthly" style="display:none;">per month</span>
          </div>
          <ul class="features-list">${features}</ul>
          <div class="pricing-cta">${ctaBtn}</div>
        </div>
      </div>
    `;
  }).join('');

  initScrollReveal();
}

function initToggle() {
  const toggle = document.getElementById('pricing-toggle');
  const labelOne = document.getElementById('label-onetime');
  const labelMonth = document.getElementById('label-monthly');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    isMonthly = !isMonthly;
    toggle.classList.toggle('monthly', isMonthly);
    labelOne.classList.toggle('active', !isMonthly);
    labelMonth.classList.toggle('active', isMonthly);

    document.querySelectorAll('.price-onetime').forEach(el => el.style.display = isMonthly ? 'none' : '');
    document.querySelectorAll('.price-monthly').forEach(el => el.style.display = isMonthly ? '' : 'none');
    document.querySelectorAll('.period-onetime').forEach(el => el.style.display = isMonthly ? 'none' : '');
    document.querySelectorAll('.period-monthly').forEach(el => el.style.display = isMonthly ? '' : 'none');
  });
}

function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      // Toggle clicked
      if (!wasOpen) item.classList.add('open');
    });
  });
}
