# 🎨 AutoStack — Web3 Design + Full Structure
## Antigravity Prompts: Web3 aesthetic + your original page content

---

## 🌐 GLOBAL DESIGN SYSTEM (Paste before EVERY page prompt)

```
DESIGN SYSTEM — Apply to every page:

Font: "General Sans" from Fontshare (https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap)

Background: Pure black #000000 throughout all pages

Background Video (hero sections only):
URL: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260217_030345_246c0224-10a4-422c-b324-070b7c0eceda.mp4
Fullscreen, muted, autoplay, loop, playsInline
Covered by 50% black overlay (bg-black/50) for readability

Color Palette:
- Background: #000000
- Primary text: #FFFFFF
- Muted text: rgba(255,255,255,0.7)
- Very muted: rgba(255,255,255,0.5)
- Border: rgba(255,255,255,0.15)
- Card background: rgba(255,255,255,0.05)
- Card hover: rgba(255,255,255,0.08)

Text Gradient (headings):
linear-gradient(144.5deg, #FFFFFF 28%, rgba(0,0,0,0) 115%)
Applied as background-clip: text

NAVBAR (same on all pages):
- Pure black background, 120px horizontal padding, 20px vertical padding
- Left: Logo wordmark "AutoStack" in white 187px wide
- Nav links (14px, font-medium, white): "Services", "Projects", "Pricing", "About", "Blog"
  Each link has small white chevron-down icon (14px gap)
- Right: Pill button "Book a Call"
  Construction: 0.6px solid white outer border → black inner pill → white text
  White glow streak along top edge of button
  Padding: 29px horizontal, 11px vertical
- Nav links hidden on mobile, hamburger menu appears

PILL BUTTON STYLE (primary — white bg):
- Outer: 0.6px solid white border, fully rounded
- Inner: white background pill
- Text: 14px font-medium black
- Padding: 29px horizontal, 11px vertical
- White glow streak on top edge

PILL BUTTON STYLE (secondary — black bg):
- Outer: 0.6px solid white border, fully rounded
- Inner: black background pill
- Text: 14px font-medium white
- Same padding and glow streak

BADGE/PILL STYLE:
- border-radius: 20px
- Background: rgba(255,255,255,0.1)
- Border: 1px solid rgba(255,255,255,0.2)
- 4px white dot + text inside
- Font: 13px font-medium

CARDS:
- Background: rgba(255,255,255,0.05)
- Border: 1px solid rgba(255,255,255,0.1)
- Border-radius: 16px
- Hover: rgba(255,255,255,0.08) + border brightens slightly
- Transition: all 0.2s ease

SECTION PADDING: 120px top/bottom on desktop, 60px on mobile
CONTENT MAX WIDTH: 1200px centered
RESPONSIVE: Mobile-first, nav collapses below md breakpoint
```

---

## PAGE 1: LANDING PAGE

