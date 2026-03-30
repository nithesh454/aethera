// ============================================================
// AUTOSTACK — Portfolio Page JS
// Load projects from Supabase, filter by category
// ============================================================

const FALLBACK_PROJECTS = [
  {
    title: 'KLI Analytics Backend',
    slug: 'kli-analytics',
    category: 'fullstack',
    short_desc: 'Complete n8n AI backend for KLI Brands — live production application with real-time analytics dashboard.',
    tech_tags: ['n8n', 'Supabase', 'AI', 'Dashboard'],
    is_featured: true,
    icon: '📊'
  },
  {
    title: 'RAG Hybrid Search System',
    slug: 'rag-hybrid-search',
    category: 'rag',
    short_desc: 'Hybrid search using Qdrant with BM25 + Semantic + Query Decomposition for intelligent document retrieval.',
    tech_tags: ['n8n', 'Qdrant', 'RAG', 'Python'],
    is_featured: false,
    icon: '🔍'
  },
  {
    title: 'Excel & Table RAG Pipeline',
    slug: 'excel-rag-pipeline',
    category: 'rag',
    short_desc: 'Tabular data vectorization and hybrid indexing system for Excel and CSV files with natural language queries.',
    tech_tags: ['n8n', 'Qdrant', 'RAG', 'Supabase'],
    is_featured: false,
    icon: '📑'
  },
  {
    title: 'Document RAG Pipeline',
    slug: 'document-rag-pipeline',
    category: 'rag',
    short_desc: 'Document ingestion and vectorization system with hybrid search for PDFs, Word docs, and more.',
    tech_tags: ['n8n', 'Qdrant', 'RAG'],
    is_featured: false,
    icon: '📄'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  loadProjects();
  initPortfolioFilters();
});

async function loadProjects() {
  let projects = await supabaseQuery('projects', {
    filters: 'is_published=eq.true',
    order: 'is_featured.desc,sort_order.asc'
  });

  if (!projects || projects.length === 0) {
    projects = FALLBACK_PROJECTS;
  }

  renderProjects(projects);
}

function renderProjects(projects) {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;

  grid.innerHTML = projects.map(p => {
    const isFeatured = p.is_featured;
    const tags = (p.tech_tags || []).map(t =>
      `<span class="stamp-badge stamp-tag" data-tech="${t}">${t}</span>`
    ).join('');

    return `
      <div class="portfolio-card ${isFeatured ? 'featured' : ''} reveal" data-category="${p.category}">
        <div class="thumbtack"></div>
        ${isFeatured ? '<span class="stamp-badge stamp-red featured-stamp">FEATURED</span>' : ''}
        ${isFeatured ? '<span class="stamp-badge stamp-green live-stamp">LIVE</span>' : ''}
        <div class="portfolio-photo">
          <div class="photo-placeholder">
            <span class="icon">${p.icon || '⚡'}</span>
            <span class="label">${p.title}</span>
          </div>
        </div>
        <div class="portfolio-card-body">
          <h3>${p.title}</h3>
          <p class="card-desc">${p.short_desc || ''}</p>
          <div class="portfolio-card-tags">${tags}</div>
          <a href="#" class="portfolio-card-link">View Project →</a>
        </div>
      </div>
    `;
  }).join('');

  initScrollReveal();
}

function initPortfolioFilters() {
  const tabs = document.querySelectorAll('.portfolio-filter .folder-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.category;
      document.querySelectorAll('.portfolio-card').forEach(card => {
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
