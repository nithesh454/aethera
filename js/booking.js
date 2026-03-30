// ============================================================
// AETHERA — Booking / Intake Form JS
// Multi-step form, calendar, budget slider, submission
// ============================================================

let currentStep = 1;
const totalSteps = 4;
let formData = {
  business_type: '',
  name: '',
  business_name: '',
  email: '',
  phone: '',
  problems: [],
  problem_description: '',
  budget: '10000',
  selected_date: '',
  selected_time: '',
  service: ''
};

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', () => {
  // Check for pre-selected service from URL
  const params = new URLSearchParams(window.location.search);
  if (params.get('service')) {
    formData.service = params.get('service');
  }

  initBusinessTypeCards();
  initCheckboxes();
  initBudgetSlider();
  renderCalendar();
  initTimeSlots();
  updateStepIndicator();
});

// ================================================================
// STEP NAVIGATION
// ================================================================
function nextStep() {
  if (!validateStep(currentStep)) return;
  if (currentStep < totalSteps) {
    currentStep++;
    showStep(currentStep);
    updateStepIndicator();
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
    updateStepIndicator();
  }
}

function showStep(step) {
  document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(`step-${step}`);
  if (target) {
    target.classList.add('active');
    target.style.animation = 'none';
    target.offsetHeight; // trigger reflow
    target.style.animation = 'fadeInUp 0.4s ease';
  }
}

function updateStepIndicator() {
  document.querySelectorAll('.step-dot').forEach((dot, i) => {
    dot.classList.remove('active', 'completed');
    if (i + 1 === currentStep) dot.classList.add('active');
    else if (i + 1 < currentStep) {
      dot.classList.add('completed');
      dot.textContent = '✓';
    } else {
      dot.textContent = i + 1;
    }
  });

  document.querySelectorAll('.step-line').forEach((line, i) => {
    line.classList.toggle('completed', i + 1 < currentStep);
  });

  document.querySelectorAll('.step-label').forEach((label, i) => {
    label.classList.toggle('active', i + 1 === currentStep);
  });
}

function validateStep(step) {
  switch (step) {
    case 1:
      formData.name = document.getElementById('field-name')?.value?.trim() || '';
      formData.email = document.getElementById('field-email')?.value?.trim() || '';
      if (!formData.name || !formData.email) {
        showToast('Please fill in your name and email', 'error');
        return false;
      }
      if (!formData.email.includes('@')) {
        showToast('Please enter a valid email address', 'error');
        return false;
      }
      formData.business_name = document.getElementById('field-business')?.value?.trim() || '';
      formData.phone = document.getElementById('field-phone')?.value?.trim() || '';
      return true;
    case 2:
      if (formData.problems.length === 0) {
        showToast('Please select at least one problem area', 'error');
        return false;
      }
      formData.problem_description = document.getElementById('field-describe')?.value?.trim() || '';
      return true;
    case 3:
      return true; // Budget is always valid
    case 4:
      if (!formData.selected_date || !formData.selected_time) {
        showToast('Please select a date and time for your call', 'error');
        return false;
      }
      return true;
  }
  return true;
}

// ================================================================
// BUSINESS TYPE SELECTION
// ================================================================
function initBusinessTypeCards() {
  document.querySelectorAll('.business-type-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.business-type-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      formData.business_type = card.dataset.type;
    });
  });
}

// ================================================================
// CHECKBOXES
// ================================================================
function initCheckboxes() {
  document.querySelectorAll('.checkbox-item').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('checked');
      const value = item.dataset.value;
      if (item.classList.contains('checked')) {
        formData.problems.push(value);
      } else {
        formData.problems = formData.problems.filter(p => p !== value);
      }
    });
  });
}