```
[PASTE GLOBAL DESIGN SYSTEM ABOVE FIRST]

Build a full landing page for "AutoStack" — an AI automation agency
for small businesses. Use the Web3 design system above throughout.

HERO SECTION:
Fullscreen height. Looping background video with 50% black overlay.
All content centered on top of video.

Top: Badge pill reading:
"● Now accepting new clients · Starting ₹4,999"

Heading (max-width 700px, 56px desktop / 36px mobile, font-medium, line-height 1.28):
"AI Systems That Run Your Business While You Sleep"
Apply text gradient: white at top fading to transparent at bottom.

Subtitle (15px, 70% white opacity, max-width 680px, centered):
"From chatbots to full automation backends — we build AI systems
for small businesses who want to compete like big companies.
Powered by n8n, RAG, and Supabase."

Two CTA buttons side by side (40px gap):
Button 1 (primary white): "Order Your Solution →"
Button 2 (secondary black): "View Our Work"

STATS ROW (below hero, pure black bg):
3 stats in a horizontal row with dividers between them:
"10+ Projects Built" | "5+ AI Systems Live" | "100% Automated"
Each stat: large number in white (40px bold), label below in 70% opacity
Subtle top border line across the row: 1px rgba(255,255,255,0.1)

SERVICES PREVIEW SECTION (black bg):
Badge pill at top: "● What We Build"

Section heading (gradient text, 40px):
"AI Solutions For Every Business Need"

Subtitle (muted, centered):
"Pick what your business needs — we build and deploy it fast"

4 service cards in a row (2x2 on mobile):
Card 1: 🤖 AI Chatbots
  "Smart chatbots trained on your data. Answer customer queries
  24/7 on WhatsApp, website, or anywhere."
  Bottom: "Starting ₹4,999 →"

Card 2: 🔍 RAG Systems
  "AI that searches your documents and gives instant accurate answers.
  Upload PDFs, Excel, docs — it learns everything."
  Bottom: "Starting ₹9,999 →"

Card 3: ⚙️ n8n Automation
  "Automate repetitive tasks with powerful workflows. Email alerts,
  WhatsApp triggers, data pipelines — all automated."
  Bottom: "Starting ₹6,999 →"

Card 4: 📊 Full AI Backend
  "Complete AI backend system with n8n + Supabase + RAG.
  Everything your business needs to run on autopilot."
  Bottom: "Starting ₹19,999 →"

Each card:
- Card style from design system (dark glass)
- Icon in white circle (40px)
- Title: 18px font-semibold white
- Description: 14px 70% white opacity
- Bottom link: white with → arrow, brightens on hover

HOW IT WORKS SECTION (black bg):
Badge: "● Simple Process"
Heading (gradient): "From Problem to Solution in 3 Steps"

3 steps in a horizontal row connected by dotted white line:
Step 1: "01" (large muted number) — "Describe Your Problem"
  "Fill our intake form — tell us your business type,
  problem, and budget. Takes 3 minutes."

Step 2: "02" — "We Build Your AI System"
  "Custom built using n8n, RAG, and Supabase.
  Delivered in 7–30 days depending on complexity."

Step 3: "03" — "Your Business Runs Smarter"
  "Your AI system handles the heavy lifting.
  You focus on growing your business."

Each step: number in 60px font at 20% opacity, title 18px white,
desc 14px muted. Dotted line connecting the 3 circles.

PROJECTS PREVIEW (black bg):
Badge: "● Recent Work"
Heading (gradient): "Projects We've Shipped"

3 project cards in a row:
Card 1: RAG Hybrid Search
  Tags: [n8n] [Qdrant] [RAG] [Python]
  "Hybrid search using Qdrant — BM25 + Semantic + Query Decomposition"
  "View Project →"

Card 2: Excel & Table RAG Pipeline
  Tags: [n8n] [Qdrant] [Supabase]
  "Tabular data vectorization and hybrid indexing for Excel/CSV"
  "View Project →"

Card 3: KLI Analytics Backend
  Tags: [n8n] [Supabase] [Dashboard]
  "Complete n8n AI backend for KLI Brands live application"
  "FEATURED badge" + "View Project →"

Tech tags: small pill badges — 12px, rgba(255,255,255,0.1) bg,
white border, white text.

FINAL CTA SECTION:
Black background. Centered.
Heading (gradient, 48px): "Ready to Automate Your Business?"
Subtitle: "Book a free 20-minute call. We'll tell you exactly
what to build and how much it costs."
Primary white pill button: "Book Your Free Call →"
Below: muted text "No commitment · Free consultation · Reply within 24hrs"

FOOTER:
Pure black. Top border: 1px rgba(255,255,255,0.1)
Left: "AutoStack" wordmark + "AI Automation for Small Businesses"
Center: Nav links (Services / Projects / Pricing / About / Blog)
Right: "Built with n8n + ❤️ by Nithesh" + social icons
Bottom: "© 2024 AutoStack · India"
```

---

## PAGE 2: SERVICES / ORDER PAGE

