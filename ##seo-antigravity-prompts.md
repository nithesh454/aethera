# 🔍 AutoStack — Advanced SEO + Mobile Menu Antigravity Prompts

---

## PROMPT 1: SEO — Add This to EVERY HTML Page Head

```
Add advanced SEO optimization to this HTML page for AutoStack
— an AI automation agency by Nithesh Devarla from India.
Specializes in n8n automation, RAG systems, Qdrant, Supabase.
Audience: small business owners in India looking for AI solutions.

Add ALL of the following inside <head> tag:

─────────────────────────────────────────────────────
1. PRIMARY META TAGS
─────────────────────────────────────────────────────
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">

Title tag (60 chars max, keyword first):
PAGE          TITLE
Landing       AutoStack — AI Automation for Small Businesses | n8n & RAG Systems India
Services      AI Automation Services | Chatbots, RAG, n8n Workflows — AutoStack India
Projects      AI Projects Portfolio | RAG Systems & n8n Automation — Nithesh Devarla
Pricing       AI Automation Pricing India | Chatbots & RAG Systems from ₹4,999
About         About Nithesh Devarla | n8n Automation Engineer & AI Developer India
Blog          AI Automation Blog | n8n, RAG & Supabase Tutorials — AutoStack

Description tag (150 chars max, include CTA):
PAGE          DESCRIPTION
Landing       We build AI chatbots, RAG systems, and n8n automation for small businesses in India. Starting ₹4,999. Book a free discovery call today.
Services      Explore our AI automation services — chatbots, RAG knowledge systems, n8n workflows, dashboards, and full AI backends. Prices from ₹4,999.
Projects      See real AI systems we have built — RAG hybrid search, Excel pipelines, KLI Analytics backend. Built with n8n, Qdrant, and Supabase.
Pricing       Transparent AI automation pricing. Starter ₹4,999, Growth ₹14,999, Enterprise custom. One-time payment. 30-day support included.
About         Nithesh Devarla is an n8n Automation Engineer from India building AI systems for small businesses using RAG, Qdrant, and Supabase.
Blog          Tutorials and deep-dives on n8n automation, RAG systems, Supabase, and AI for small businesses. Written by Nithesh Devarla.

Keywords (use for each page):
<meta name="keywords" content="n8n automation India, RAG system India, AI chatbot small business, Qdrant hybrid search, Supabase backend, AI automation agency India, n8n workflow developer, RAG pipeline developer, AI for small business India, automation engineer India">

Author:
<meta name="author" content="Nithesh Devarla">
<meta name="robots" content="index, follow">
<meta name="language" content="English">
<link rel="canonical" href="https://autostack.in/PAGE_URL">

─────────────────────────────────────────────────────
2. OPEN GRAPH (Facebook, LinkedIn, WhatsApp previews)
─────────────────────────────────────────────────────
<meta property="og:type" content="website">
<meta property="og:site_name" content="AutoStack">
<meta property="og:title" content="SAME AS TITLE TAG">
<meta property="og:description" content="SAME AS DESCRIPTION TAG">
<meta property="og:url" content="https://autostack.in/PAGE_URL">
<meta property="og:image" content="https://autostack.in/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="AutoStack — AI Automation Agency India">
<meta property="og:locale" content="en_IN">

─────────────────────────────────────────────────────
3. TWITTER CARD
─────────────────────────────────────────────────────
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@nitheshdevarla">
<meta name="twitter:creator" content="@nitheshdevarla">
<meta name="twitter:title" content="SAME AS TITLE TAG">
<meta name="twitter:description" content="SAME AS DESCRIPTION TAG">
<meta name="twitter:image" content="https://autostack.in/og-image.png">

─────────────────────────────────────────────────────
4. STRUCTURED DATA — JSON-LD SCHEMAS
─────────────────────────────────────────────────────
Add these <script type="application/ld+json"> blocks:

SCHEMA 1 — Organization (add on ALL pages):
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AutoStack",
  "url": "https://autostack.in",
  "logo": "https://autostack.in/logo.png",
  "description": "AI automation agency building chatbots, RAG systems, and n8n workflows for small businesses in India",
  "founder": {
    "@type": "Person",
    "name": "Nithesh Devarla",
    "jobTitle": "n8n Automation Engineer",
    "url": "https://autostack.in/about"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "nithesh@autostack.in",
    "availableLanguage": ["English", "Telugu"]
  },
  "sameAs": [
    "https://github.com/nitheshdevarla",
    "https://linkedin.com/in/nitheshdevarla"
  ]
}

SCHEMA 2 — Person (add on About page):
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Nithesh Devarla",
  "jobTitle": "n8n Automation Engineer & AI Developer",
  "url": "https://autostack.in/about",
  "worksFor": {
    "@type": "Organization",
    "name": "AutoStack"
  },
  "knowsAbout": ["n8n", "RAG systems", "Qdrant", "Supabase", "AI automation", "LangChain"],
  "address": { "@type": "PostalAddress", "addressCountry": "IN" }
}

SCHEMA 3 — Service (add on Services page):
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "AI Automation Services",
  "description": "AI automation services for small businesses",
  "itemListElement": [
    {
      "@type": "Service",
      "position": 1,
      "name": "AI Chatbot for Business",
      "description": "Smart chatbot trained on your data for 24/7 customer support",
      "offers": { "@type": "Offer", "price": "4999", "priceCurrency": "INR" }
    },
    {
      "@type": "Service",
      "position": 2,
      "name": "RAG Knowledge System",
      "description": "AI that searches your documents using hybrid BM25 + semantic search",
      "offers": { "@type": "Offer", "price": "9999", "priceCurrency": "INR" }
    },
    {
      "@type": "Service",
      "position": 3,
      "name": "n8n Automation Workflow",
      "description": "Custom automation workflows connecting your business tools",
      "offers": { "@type": "Offer", "price": "6999", "priceCurrency": "INR" }
    },
    {
      "@type": "Service",
      "position": 4,
      "name": "Analytics Dashboard",
      "description": "Real-time business analytics dashboard with custom KPIs",
      "offers": { "@type": "Offer", "price": "7999", "priceCurrency": "INR" }
    },
    {
      "@type": "Service",
      "position": 5,
      "name": "Full Website + AI Backend",
      "description": "Complete website with AI chatbot and n8n automation backend",
      "offers": { "@type": "Offer", "price": "19999", "priceCurrency": "INR" }
    }
  ]
}

SCHEMA 4 — FAQ (add on Pricing + Landing page):
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does an AI chatbot cost in India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AutoStack builds AI chatbots for small businesses starting at ₹4,999. This includes custom training on your data, WhatsApp and web integration, and 1 month of support."
      }
    },
    {
      "@type": "Question",
      "name": "What is a RAG system and how much does it cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A RAG (Retrieval Augmented Generation) system lets AI search through your documents and give accurate answers. AutoStack builds RAG systems starting at ₹9,999 using Qdrant and n8n."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to build an AI automation system?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Simple chatbots take 7-10 days. RAG systems take 10-14 days. Full AI backends take 20-30 days. A clear timeline is provided before starting any project."
      }
    },
    {
      "@type": "Question",
      "name": "Do you build n8n workflows for small businesses?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. AutoStack specializes in n8n automation workflows for small businesses in India. We build custom workflows for WhatsApp alerts, email automation, data pipelines, and more. Starting at ₹6,999."
      }
    },
    {
      "@type": "Question",
      "name": "Can I get the source code for my project?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Enterprise clients receive full source code. Starter and Growth clients get full deployment access. Source code is available as an add-on for ₹2,000."
      }
    }
  ]
}

SCHEMA 5 — WebSite with SearchAction (Landing page only):
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "AutoStack",
  "url": "https://autostack.in",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://autostack.in/blog?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}

─────────────────────────────────────────────────────
5. PERFORMANCE & TECHNICAL SEO
─────────────────────────────────────────────────────
Add these for page speed (Google ranking factor):

<!-- Preconnect to external resources -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://cdn.jsdelivr.net">
<link rel="preconnect" href="https://YOUR_PROJECT.supabase.co">
<link rel="dns-prefetch" href="https://api.resend.com">

<!-- Favicon set -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#000000">

<!-- Fonts loaded efficiently -->
<link rel="preload" as="style" href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap">
<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap">

─────────────────────────────────────────────────────
6. ON-PAGE SEO — HTML STRUCTURE RULES
─────────────────────────────────────────────────────
Apply these rules to ALL page content:

HEADINGS HIERARCHY (critical for SEO):
- Only ONE <h1> per page
- h1 must contain primary keyword
- h2 for main sections
- h3 for subsections

PAGE SPECIFIC H1s:
Landing:  <h1>AI Automation for Small Businesses in India</h1>
Services: <h1>AI Automation Services — Chatbots, RAG & n8n Workflows</h1>
Projects: <h1>AI Projects Built by Nithesh Devarla</h1>
Pricing:  <h1>AI Automation Pricing — Transparent, No Hidden Costs</h1>
About:    <h1>Nithesh Devarla — n8n Automation Engineer from India</h1>
Blog:     <h1>AI Automation Blog — n8n, RAG & Supabase Insights</h1>

IMAGE ALT TAGS — every image must have descriptive alt:
Logo:     alt="AutoStack — AI Automation Agency India"
Hero:     alt="AI automation dashboard for small businesses"
Projects: alt="RAG hybrid search system built with n8n and Qdrant"

INTERNAL LINKING — add to every page:
- Landing page links to: Services, Projects, Pricing, About, Blog
- Services page links to: each service detail + Pricing + Book a Call
- Projects page links to: Services + About
- Blog posts link to: relevant services + booking page

ANCHOR TEXT for links (keyword rich):
Instead of: "Click here" or "Learn more"
Use: "View our RAG system service" or "Book a free AI consultation"
```

