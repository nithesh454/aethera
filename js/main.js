// ============================================================
// AETHERA — Shared Main JS
// Navbar, Footer, Scroll Animations, Toasts
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initSmoothScroll();
  initForms();
  initStatsCounter();
  if (document.getElementById('calendar-grid')) {
    renderCalendar();
    updateTimeSlotLabels();
  }
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
// STATS COUNTER ANIMATION
// ================================================================
function initStatsCounter() {
  const counters = document.querySelectorAll('.stat-counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 2000; // 2 seconds
  const stepTime = 20; // 20ms steps
  const steps = duration / stepTime;
  const increment = target / steps;
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target === 0 ? "0" : target.toLocaleString();
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current).toLocaleString();
    }
  }, stepTime);
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

        // Combine Country Code and Phone Number for WhatsApp field
        const countryCode = formData.get('country_code') || '';
        const rawPhoneNumber = formData.get('client_phone_number') || '';
        const combinedWhatsapp = countryCode && rawPhoneNumber ? `${countryCode} ${rawPhoneNumber}` : (rawPhoneNumber || countryCode);

        // Fallback UUID v4 generator to bypass RLS SELECT restrictions
        const generateUUID = () => {
          if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
            return crypto.randomUUID();
          }
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
        };
        const orderId = generateUUID();

        const orderData = {
          id: orderId,
          client_name: formData.get('client_name'),
          client_email: formData.get('client_email'),
          client_whatsapp: combinedWhatsapp,
          business_name: formData.get('business_name') || null,
          business_type: formData.get('business_type') || null,
          problem_type: problemTypeStr || null,
          problem_description: formData.get('problem_description'),
          budget_max: formData.get('budget_max') ? parseFloat(formData.get('budget_max')) : null,
          source: 'website'
        };

        // Insert into 'orders' table without .select() to respect RLS insert-only policy
        const { error } = await window.supabaseClient
          .from('orders')
          .insert([orderData]);

        if (error) {
          console.error("Supabase Error Details:", error);
          throw error;
        }

        // Try inserting into 'bookings' table if calendar is selected
        const selectedDateVal = document.getElementById('selected-booking-date')?.value;
        const selectedTimeVal = document.getElementById('selected-booking-time')?.value;

        if (selectedDateVal && selectedTimeVal) {
          const scheduledAt = new Date(`${selectedDateVal}T${selectedTimeVal}:00+05:30`);
          const bookingData = {
            order_id: orderId,
            client_name: orderData.client_name,
            client_email: orderData.client_email,
            client_phone: orderData.client_whatsapp,
            scheduled_at: scheduledAt.toISOString(),
            booking_type: 'discovery',
            timezone: 'Asia/Kolkata',
            platform: 'google_meet'
          };

          const { error: bookingError } = await window.supabaseClient
            .from('bookings')
            .insert([bookingData]);

          if (bookingError) {
            console.error("Supabase Booking Error Details:", bookingError);
          }
        }
        
        showToast('Booking request sent successfully! We will contact you soon.', 'success');
        intakeForm.reset();
        
        // Reset selected slot styling and hidden inputs
        document.querySelectorAll('.time-slot').forEach(s => {
          s.style.background = 'rgba(255,255,255,0.02)';
          s.style.borderColor = 'rgba(255,255,255,0.1)';
          s.classList.remove('selected');
        });
        const dateInput = document.getElementById('selected-booking-date');
        if (dateInput) dateInput.value = '';
        const timeInput = document.getElementById('selected-booking-time');
        if (timeInput) timeInput.value = '';
        
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

// ================================================================
// DYNAMIC CALENDAR BOOKING SYSTEM
// ================================================================
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDate = '';
let selectedTime = '';

function renderCalendar() {
  const grid = document.getElementById('calendar-grid');
  const title = document.getElementById('calendar-month-title');
  if (!grid || !title) return;

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  title.textContent = `${monthNames[currentMonth]} ${currentYear}`;

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let html = dayNames.map(d => `<div class="calendar-day-name" style="font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.4); padding: 8px 0; text-transform: uppercase;">${d}</div>`).join('');

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    html += '<div class="calendar-day empty" style="padding: 8px 0;"></div>';
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(currentYear, currentMonth, d);
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const isPast = date < today;
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const isSelected = selectedDate === dateStr;

    let classes = 'calendar-day';
    let style = 'padding: 10px 4px; border-radius: 8px; font-size: 14px; color: rgba(255,255,255,0.6); cursor: pointer; transition: all 0.15s ease; border: none; background: none; font-family: var(--font-general); outline: none;';
    
    if (isPast || isWeekend) {
      classes += ' disabled';
      style += ' opacity: 0.25; cursor: default;';
    } else {
      classes += ' available';
      style += ' color: white;';
    }
    
    if (isSelected) {
      classes += ' selected';
      style += ' background: white !important; color: black !important; box-shadow: 0 0 16px rgba(255,255,255,0.3); font-weight: 600;';
    }

    html += `<button type="button" class="${classes}" style="${style}" data-date="${dateStr}" ${isPast || isWeekend ? 'disabled' : ''} onclick="selectDate('${dateStr}', this)">${d}</button>`;
  }

  grid.innerHTML = html;
}