```
[PASTE GLOBAL DESIGN SYSTEM ABOVE FIRST]

Build a services ordering page for AutoStack. Black background,
Web3 design system. User can browse and order AI services.

HERO (no video, just black bg):
Top padding 200px. Centered.
Badge: "● 6 Services Available"
Heading (gradient, 52px): "Choose Your AI Solution"
Subtitle: "Pick a service below and place your order.
Like an online store — but for AI systems."

FILTER BAR:
Horizontal scrollable pill filter row:
[All] [AI Chatbots] [RAG Systems] [Automation] [Dashboards] [Full Stack] [Custom]
Active pill: white bg + black text
Inactive pill: transparent + white border + white text
Smooth filter animation when switching categories

SERVICES GRID (2 columns, 3 rows = 6 cards):
Each card (card design from system):

Card structure:
TOP ROW: Service icon (white, 32px) + Category badge pill (top right)
TITLE: 20px font-semibold white
DESCRIPTION: 14px muted, 2-3 lines
FEATURES LIST: 4 items, each with "✓" in white, 13px muted text
DIVIDER: 1px rgba(255,255,255,0.1) line
BOTTOM ROW: Price left + "Order Now →" button right

SERVICES:

1. AI Chatbot for Business
   Category: [Chatbot]
   "Smart chatbot trained on your business data. Handles customer
   queries 24/7 on WhatsApp, website, or any platform."
   ✓ Custom trained on your data
   ✓ WhatsApp + Web integration
   ✓ Human handoff support
   ✓ Analytics dashboard
   Price: Starting ₹4,999 | Button: "Order Now →" (white pill)

2. RAG Knowledge System
   Category: [RAG]
   "AI that searches your documents and gives instant accurate answers.
   Upload PDFs, Excel files, Word docs — it learns everything."
   ✓ Upload PDFs, Excel, Docs
   ✓ Hybrid search (BM25 + Semantic)
   ✓ API access included
   ✓ Qdrant + Supabase backend
   Price: Starting ₹9,999 | Button: "Order Now →"

3. n8n Automation Workflow
   Category: [Automation]
   "Automate your repetitive business tasks with powerful workflows.
   Connect your tools — email, WhatsApp, sheets, CRM — all automated."
   ✓ Custom workflow design
   ✓ Webhook + API triggers
   ✓ Email & WhatsApp alerts
   ✓ Error handling included
   Price: Starting ₹6,999 | Button: "Order Now →"

4. Analytics Dashboard
   Category: [Dashboard]
   "Beautiful real-time dashboard to track your business data.
   Custom KPIs, charts, reports — all in one place."
   ✓ Real-time data updates
   ✓ Custom KPIs & metrics
   ✓ Mobile responsive
   ✓ Export reports
   Price: Starting ₹7,999 | Button: "Order Now →"

5. Full Website + AI Backend
   Category: [Full Stack]
   "Complete website with AI features and full n8n backend.
   Landing page, booking system, chatbot, automation — everything."
   ✓ Landing page + all pages
   ✓ Booking & order system
   ✓ AI chatbot integrated
   ✓ n8n + Supabase backend
   Price: Starting ₹19,999 | Button: "Order Now →"
   Add: "MOST POPULAR" badge pill top-right of card

6. Custom AI Project
   Category: [Custom]
   "Have a unique idea? Let's scope it together.
   We build custom AI systems for any business problem."
   ✓ Free discovery call
   ✓ Custom project scoping
   ✓ Flexible pricing
   ✓ Full source code included
   Price: Price on Request | Button: "Let's Talk →"

BOTTOM CTA SECTION:
"Not sure which service fits your problem?"
Subtitle: "Describe your problem in our intake form and
we'll recommend the right solution for free."
Primary button: "Describe My Problem →"
Secondary button: "Book a Free Call"
```

---

## PAGE 3: BOOKING / PROBLEM INTAKE PAGE