---

## PROMPT 2: MOBILE HAMBURGER MENU

```
Add a mobile hamburger menu to the existing navbar.
Black background, Web3 design with General Sans font.

CURRENT NAVBAR has:
- Left: "AutoStack" logo wordmark
- Center: nav links (Services, Projects, Pricing, About, Blog, Ask AI)
- Right: "Book a Call" pill button

WHAT TO ADD:

1. HAMBURGER BUTTON (mobile only, hidden on desktop):
- Position: right side of navbar, before "Book a Call"
- Only visible below 768px screen width
- Three horizontal lines icon (☰) in white
- Size: 24px × 24px
- No background, no border
- On click: toggles mobile menu open/closed
- Animated: lines transform into X when menu is open
  (top line rotates 45deg, middle fades out, bottom rotates -45deg)
  Smooth 0.3s transition

2. MOBILE MENU PANEL:
- Full width, drops down below navbar
- Background: #000000, border-bottom: 1px solid rgba(255,255,255,0.1)
- Hidden by default (height: 0, overflow: hidden)
- Opens with smooth slide-down animation (height auto, 0.3s ease)
- Closes with slide-up animation

MENU CONTENT (stacked vertically):
- Padding: 24px 32px
- Each nav link on its own row
- Font: General Sans, 16px, font-medium, white
- Padding per link: 16px 0
- Border-bottom between links: 1px solid rgba(255,255,255,0.08)
- Links: Services | Projects | Pricing | About | Blog | Ask AI
- On hover: text opacity goes from 100% to 70%
- On click: menu closes + navigates to page

At bottom of mobile menu:
- "Book a Call" full-width white pill button
- Same style as desktop but full width
- Margin-top: 24px

3. OVERLAY (optional but good UX):
- When menu open: semi-transparent overlay covers page behind menu
- background: rgba(0,0,0,0.5)
- Click overlay to close menu

4. CSS CLASSES NEEDED:
.hamburger { display: none; } /* hidden on desktop */
@media (max-width: 768px) {
  .hamburger { display: flex; }
  .nav-links { display: none; } /* hide desktop links */
  .desktop-cta { display: none; } /* hide desktop button */
}
.hamburger.active .line-1 { transform: rotate(45deg) translate(5px, 5px); }
.hamburger.active .line-2 { opacity: 0; }
.hamburger.active .line-3 { transform: rotate(-45deg) translate(5px, -5px); }
.mobile-menu { height: 0; overflow: hidden; transition: height 0.3s ease; }
.mobile-menu.open { height: auto; }

5. JAVASCRIPT:
const hamburger = document.querySelector('.hamburger')
const mobileMenu = document.querySelector('.mobile-menu')
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active')
  mobileMenu.classList.toggle('open')
})
// Close menu when link clicked
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active')
    mobileMenu.classList.remove('open')
  })
})
```

