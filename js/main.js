// ============================================================
// AETHERA — Shared Main JS
// Navbar, Footer, Scroll Animations, Toasts
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initSmoothScroll();
  initForms();
});

// ================================================================
// NAVBAR
// ================================================================
function initNavbar() {
  const toggle = document.querySelector('.navbar-toggle');
  const links = document.querySelector('.navbar-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });

    // Close menu on link click
    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }

  // Hamburger menu for Web3 Nav
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
      });
    });
    
    // Optional overlay logic if overlay is used outside the menu
    const overlay = document.querySelector('.mobile-overlay');
    if (overlay) {
      overlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
      });
    }
  }

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Set active page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-links a, .web3-nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}


// ================================================================
// SCROLL REVEAL
// ================================================================
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => observer.observe(el));
}


// ================================================================
// SMOOTH SCROLL
// ================================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}


// ================================================================
// TOAST NOTIFICATIONS
// ================================================================
function showToast(message, type = 'info', duration = 4000) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}


// ================================================================
// BRASS BUTTON INK SPLASH EFFECT
// ================================================================
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-brass');
  if (!btn) return;

  const rect = btn.getBoundingClientRect();
  const splash = document.createElement('span');
  splash.className = 'ink-splash';
  splash.style.left = (e.clientX - rect.left) + 'px';
  splash.style.top = (e.clientY - rect.top) + 'px';
  btn.appendChild(splash);
  setTimeout(() => splash.remove(), 600);
});


// ================================================================
// UTILITY: Render Navbar HTML
// ================================================================
function renderNavbar() {
  return `
  <nav class="navbar texture-leather" id="main-nav">
    <div class="navbar-inner">
      <a href="index.html" class="navbar-logo">
        <div class="navbar-logo-icon">⚡</div>
        <span class="navbar-logo-text">Aethera</span>
      </a>
      <ul class="navbar-links" id="nav-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="portfolio.html">Projects</a></li>
        <li><a href="pricing.html">Pricing</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="booking.html" class="btn-brass" style="padding: 8px 20px; font-size: 11px;">Book a Call</a></li>
      </ul>
      <button class="navbar-toggle" id="nav-toggle" aria-label="Toggle navigation">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>`;
}


// ================================================================
// UTILITY: Render Footer HTML
// ================================================================
function renderFooter() {
  return `
  <footer class="site-footer texture-wood">
    <div class="footer-inner">
      <div class="footer-logo">
        <div class="footer-logo-icon">⚡</div>
        <span class="footer-logo-text">Aethera</span>
      </div>
      <ul class="footer-nav">
        <li><a href="index.html">Home</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="portfolio.html">Projects</a></li>
        <li><a href="pricing.html">Pricing</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="booking.html">Book a Call</a></li>
      </ul>
      <div class="footer-socials">
        <a href="https://www.linkedin.com/in/nithesh-devarla-7a887a358?utm_source=share_via&utm_content=profile&utm_medium=member_android" class="footer-social-link" aria-label="LinkedIn" target="_blank" style="display:flex; align-items:center; justify-content:center;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        </a>
        <a href="#" class="footer-social-link" aria-label="Twitter">𝕏</a>
        <a href="#" class="footer-social-link" aria-label="GitHub">⌨</a>
        <a href="#" class="footer-social-link" aria-label="WhatsApp">✆</a>
      </div>
    </div>
    <div class="footer-bottom" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px; padding-top: 24px;">
      <div>© ${CONFIG.YEAR} ${CONFIG.BRAND_NAME}. All rights reserved.</div>
      <div style="display: flex; gap: 16px; align-items: center;">
        <a href="https://www.linkedin.com/in/nithesh-devarla-7a887a358?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" style="color: rgba(255,255,255,0.5); text-decoration: none; display: flex;" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255,255,255,0.5)'">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        </a>
        <a href="https://www.instagram.com/__aethera__ai/" target="_blank" style="color: rgba(255,255,255,0.5); text-decoration: none; display: flex;" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255,255,255,0.5)'">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
      </div>
    </div>
  </footer>`;
}


