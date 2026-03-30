# 🎯 Antigravity Prompt — Frontend JS (Calls Edge Functions)
## Give this to Antigravity to generate all frontend JS code

---

## PROMPT TO GIVE ANTIGRAVITY:

```
Generate a complete frontend JavaScript file for the AutoStack website.
Pure vanilla JS. No frameworks. Works with HTML files directly.

SUPABASE SETUP:
- Use Supabase JS SDK loaded via CDN
- URL: YOUR_SUPABASE_URL (user will replace)
- Anon Key: YOUR_SUPABASE_ANON_KEY (user will replace)
- Initialize as: const db = supabase.createClient(url, key)

EDGE FUNCTION URLS (server-side functions, replace with real URLs):
- Order handler:   https://YOUR_PROJECT.supabase.co/functions/v1/handle-order
- Booking handler: https://YOUR_PROJECT.supabase.co/functions/v1/handle-booking

THE CODE MUST HAVE THESE 12 FUNCTIONS:

─────────────────────────────────────────────────────────
FUNCTION 1: submitOrder(formData)
─────────────────────────────────────────────────────────
- Called when order form is submitted
- POST to edge function URL /handle-order with JSON body:
  { client_name, client_email, client_phone, business_name,
    business_type, problem_type, problem_description,
    service_name, budget_max }
- Edge function saves to DB + sends emails
- On success: show success message with order number
- On error: show error message
- Show loading spinner on button while waiting

─────────────────────────────────────────────────────────
FUNCTION 2: submitBooking(formData)
─────────────────────────────────────────────────────────
- Called when booking form is submitted
- POST to edge function URL /handle-booking with JSON body:
  { client_name, client_email, client_phone,
    scheduled_at (ISO string), problem_description }
- On success: show "Booking confirmed!" message
- On error: show error message

─────────────────────────────────────────────────────────
FUNCTION 3: submitContact(formData)
─────────────────────────────────────────────────────────
- Simple contact form — goes DIRECT to Supabase (no edge function)
- Insert into 'contact_messages' table: { name, email, phone, message, source_page }
- source_page = window.location.pathname
- On success: show thank you message
- On error: show error message

─────────────────────────────────────────────────────────
FUNCTION 4: loadServices(category)
─────────────────────────────────────────────────────────
- Query Supabase 'services' table directly
- Filter: is_active = true
- If category provided and not 'all': also filter by category
- Order by sort_order ascending
- Returns array of service objects
- On error: return empty array, log error

─────────────────────────────────────────────────────────
FUNCTION 5: renderServices(services, containerSelector)
─────────────────────────────────────────────────────────
- Takes array of services and a CSS selector string
- Generates HTML cards for each service
- Each card shows: name, short_desc, features array, price_from
- Price shows "Starting ₹X" or "Price on Request" if null
- Injects HTML into the container element
- Add click handler on each "Order Now" button that calls
  openOrderModal(service) function

─────────────────────────────────────────────────────────
FUNCTION 6: loadProjects(category)
─────────────────────────────────────────────────────────
- Query Supabase 'projects' table directly
- Filter: is_published = true
- If category and not 'all': filter by category
- Order: is_featured DESC, sort_order ASC
- Returns array of project objects

─────────────────────────────────────────────────────────
FUNCTION 7: renderProjects(projects, containerSelector)
─────────────────────────────────────────────────────────
- Generates project cards
- Each card: title, short_desc, tech_tags as pill badges,
  project_url link, "FEATURED" badge if is_featured=true
- Injects into container

─────────────────────────────────────────────────────────
FUNCTION 8: loadPricing()
─────────────────────────────────────────────────────────
- Query Supabase 'pricing_packages' table directly
- Filter: is_active = true, order by sort_order
- Returns array

─────────────────────────────────────────────────────────
FUNCTION 9: loadBlogPosts(category, limit)
─────────────────────────────────────────────────────────
- Query Supabase 'blog_posts' table
- Select only: id, title, slug, excerpt, tags, category, read_time_mins, published_at
- Filter: is_published = true
- Order: published_at DESC
- Limit: default 10
- Returns array

─────────────────────────────────────────────────────────
FUNCTION 10: getBookedSlots(dateString)
─────────────────────────────────────────────────────────
- dateString format: 'YYYY-MM-DD'
- Query Supabase 'bookings' table
- Filter: scheduled_at between start and end of that day
- Filter: status in ('scheduled', 'confirmed')
- Return array of booked hours e.g. [10, 14, 15]
- Used by booking calendar to disable taken slots

─────────────────────────────────────────────────────────
FUNCTION 11: initServiceFilter(filterContainerSelector, serviceContainerSelector)
─────────────────────────────────────────────────────────
- Sets up click handlers on filter pill buttons
- When filter pill clicked:
  - Remove 'active' class from all pills
  - Add 'active' class to clicked pill
  - Call loadServices(category) with that category
  - Call renderServices() with result
- Category value comes from data-category attribute on button

─────────────────────────────────────────────────────────
FUNCTION 12: initChatbot(chatContainerSelector)
─────────────────────────────────────────────────────────
- Simple chatbot UI inside given container
- Shows message input + send button
- On send: POST to edge function /chat with { question, history }
- Display user message + AI response in chat bubbles
- Show typing indicator while waiting
- Keep conversation history as array in memory
- Edge function URL: https://YOUR_PROJECT.supabase.co/functions/v1/chat

─────────────────────────────────────────────────────────
ALSO INCLUDE THESE UTILITY FUNCTIONS:
─────────────────────────────────────────────────────────

showLoading(buttonElement)
  - Disable button, change text to "Sending...", add spinner

hideLoading(buttonElement, originalText)
  - Re-enable button, restore original text

showSuccess(message)
  - Show a toast notification (top right, black bg, white text)
  - Auto-dismiss after 4 seconds

showError(message)
  - Show red-tinted toast notification
  - Auto-dismiss after 5 seconds

formatPrice(price)
  - If null: return "Price on Request"
  - Else: return "Starting ₹" + price.toLocaleString('en-IN')

─────────────────────────────────────────────────────────
INITIALIZATION:
─────────────────────────────────────────────────────────
At bottom of file, auto-initialize on DOM ready:

document.addEventListener('DOMContentLoaded', async () => {
  // Services page
  if (document.querySelector('#services-grid')) {
    const services = await loadServices()
    renderServices(services, '#services-grid')
    initServiceFilter('#service-filters', '#services-grid')
  }

  // Projects page
  if (document.querySelector('#projects-grid')) {
    const projects = await loadProjects()
    renderProjects(projects, '#projects-grid')
    initServiceFilter('#project-filters', '#projects-grid')
  }

  // Order form
  if (document.querySelector('#order-form')) {
    document.querySelector('#order-form').addEventListener('submit', async (e) => {
      e.preventDefault()
      const formData = Object.fromEntries(new FormData(e.target))
      await submitOrder(formData)
    })
  }

  // Booking form
  if (document.querySelector('#booking-form')) {
    document.querySelector('#booking-form').addEventListener('submit', async (e) => {
      e.preventDefault()
      const formData = Object.fromEntries(new FormData(e.target))
      await submitBooking(formData)
    })
  }

  // Contact form
  if (document.querySelector('#contact-form')) {
    document.querySelector('#contact-form').addEventListener('submit', async (e) => {
      e.preventDefault()
      const formData = Object.fromEntries(new FormData(e.target))
      await submitContact(formData)
    })
  }

  // Chatbot
  if (document.querySelector('#chatbot-container')) {
    initChatbot('#chatbot-container')
  }
})

─────────────────────────────────────────────────────────
STYLE NOTES FOR TOAST NOTIFICATIONS:
─────────────────────────────────────────────────────────
Success toast:
- position: fixed, top: 24px, right: 24px, z-index: 9999
- background: #111, border: 1px solid rgba(255,255,255,0.2)
- color: #fff, padding: 16px 24px, border-radius: 12px
- box-shadow: 0 8px 32px rgba(0,0,0,0.5)
- animation: slide in from right

Error toast:
- Same but border: 1px solid rgba(255,80,80,0.4)
- color: #ff6b6b for the message text
```