---

## PROMPT 3: FIX TAGLINE (Replace "AI will run your business while you sleep")

```
Replace the current hero heading and subtext with these
better, more human and trustworthy versions:

OLD (remove this):
"AI Systems That Run Your Business While You Sleep"

NEW OPTIONS — pick the best one:

Option A (Problem-focused):
H1: "Stop Doing the Same Tasks Every Day"
Sub: "We build AI systems that handle your repetitive work —
     customer queries, data entry, follow-ups — so you focus
     on growing your business."

Option B (Result-focused — RECOMMENDED):
H1: "AI Automation Built for Indian Small Businesses"
Sub: "From WhatsApp chatbots to full RAG systems — we build
     practical AI that actually works for your business.
     Starting ₹4,999. Delivered in 7–30 days."

Option C (Direct + trust):
H1: "We Build AI Systems That Solve Real Business Problems"
Sub: "Chatbots, automation workflows, RAG knowledge systems —
     built with n8n, Qdrant and Supabase. Practical AI,
     honest pricing, zero fluff."

USE OPTION B — it has:
✓ Geographic keyword (Indian Small Businesses) — good for SEO
✓ Specific products mentioned (chatbots, RAG)
✓ Price anchor (₹4,999) — builds trust immediately
✓ Timeline (7-30 days) — reduces uncertainty
✓ No hype or exaggeration
```