// ================================================================
// BUDGET SLIDER
// ================================================================
function initBudgetSlider() {
  const slider = document.getElementById('budget-slider');
  const display = document.getElementById('budget-value');
  if (!slider || !display) return;

  const values = [5000, 10000, 25000, 50000, 75000, 100000];

  slider.addEventListener('input', () => {
    const idx = parseInt(slider.value);
    const val = values[idx] || values[0];
    formData.budget = val;
    if (val >= 100000) {
      display.textContent = '₹1,00,000+';
    } else {
      display.textContent = '₹' + val.toLocaleString('en-IN');
    }
  });
}

// ================================================================
// CALENDAR
// ================================================================
function renderCalendar() {
  const grid = document.getElementById('calendar-grid');
  const title = document.getElementById('calendar-month-title');
  if (!grid || !title) return;

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  title.textContent = `${monthNames[currentMonth]} ${currentYear}`;

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let html = dayNames.map(d => `<div class="calendar-day-name">${d}</div>`).join('');

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    html += '<div class="calendar-day empty"></div>';
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(currentYear, currentMonth, d);
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const isPast = date < today;
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const isSelected = formData.selected_date === dateStr;

    let classes = 'calendar-day';
    if (isPast || isWeekend) classes += ' disabled';
    else classes += ' available';
    if (isSelected) classes += ' selected';

    html += `<button class="${classes}" data-date="${dateStr}" ${isPast || isWeekend ? 'disabled' : ''} onclick="selectDate('${dateStr}', this)">${d}</button>`;
  }

  grid.innerHTML = html;
}

function selectDate(dateStr, el) {
  formData.selected_date = dateStr;
  document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
  el.classList.add('selected');
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

// ================================================================
// TIME SLOTS
// ================================================================
function initTimeSlots() {
  document.querySelectorAll('.time-slot').forEach(slot => {
    slot.addEventListener('click', () => {
      document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
      slot.classList.add('selected');
      formData.selected_time = slot.dataset.time;
    });
  });
}

// ================================================================
// FORM SUBMISSION
// ================================================================
async function submitBooking() {
  if (!validateStep(4)) return;

  const btn = document.querySelector('.btn-submit-seal');
  btn.style.pointerEvents = 'none';
  btn.style.opacity = '0.6';

  // Build scheduled datetime
  const scheduledAt = new Date(`${formData.selected_date}T${formData.selected_time}:00`);
  const scheduledEnd = new Date(scheduledAt.getTime() + 30 * 60 * 1000);

  const payload = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    business_name: formData.business_name,
    business_type: formData.business_type,
    problem_type: formData.problems.join(', '),
    problem_description: formData.problem_description,
    budget: formData.budget,
    service: formData.service,
    scheduled_at: scheduledAt.toISOString(),
    scheduled_at_end: scheduledEnd.toISOString(),
    scheduled_at_display: scheduledAt.toLocaleString('en-IN', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata'
    }),
    client_name: formData.name,
    client_email: formData.email,
  };

  try {
    // Post to order webhook
    await postToWebhook(CONFIG.WEBHOOKS.NEW_ORDER, payload);
    // Post to booking webhook
    await postToWebhook(CONFIG.WEBHOOKS.BOOK_CALL, payload);

    showToast('🎉 Booking confirmed! Check your email for details.', 'success', 6000);

    // Show success state
    document.querySelector('.clipboard').innerHTML = `
      <div style="text-align:center; padding: 60px 20px;">
        <div style="font-size:64px; margin-bottom:20px;">✅</div>
        <h2 style="font-family:var(--font-display); font-size:28px; color:var(--text-dark); margin-bottom:12px;">Booking Confirmed!</h2>
        <p style="font-family:var(--font-body); color:var(--text-muted); margin-bottom:24px;">
          We've sent a confirmation email to <strong>${formData.email}</strong> with your meeting details.
        </p>
        <a href="index.html" class="btn-brass" style="display:inline-block;">← Back to Home</a>
      </div>
    `;
  } catch (err) {
    showToast('Something went wrong. Please try again or contact us directly.', 'error');
    btn.style.pointerEvents = '';
    btn.style.opacity = '';
  }
}
