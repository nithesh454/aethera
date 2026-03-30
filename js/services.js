// ============================================================
// AETHERA — Services Page JS
// Filtering + Order Button Logic
// ============================================================

const FALLBACK_SERVICES = [
  {
    name: 'AI Chatbot for Business',
    category: 'chatbot',
    short_desc: 'Smart chatbot that answers customer queries 24/7, trained on your own business data with WhatsApp and web integration.',
    price_from: 4999,
    delivery_days: 7,
    features: ['Custom trained on your data', 'WhatsApp/Web integration', 'Handoff to human agent', 'Analytics dashboard'],
    icon: '🤖'
  },
  {
    name: 'RAG Knowledge System',
    category: 'rag',
    short_desc: 'Upload your PDFs, docs, and Excel files — AI searches, understands, and answers questions from your knowledge base.',
    price_from: 9999,
    delivery_days: 14,
    features: ['Upload PDFs/Docs/Excel', 'Hybrid search (BM25 + Semantic)', 'API access for your apps', 'Supabase/Qdrant backend'],
    icon: '🔍'
  },
  {
    name: 'n8n Automation Workflow',
    category: 'automation',
    short_desc: 'Automate repetitive tasks — emails, data entry, alerts, follow-ups — with intelligent n8n workflows.',
    price_from: 6999,
    delivery_days: 10,
    features: ['Custom workflow design', 'Webhook triggers', 'Email/WhatsApp alerts', 'Error handling & retries'],
    icon: '⚙️'
  },
  {
    name: 'Analytics Dashboard',
    category: 'dashboard',
    short_desc: 'Beautiful, real-time dashboard to track your business KPIs with mobile support and export capabilities.',
    price_from: 7999,
    delivery_days: 12,
    features: ['Real-time data sync', 'Custom KPIs & metrics', 'Mobile responsive design', 'Export reports (CSV/PDF)'],
    icon: '📊'
  },
  {
    name: 'Full Website + AI Backend',
    category: 'fullstack',
    short_desc: 'Complete premium website with AI chatbot, booking system, automation backend, and Supabase database.',
    price_from: 19999,
    delivery_days: 30,
    features: ['Landing page & website', 'AI chatbot integration', 'Booking system', 'n8n backend + Supabase DB'],
    icon: '🌐'
  },
  {
    name: 'Custom AI Project',
    category: 'custom',
    short_desc: 'Have a unique idea? Let\'s brainstorm and build something completely custom for your business needs.',
    price_from: null,
    delivery_days: null,
    features: ['Free consultation call', 'Custom scoping & design', 'Flexible pricing', 'Full ongoing support'],
    icon: '✨'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  loadServices();
  initFilters();
});

async function loadServices() {
  let services = await supabaseQuery('services', {
    filters: 'is_active=eq.true',
    order: 'sort_order.asc'
  });

  if (!services || services.length === 0) {
    services = FALLBACK_SERVICES;
  }

  renderServices(services);
}

function renderServices(services) {
  const grid = document.getElementById('services-grid');
  if (!grid) return;

  grid.innerHTML = services.map(s => {
    const price = s.price_from
      ? `<div class="price-tag">
           <span class="price-amount">₹${Number(s.price_from).toLocaleString('en-IN')}</span>
           <span class="price-label">Starting from</span>
         </div>`
      : `<div class="price-tag">
           <span class="price-amount">Custom</span>
           <span class="price-label">Get a quote</span>
         </div>`;

    const delivery = s.delivery_days
      ? `<li>Delivery: ${s.delivery_days} days</li>`
      : '';

    const features = (s.features || []).map(f => `<li>${f}</li>`).join('');

    return `
      <div class="card-stitched service-card reveal" data-category="${s.category}">
        <div class="stamp-icon">${s.icon || '⚡'}</div>
        ${price}
        <h3>${s.name}</h3>
        <p class="service-desc">${s.short_desc || ''}</p>
        <ul class="features-list">
          ${features}
          ${delivery}
        </ul>
        <div class="order-btn-wrapper">
          <button class="btn-order" onclick="orderService('${s.name}')">Order Now →</button>
        </div>
      </div>
    `;
  }).join('');

  // Re-init scroll reveal for new elements
  initScrollReveal();
}

function initFilters() {
  const tabs = document.querySelectorAll('.folder-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const cat = tab.dataset.category;
      const cards = document.querySelectorAll('.service-card');
      cards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.style.display = '';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

function orderService(serviceName) {
  window.location.href = `booking.html?service=${encodeURIComponent(serviceName)}`;
}