---

## HOW TO USE THIS IN ANTIGRAVITY

1. Open Antigravity
2. Start new file — name it `app.js`
3. Paste the prompt above
4. Antigravity will generate the complete JS file
5. Add this to every HTML page `<head>`:

```html
<!-- Supabase SDK -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<!-- Your generated JS -->
<script src="app.js" defer></script>
```

6. Replace in `app.js`:
   - `YOUR_SUPABASE_URL` → your actual URL
   - `YOUR_SUPABASE_ANON_KEY` → your actual key
   - `YOUR_PROJECT.supabase.co` → your project URL

---

## HTML HOOKS — Add these IDs to your HTML pages

```html
<!-- Services page -->
<div id="service-filters">
  <button class="filter-pill active" data-category="all">All</button>
  <button class="filter-pill" data-category="chatbot">Chatbots</button>
  <button class="filter-pill" data-category="rag">RAG</button>
  <button class="filter-pill" data-category="automation">Automation</button>
  <button class="filter-pill" data-category="dashboard">Dashboards</button>
</div>
<div id="services-grid"></div>

<!-- Projects page -->
<div id="project-filters">
  <button class="filter-pill active" data-category="all">All</button>
  <button class="filter-pill" data-category="rag">RAG</button>
  <button class="filter-pill" data-category="fullstack">Full Stack</button>
</div>
<div id="projects-grid"></div>

<!-- Order form -->
<form id="order-form">
  <input name="client_name" required />
  <input name="client_email" type="email" required />
  <input name="client_phone" />
  <input name="business_name" />
  <select name="business_type">...</select>
  <select name="problem_type">...</select>
  <textarea name="problem_description"></textarea>
  <input name="service_name" type="hidden" value="AI Chatbot" />
  <input name="budget_max" type="number" />
  <button type="submit">Order Now</button>
</form>

<!-- Booking form -->
<form id="booking-form">
  <input name="client_name" required />
  <input name="client_email" type="email" required />
  <input name="client_phone" />
  <input name="scheduled_at" type="datetime-local" required />
  <textarea name="problem_description"></textarea>
  <button type="submit">Confirm Booking</button>
</form>

<!-- Contact form -->
<form id="contact-form">
  <input name="name" required />
  <input name="email" type="email" required />
  <input name="phone" />
  <textarea name="message" required></textarea>
  <button type="submit">Send Message</button>
</form>

<!-- Chatbot -->
<div id="chatbot-container"></div>
```