```
[PASTE GLOBAL DESIGN SYSTEM ABOVE FIRST]

Build a 4-step problem intake and booking page for AutoStack.
Black background, Web3 design. Concept: Smart order form.

HERO:
No video. Black bg. Top padding 160px.
Badge: "● Free Discovery · No Commitment"
Heading (gradient, 48px): "Tell Us About Your Problem"
Subtitle: "Fill this in — takes 3 minutes. We'll review and
get back within 24 hours with a clear plan and price."

STEP PROGRESS BAR:
Below hero. Full width. Max-width 700px centered.
4 steps connected by thin line:
● Step 1: Your Business
● Step 2: Your Problem
● Step 3: Budget & Details
● Step 4: Book Your Call

Active step: white filled circle + white label
Completed step: white circle with ✓ checkmark
Upcoming step: outlined circle + muted label
Connecting line: rgba(255,255,255,0.2), completed portion turns white

STEP 1 — Your Business:
Large label (20px white): "What type of business do you run?"

5 selection cards in a row (wrap on mobile):
[🛒 E-Commerce] [🍽️ Restaurant] [🏥 Healthcare] [🎓 Education] [💼 Other]

Each option card:
- Card style from system
- Icon 32px centered
- Label 14px white below
- Selected: white border 1px solid + rgba(255,255,255,0.1) bg + white checkmark top-right
- Unselected: default card style
- Click animation: subtle scale 0.98 then back

Below: text input
"Your business name (optional)"
Input style: black bg, 1px white/20% border, white text,
14px, padding 16px, border-radius 12px, focus: border turns white

"Next →" white pill button bottom right

STEP 2 — Your Problem:
Label: "What do you need help with?"
Subtitle muted: "Select all that apply"

Checkbox cards (vertical list, full width):
□ I need an AI Chatbot for my business
□ I want to automate my repetitive tasks
□ I need a RAG / Document search system
□ I need a full AI backend system
□ I need an analytics dashboard
□ Something else

Each checkbox card:
- Full width card, flex row
- Left: custom checkbox (black square, white border → white fill + ✓ when checked)
- Right: title 15px white + subtitle 13px muted
- Selected: card bg brightens slightly
- Animated check on select

Below: "Describe your main problem" textarea
- Textarea styled same as inputs above
- Placeholder: "e.g. I run a restaurant and I want to automate
  my order confirmations and send WhatsApp messages to customers..."
- Min-height 120px
- Character count bottom right in muted text

Navigation: "← Back" secondary pill + "Next →" primary pill

STEP 3 — Budget & Details:
Label: "What's your budget range?"

5 budget pills in a row:
[Under ₹5K] [₹5K–₹10K] [₹10K–₹25K] [₹25K–₹50K] [₹50K+]
Selected: white bg black text
Unselected: outlined

Below: "Expected delivery timeline?"
3 option pills: [ASAP (1-2 weeks)] [1 Month] [Flexible]

Below: Two inputs side by side:
"Your Name *" | "Your Email *"
Below: "Your WhatsApp Number"
All styled as black inputs with white border.

Navigation: "← Back" + "Next →"

STEP 4 — Book Your Call:
Label: "Pick a time for your free discovery call"
Subtitle: "20 minutes · Google Meet · Free · No commitment"

Calendar widget:
- Black bg card
- Month navigation (← March 2026 →) in white
- 7-column date grid
- Available dates: white text, hover: white circle bg + black text
- Selected: white circle bg + black text + checkmark
- Unavailable: 30% opacity

Time slots (below calendar):
"Morning" | "Afternoon" | "Evening" tabs
Slots as pill buttons: [10:00 AM] [11:00 AM] [2:00 PM] [3:00 PM] [4:00 PM]
Selected slot: white bg black text

Timezone note: muted 13px "All times in IST (Asia/Kolkata)"

CONFIRM BUTTON:
Full width primary white pill: "Confirm Booking & Submit →"
Below: muted text "You'll receive a Google Meet link on your email"

SUCCESS STATE (after submit):
Large ✓ circle (white outline, animated draw)
Heading: "You're all set!"
Subtitle: "We've received your request. Check your email for
the Google Meet link. See you soon!"
```

---

## PAGE 4: PORTFOLIO / PROJECTS PAGE

```
[PASTE GLOBAL DESIGN SYSTEM ABOVE FIRST]

Build a portfolio/projects page for AutoStack. Black background,
Web3 design. Showcases all AI projects built by Nithesh.

HERO (black bg, no video):
Top padding 180px. Centered.
Badge: "● 4+ Projects Shipped"
Heading (gradient, 52px): "Projects We've Built"
Subtitle: "Real AI systems. Real businesses. Real results."

FILTER ROW:
Pill filters: [All] [RAG Systems] [Automation] [Dashboards] [Full Stack]
Active: white bg black text | Inactive: outlined

PROJECTS GRID (2 columns on desktop, 1 on mobile):

Card structure:
- Full card is clickable, links to project
- TOP: Project screenshot placeholder (16:9 ratio, rounded corners,
  dark gray fill with subtle gradient, or image if available)
  On hover: slight zoom scale 1.02 on image
- BELOW IMAGE:
  Row 1: Tech tags (pill badges) + Status badge ("LIVE" or "FEATURED")
  Row 2: Project title (18px font-semibold white)
  Row 3: Description (14px muted, 2 lines)
  Row 4: "View Project →" link (white, underline on hover)

FEATURED CARD (KLI Analytics):
Full width span (colspan 2).
Split layout: left = screenshot, right = details.
"FEATURED" badge pill top-left.
Title 24px. Longer description. Two links: "View Project →" + "Live Demo →"
Right side has animated "LIVE" indicator (pulsing green dot + "Live" text)

THE 4 PROJECTS:

1. RAG Hybrid Search
   Tags: [n8n] [Qdrant] [RAG] [Python]
   Status: Completed
   "Hybrid search system using Qdrant with BM25 + Semantic search,
   Query Decomposition, and positive/negative similarity scoring."
   Link: View Project →

2. Excel & Table RAG Pipeline
   Tags: [n8n] [Qdrant] [RAG] [Supabase]
   Status: Completed
   "Tabular data vectorization pipeline. Injects Excel/CSV data
   into Qdrant with hybrid indexing for accurate table queries."
   Link: View Project →

3. Document RAG Pipeline
   Tags: [n8n] [Qdrant] [RAG]
   Status: Completed
   "Document ingestion and vectorization system. Processes PDFs
   and docs into Qdrant for hybrid semantic + keyword search."
   Link: View Project →

4. KLI Analytics Backend (FEATURED — full width)
   Tags: [n8n] [Supabase] [AI] [Dashboard]
   Status: [● LIVE]
   "Complete n8n AI backend for KLI Brands. Full production system
   with authentication, analytics dashboard, real-time data,
   and custom AI features. Currently live."
   Links: "View Case Study →" + "Visit Live App →"

BOTTOM CTA:
"Have a project idea?"
Heading (gradient): "Let's Build Something Together"
Subtitle: "Tell us your problem. We'll design and build the
perfect AI solution for your business."
Primary button: "Start Your Project →"
```