async function selectDate(dateStr, el) {
  selectedDate = dateStr;
  const dateInput = document.getElementById('selected-booking-date');
  if (dateInput) dateInput.value = dateStr;
  
  document.querySelectorAll('.calendar-day').forEach(d => {
    if (!d.classList.contains('disabled')) {
      d.style.background = 'none';
      d.style.color = 'white';
      d.style.fontWeight = 'normal';
      d.style.boxShadow = 'none';
    }
    d.classList.remove('selected');
  });
  
  el.classList.add('selected');
  el.style.background = 'white';
  el.style.color = 'black';
  el.style.fontWeight = '600';
  el.style.boxShadow = '0 0 16px rgba(255,255,255,0.3)';

  // Reset slot choice in inputs
  selectedTime = '';
  const timeInput = document.getElementById('selected-booking-time');
  if (timeInput) timeInput.value = '';

  await updateTimeSlotAvailability(dateStr);
}

function selectTimeSlot(timeStr, el) {
  selectedTime = timeStr;
  const timeInput = document.getElementById('selected-booking-time');
  if (timeInput) timeInput.value = timeStr;
  
  document.querySelectorAll('.time-slot').forEach(s => {
    s.style.background = 'rgba(255,255,255,0.02)';
    s.style.borderColor = 'rgba(255,255,255,0.1)';
    s.style.color = 'white';
    s.style.fontWeight = 'normal';
    s.classList.remove('selected');
  });
  
  el.classList.add('selected');
  el.style.background = 'rgba(255, 255, 255, 0.15)';
  el.style.borderColor = 'white';
  el.style.color = 'white';
  el.style.fontWeight = '600';
}

function calendarPrev() {
  currentMonth--;
  if (currentMonth < 0) { currentMonth = 11; currentYear--; }
  renderCalendar();
}

function calendarNext() {
  currentMonth++;
  if (currentMonth > 11) { currentMonth = 0; currentYear++; }
  renderCalendar();
}

function updateTimeSlotLabels() {
  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';
  const labelEl = document.querySelector('.time-slots-label');
  if (labelEl) {
    if (localTimezone === 'Asia/Kolkata' || localTimezone.includes('Calcutta')) {
      labelEl.innerHTML = `Available Time Slots (Asia/Kolkata - IST):`;
    } else {
      labelEl.innerHTML = `Available Time Slots (IST / Your Local Time - ${localTimezone}):`;
    }
  }

  const slotTimes = {
    '10:00': '10:00 AM',
    '11:30': '11:30 AM',
    '14:00': '02:00 PM',
    '15:30': '03:30 PM',
    '17:00': '05:00 PM'
  };

  const todayStr = selectedDate || new Date().toISOString().split('T')[0];

  document.querySelectorAll('.time-slot').forEach(slot => {
    const timeVal = slot.getAttribute('data-time');
    if (!timeVal) return;

    if (localTimezone === 'Asia/Kolkata' || localTimezone.includes('Calcutta')) {
      slot.textContent = slotTimes[timeVal];
    } else {
      // Calculate local time conversion
      // Construct date object using selectedDate or today in IST timezone (+05:30)
      const istString = `${todayStr}T${timeVal}:00+05:30`;
      const dateObj = new Date(istString);
      const formattedLocal = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
      slot.innerHTML = `${slotTimes[timeVal]} <span style="font-size: 11px; opacity: 0.75; display: block; margin-top: 2px;">(${formattedLocal} Local)</span>`;
    }
  });
}

async function fetchBookedSlots(dateStr) {
  if (!window.supabaseClient) return [];
  
  // Calculate start and end of day in UTC for the selected date in IST (+05:30)
  const start = new Date(`${dateStr}T00:00:00+05:30`).toISOString();
  const end = new Date(`${dateStr}T23:59:59+05:30`).toISOString();

  try {
    const { data, error } = await window.supabaseClient
      .from('bookings')
      .select('scheduled_at')
      .gte('scheduled_at', start)
      .lte('scheduled_at', end)
      .in('status', ['scheduled', 'confirmed']);

    if (error) {
      console.error("Error fetching booked slots:", error);
      return [];
    }

    return data.map(b => {
      const d = new Date(b.scheduled_at);
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).formatToParts(d);
      const hour = parts.find(p => p.type === 'hour')?.value || '00';
      const minute = parts.find(p => p.type === 'minute')?.value || '00';
      const normalizedHour = hour === '24' ? '00' : hour;
      return `${String(normalizedHour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    });
  } catch (e) {
    console.error("Exception in fetchBookedSlots:", e);
    return [];
  }
}

async function updateTimeSlotAvailability(dateStr) {
  // Show quick loading state on slots while querying
  document.querySelectorAll('.time-slot').forEach(s => {
    s.style.opacity = '0.5';
    s.style.pointerEvents = 'none';
  });

  const bookedSlots = await fetchBookedSlots(dateStr);

  document.querySelectorAll('.time-slot').forEach(s => {
    const slotTime = s.getAttribute('data-time');
    
    // Reset properties default
    s.style.opacity = '1';
    s.style.pointerEvents = 'auto';
    s.style.background = 'rgba(255,255,255,0.02)';
    s.style.borderColor = 'rgba(255,255,255,0.1)';
    s.style.color = 'white';
    s.style.textDecoration = 'none';
    s.classList.remove('selected');

    if (bookedSlots.includes(slotTime)) {
      // Disable slot since it's already booked
      s.style.opacity = '0.2';
      s.style.pointerEvents = 'none';
      s.style.textDecoration = 'line-through';
      s.title = "This slot is already booked";
    }
  });

  // Re-calculate the local timezone conversion labels
  updateTimeSlotLabels();
}