---

## PROMPT 4: sitemap.xml (Create This File)

```
Create a sitemap.xml file for AutoStack website.
This helps Google find and index all pages faster.

<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://autostack.in/</loc>
    <lastmod>2026-04-05</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://autostack.in/services.html</loc>
    <lastmod>2026-04-05</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://autostack.in/projects.html</loc>
    <lastmod>2026-04-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://autostack.in/pricing.html</loc>
    <lastmod>2026-04-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://autostack.in/about.html</loc>
    <lastmod>2026-04-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://autostack.in/blog.html</loc>
    <lastmod>2026-04-05</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://autostack.in/booking.html</loc>
    <lastmod>2026-04-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>

Save as sitemap.xml in root folder.
Then add to <head> of every page:
<link rel="sitemap" type="application/xml" href="/sitemap.xml">
```

---

## PROMPT 5: robots.txt (Create This File)

```
Create a robots.txt file in root folder:

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Sitemap: https://autostack.in/sitemap.xml
```

---

## AFTER BUILDING — DO THESE 3 THINGS:

1. Go to https://search.google.com/search-console
   → Add your domain → Verify → Submit sitemap URL

2. Go to https://pagespeed.web.dev
   → Test your site → Fix any red issues it shows

3. Go to https://developers.facebook.com/tools/debug/
   → Paste your URL → Check OG image shows correctly