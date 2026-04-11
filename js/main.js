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
        <a href="#" class="footer-social-link" aria-label="LinkedIn">in</a>
        <a href="#" class="footer-social-link" aria-label="Twitter">𝕏</a>
        <a href="#" class="footer-social-link" aria-label="GitHub">⌨</a>
        <a href="#" class="footer-social-link" aria-label="WhatsApp">✆</a>
      </div>
    </div>
    <div class="footer-bottom">
      © ${CONFIG.YEAR} ${CONFIG.BRAND_NAME} · Built with n8n + ❤️ by ${CONFIG.FOUNDER}
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
  
  if (newsletterForm && newsletterSuccess && localStorage.getItem('hasSubscribed') === 'true') {
    newsletterForm.style.display = 'none';
    if (newsletterHeader) newsletterHeader.style.display = 'none';
    newsletterSuccess.style.display = 'flex';
  }

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
            localStorage.setItem('hasSubscribed', 'true');
            showToast('You are already subscribed!', 'info');
            
            // Show success state
            newsletterForm.style.display = 'none';
            if (newsletterHeader) newsletterHeader.style.display = 'none';
            newsletterSuccess.style.display = 'flex';
          } else {
            throw error;
          }
        } else {
          localStorage.setItem('hasSubscribed', 'true');
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