---

## PAGE 5: PRICING PAGE

```
[PASTE GLOBAL DESIGN SYSTEM ABOVE FIRST]

Build a pricing page for AutoStack. Black background, Web3 design.
3 tiers + comparison table + FAQ.

HERO:
No video. Black bg. Top padding 180px.
Badge: "● Transparent Pricing · No Hidden Costs"
Heading (gradient, 52px): "Simple, Clear Pricing"
Subtitle: "No surprises. Pay once, own it forever.
All projects include full documentation and 30-day support."

TOGGLE:
Pill toggle: [One-Time Payment] [Monthly Retainer]
Toggle switches with smooth slide animation.

PRICING CARDS (3 columns):

STARTER — ₹4,999:
Card style (standard dark glass).
Top: "STARTER" label badge
Price: "₹4,999" in 40px bold white
Period: "one-time payment" in muted 14px
Description: "Perfect for small businesses trying AI for the first time"
Features (with ✓):
✓ 1 AI Chatbot
✓ Basic n8n Workflow
✓ WhatsApp Integration
✓ 1 Month Support
✓ Full Documentation
CTA: Secondary black pill button "Get Started"

GROWTH — ₹14,999 (MIDDLE CARD):
Card: brighter border (1px solid rgba(255,255,255,0.4))
Slightly elevated (translateY -8px)
"MOST POPULAR" badge pill at top (white bg, black text)
Top: "GROWTH" label
Price: "₹14,999" in 40px bold white
Period: "one-time payment"
Description: "For businesses ready to go full AI automation"
Features:
✓ AI Chatbot + RAG System
✓ 3 n8n Automation Workflows
✓ WhatsApp + Web Integration
✓ Analytics Dashboard
✓ 3 Months Support
✓ Priority Response (24hr)
CTA: Primary white pill button "Choose Growth"

ENTERPRISE — Custom:
Card style standard.
Top: "ENTERPRISE" label
Price: "Custom" in 40px bold white
Period: "scoped per project"
Description: "Full AI transformation for growing businesses"
Features:
✓ Everything in Growth
✓ Full AI Backend System
✓ Custom Integrations
✓ Dedicated Support
✓ Monthly Strategy Calls
✓ Source Code Included
CTA: Secondary black pill button "Let's Talk"

COMPARISON TABLE:
Section heading: "What's Included?" (white, 28px)
Dark card containing full-width table:
- Header row: Feature | Starter | Growth | Enterprise
- Header bg: rgba(255,255,255,0.05)
- Rows alternate: transparent + rgba(255,255,255,0.02)
- ✓ = white checkmark | ✗ = muted cross

Features to compare:
AI Chatbot | ✓ | ✓ | ✓
RAG System | ✗ | ✓ | ✓
n8n Workflows | 1 | 3 | Unlimited
WhatsApp Integration | ✓ | ✓ | ✓
Analytics Dashboard | ✗ | ✓ | ✓
Support Duration | 1 Month | 3 Months | Ongoing
Source Code | ✗ | ✗ | ✓
Strategy Calls | ✗ | ✗ | Monthly
Custom Integrations | ✗ | ✗ | ✓

FAQ SECTION:
Heading: "Common Questions" (white, 28px)
Accordion items (full width, card style):
Each item: question row (flex between question + + icon)
Expanded: answer slides down with smooth animation

Q: How long does a project take?
A: Chatbots and simple automations take 7–10 days. RAG systems
take 10–14 days. Full backends take 20–30 days. We'll give
you a clear timeline before starting.

Q: Do I get the source code?
A: Enterprise clients get full source code. Starter and Growth
clients get full access to deploy and use — source code available
as an add-on for ₹2,000.

Q: What if I'm not satisfied?
A: We do a review call before final delivery. If something isn't
right, we fix it. Your satisfaction is the deliverable.

Q: Can I pay in installments?
A: Yes — 50% upfront, 50% on delivery. We can discuss other
arrangements for larger projects.

FINAL CTA:
Heading (gradient): "Still Have Questions?"
Subtitle: "Book a free 20-minute call. No commitment, no pressure —
just a clear conversation about your business."
Primary button: "Book a Free Call →"
Muted below: "Typically reply within 2–4 hours"
```