// ================================================================
// FORM HANDLING (Direct to Supabase)
// ================================================================
function initForms() {
  // Handle Radio Button Visuals Context
  const radioInputs = document.querySelectorAll('input[type="radio"]');
  radioInputs.forEach(radio => {
    radio.addEventListener('change', (e) => {
      const sameNameRadios = document.querySelectorAll(`input[name="${e.target.name}"]`);
      sameNameRadios.forEach(r => {
        const parentLabel = r.closest('label');
        if (!parentLabel) return;
        if (e.target.name === 'business_type') {
          parentLabel.style.background = 'rgba(255,255,255,0.05)';
          parentLabel.style.borderColor = 'rgba(255,255,255,0.2)';
        } else if (e.target.name === 'budget_max') {
          const pill = parentLabel.querySelector('.budget-pill');
          if (pill) {
            pill.style.background = 'transparent';
            pill.style.color = 'white';
          }
        }
      });

      const selectedLabel = e.target.closest('label');
      if (e.target.name === 'business_type') {
        selectedLabel.style.background = 'rgba(255,255,255,0.15)';
        selectedLabel.style.borderColor = 'white';
      } else if (e.target.name === 'budget_max') {
        const selectedPill = selectedLabel.querySelector('.budget-pill');
        if (selectedPill) {
          selectedPill.style.background = 'white';
          selectedPill.style.color = 'black';
        }
      }
    });
  });

  const intakeForm = document.getElementById('intake-form');
  if (intakeForm) {
    intakeForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const btn = document.getElementById('submit-btn');
      const originalText = btn.innerHTML;
      btn.textContent = 'Sending...';
      btn.style.opacity = '0.7';
      btn.disabled = true;

      try {
        if (!window.supabaseClient) throw new Error("Supabase client not initialized.");

        const formData = new FormData(intakeForm);
        
        // Handle Multi-select checkboxes
        const problemTypes = formData.getAll('problem_type_multi');
        const problemTypeStr = problemTypes.join(', ');

        const orderData = {
          client_name: formData.get('client_name'),
          client_email: formData.get('client_email'),
          client_whatsapp: formData.get('client_whatsapp'),
          business_name: formData.get('business_name') || null,
          business_type: formData.get('business_type') || null,
          problem_type: problemTypeStr || null,
          problem_description: formData.get('problem_description'),
          budget_max: formData.get('budget_max') ? parseFloat(formData.get('budget_max')) : null,
          source: 'website'
        };

        const { data, error } = await window.supabaseClient
          .from('orders')
          .insert([orderData]);

        if (error) {
          console.error("Supabase Error Details:", error);
          throw error;
        }
        
        showToast('Booking request sent successfully! We will contact you soon.', 'success');
        intakeForm.reset();
        showSuccessAnimation();
        
      } catch (err) {
        console.error('Error submitting form:', err);
        showToast('Something went wrong. Please try again.', 'error');
      } finally {
        btn.innerHTML = originalText;
        btn.style.opacity = '1';
        btn.disabled = false;
      }
    });
  }

  // Handle Newsletter Form
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterSuccess = document.getElementById('newsletter-success-state');
  const newsletterHeader = document.getElementById('newsletter-header');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const btn = newsletterForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.textContent = 'Subscribing...';
      btn.style.opacity = '0.7';
      btn.disabled = true;

      try {
        if (!window.supabaseClient) throw new Error("Supabase client not initialized.");

        const formData = new FormData(newsletterForm);
        const email = formData.get('email');

        const { data, error } = await window.supabaseClient
          .from('subscribers')
          .insert([{ email: email, source: 'blog_page' }]);

        if (error) {
          console.error("Supabase Error Details:", error);
          if (error.code === '23505') { // Unique violation
            showToast('You are already subscribed!', 'info');
            
            // Show success state
            newsletterForm.style.display = 'none';
            if (newsletterHeader) newsletterHeader.style.display = 'none';
            newsletterSuccess.style.display = 'flex';
          } else {
            throw error;
          }
        } else {
          showToast('Subscribed securely! Incoming soon.', 'success');
          
          // Show success state
          newsletterForm.style.display = 'none';
          if (newsletterHeader) newsletterHeader.style.display = 'none';
          newsletterSuccess.style.display = 'flex';
        }
        
        newsletterForm.reset();
        
      } catch (err) {
        console.error('Error submitting newsletter form:', err);
        showToast('Something went wrong. Please try again.', 'error');
      } finally {
        btn.innerHTML = originalText;
        btn.style.opacity = '1';
        btn.disabled = false;
      }
    });
  }
}


// ================================================================
// SUCCESS ANIMATION OVERLAY
// ================================================================
function showSuccessAnimation() {
  const existingOverlay = document.getElementById('successOverlay');
  if (existingOverlay) existingOverlay.remove();

  const overlayHTML = `
    <div class="success-overlay" id="successOverlay">
      <div class="success-check-wrapper">
        <svg class="success-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle class="success-checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
          <path class="success-checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
      </div>
      <h2 class="w3-heading-large" style="margin-bottom: 12px; font-size: 36px; text-align: center;">Booking Confirmed</h2>
      <p class="w3-text-muted" style="text-align: center; max-width: 400px; margin-bottom: 32px;">
        Your request has been securely placed. We will contact you shortly.
      </p>
      <a href="index.html" class="w3-btn-pill" style="text-decoration: none;">
        <div class="w3-btn-pill-inner-light">Return to Home</div>
      </a>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', overlayHTML);
  
  // Trigger animation slightly after DOM insertion to ensure transitions fire
  setTimeout(() => {
    document.getElementById('successOverlay').classList.add('active');
  }, 50);
}