---

## PAGE 6: ABOUT PAGE

```
[PASTE GLOBAL DESIGN SYSTEM ABOVE FIRST]

Build an about page for AutoStack / Nithesh Devarla.
Black background, Web3 design. Personal, trustworthy, developer-focused.

HERO:
No video. Black bg. Top padding 180px.
Badge: "● n8n Automation Engineer · India"
Heading (gradient, 52px): "Hi, I'm Nithesh Devarla"
Subtitle: "I build AI systems that automate the hard parts
of running a small business — so you can focus on what matters."

Split layout below heading:
Left (40%): Profile photo in card
  - Dark card with white border 1px
  - Photo inside with border-radius 12px
  - Below photo: name "Nithesh Devarla" 18px white
  - Below: "n8n Automation Engineer" 14px muted
  - Below: Location pin icon + "India 🇮🇳" muted
  - Row of social icon pills: GitHub | LinkedIn | Twitter

Right (60%): Story card (dark glass card)
  - Title: "The Story" 20px white
  - Body text (14px, 70% white, line-height 1.7):
    "I'm an n8n Automation Engineer specializing in RAG systems,
    hybrid search, and full AI backends.

    I started AutoStack because I saw small businesses struggling
    with tools built for enterprise — too complex, too expensive,
    too generic.

    I build practical AI systems using n8n, Qdrant, Supabase,
    and OpenAI — systems that actually solve real business problems
    without unnecessary complexity.

    Every project I ship is production-ready, documented, and
    built to work long after our engagement ends."

TECH STACK SECTION:
Badge: "● Tools I Use"
Heading (white, 28px): "Built With These Technologies"

Infinite scrolling ticker row (left to right):
n8n | Qdrant | Supabase | OpenAI | Python | PostgreSQL | RAG | Vercel | LangChain
Each item: dark glass pill with icon + name, white text
Smooth infinite scroll animation, no pause

STATS ROW:
3 stats in dark glass cards side by side:
"10+" — Projects Built
"5+" — AI Systems Live
"100%" — Client Satisfaction
Each: big number 48px white, label 14px muted below

WHAT I SPECIALIZE IN:
Badge: "● Expertise"
Heading (gradient, 36px): "What I Build Best"

3 specialty cards:
1. RAG & Hybrid Search
   "Qdrant-powered search systems with BM25 + Semantic hybrid
   retrieval, query decomposition, and reranking."
   Tags: [Qdrant] [RAG] [Python] [n8n]

2. n8n Automation Workflows
   "End-to-end automation pipelines. From webhook triggers to
   WhatsApp alerts to database updates — fully automated."
   Tags: [n8n] [Webhooks] [Supabase]

3. Full AI Backends
   "Complete backend systems with authentication, AI features,
   real-time data, and n8n orchestration. Production-ready."
   Tags: [n8n] [Supabase] [OpenAI] [Vercel]

FINAL CTA:
Heading (gradient): "Want to Work Together?"
Subtitle: "Book a free 20-minute call. I'll tell you exactly
what to build and how long it'll take."
Primary button: "Book a Free Call →"
Secondary button: "View My Projects →"
```