import os
import re

seo_config = {
    'index.html': {
        'title': 'Aethera — AI Automation for Small Businesses | n8n & RAG Systems India',
        'desc': 'We build AI chatbots, RAG systems, and n8n automation for small businesses in India. Starting ₹4,999. Book a free discovery call today.'
    },
    'services.html': {
        'title': 'AI Automation Services | Chatbots, RAG, n8n Workflows — Aethera India',
        'desc': 'Explore our AI automation services — chatbots, RAG knowledge systems, n8n workflows, dashboards, and full AI backends. Prices from ₹4,999.'
    },
    'portfolio.html': {
        'title': 'AI Projects Portfolio | RAG Systems & n8n Automation — Nithesh Devarla',
        'desc': 'See real AI systems we have built — RAG hybrid search, Excel pipelines, KLI Analytics backend. Built with n8n, Qdrant, and Supabase.'
    },
    'pricing.html': {
        'title': 'AI Automation Pricing India | Chatbots & RAG Systems from ₹4,999',
        'desc': 'Transparent AI automation pricing. Starter ₹4,999, Growth ₹14,999, Enterprise custom. One-time payment. 30-day support included.'
    },
    'about.html': {
        'title': 'About Nithesh Devarla | n8n Automation Engineer & AI Developer India',
        'desc': 'Nithesh Devarla is an n8n Automation Engineer from India building AI systems for small businesses using RAG, Qdrant, and Supabase.'
    },
    'blog.html': {
        'title': 'AI Automation Blog | n8n, RAG & Supabase Tutorials — Aethera',
        'desc': 'Tutorials and deep-dives on n8n automation, RAG systems, Supabase, and AI for small businesses. Written by Nithesh Devarla.'
    },
    'booking.html': {
        'title': 'Book a Call | Aethera AI Automation',
        'desc': 'Book a discovery call with Aethera to discuss your AI automation, RAG system, or n8n needs. Starting at ₹4,999.'
    },
    'chat.html': {
        'title': 'Ask AI | Aethera AI Assistant',
        'desc': 'Chat with the Aethera AI assistant to learn more about our AI automation services, pricing, and project timelines.'
    }
}

base_tags = """
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="keywords" content="n8n automation India, RAG system India, AI chatbot small business, Qdrant hybrid search, Supabase backend, AI automation agency India, n8n workflow developer, RAG pipeline developer, AI for small business India, automation engineer India">
  <meta name="author" content="Nithesh Devarla">
  <meta name="robots" content="index, follow">
  <meta name="language" content="English">

  <!-- Preconnect to external resources -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://cdn.jsdelivr.net">
  <link rel="dns-prefetch" href="https://api.resend.com">

  <!-- Favicon set -->
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#000000">

  <!-- Fonts -->
  <link rel="preload" as="style" href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap">
  <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap">
"""

def generate_seo_block(filename):
    if filename not in seo_config:
        return ""
    
    cfg = seo_config[filename]
    title = cfg['title']
    desc = cfg['desc']
    url = f"https://aethera.in/{filename}" if filename != 'index.html' else "https://aethera.in/"
    
    og_block = f"""
  <title>{title}</title>
  <meta name="description" content="{desc}">
  <link rel="canonical" href="{url}">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Aethera">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{desc}">
  <meta property="og:url" content="{url}">
  <meta property="og:image" content="https://aethera.in/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Aethera — AI Automation Agency India">
  <meta property="og:locale" content="en_IN">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@nitheshdevarla">
  <meta name="twitter:creator" content="@nitheshdevarla">
  <meta name="twitter:title" content="{title}">
  <meta name="twitter:description" content="{desc}">
  <meta name="twitter:image" content="https://aethera.in/og-image.png">
  <link rel="sitemap" type="application/xml" href="/sitemap.xml">
"""

    # Schemas
    schema1 = """
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Aethera",
    "url": "https://aethera.in",
    "logo": "https://aethera.in/images/logo.png",
    "description": "AI automation agency building chatbots, RAG systems, and n8n workflows for small businesses in India",
    "founder": {
      "@type": "Person",
      "name": "Nithesh Devarla",
      "jobTitle": "n8n Automation Engineer",
      "url": "https://aethera.in/about"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "nithesh@aethera.in",
      "availableLanguage": ["English", "Telugu"]
    },
    "sameAs": [
      "https://github.com/nitheshdevarla",
      "https://linkedin.com/in/nitheshdevarla"
    ]
  }
  </script>"""

    schemas = schema1
    
    if filename == 'about.html':
        schemas += """
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nithesh Devarla",
    "jobTitle": "n8n Automation Engineer & AI Developer",
    "url": "https://aethera.in/about.html",
    "worksFor": {
      "@type": "Organization",
      "name": "Aethera"
    },
    "knowsAbout": ["n8n", "RAG systems", "Qdrant", "Supabase", "AI automation", "LangChain"],
    "address": { "@type": "PostalAddress", "addressCountry": "IN" }
  }
  </script>"""

    if filename == 'services.html':
        schemas += """
  <script type="application/ld+json">
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
  </script>"""

    if filename in ['pricing.html', 'index.html']:
        schemas += """
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does an AI chatbot cost in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Aethera builds AI chatbots for small businesses starting at ₹4,999. This includes custom training on your data, WhatsApp and web integration, and 1 month of support."
        }
      },
      {
        "@type": "Question",
        "name": "What is a RAG system and how much does it cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A RAG (Retrieval Augmented Generation) system lets AI search through your documents and give accurate answers. Aethera builds RAG systems starting at ₹9,999 using Qdrant and n8n."
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
          "text": "Yes. Aethera specializes in n8n automation workflows for small businesses in India. We build custom workflows for WhatsApp alerts, email automation, data pipelines, and more. Starting at ₹6,999."
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
  </script>"""

    if filename == 'index.html':
        schemas += """
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Aethera",
    "url": "https://aethera.in",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://aethera.in/blog.html?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
  </script>"""

    return base_tags + og_block + schemas

mobile_menu_html = """
    <div class="mobile-menu">
      <div class="mobile-menu-inner">
        <a href="services.html">Services</a>
        <a href="portfolio.html">Projects</a>
        <a href="pricing.html">Pricing</a>
        <a href="about.html">About</a>
        <a href="blog.html">Blog</a>
        <a href="chat.html">Ask AI</a>
        <a href="booking.html" class="pill-btn-wrapper">
          <button class="pill-btn-light">Book a Call</button>
        </a>
      </div>
    </div>
"""

hamburger_btn = """        <button class="hamburger">
          <div class="line line-1"></div>
          <div class="line line-2"></div>
          <div class="line line-3"></div>
        </button>
"""

# Apply modifications
for filename in seo_config.keys():
    if not os.path.exists(filename):
        continue
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Clean old tags
    content = re.sub(r'<title>.*?</title>\s*', '', content, flags=re.IGNORECASE|re.DOTALL)
    content = re.sub(r'<meta name="description".*?>\s*', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<meta charset=.*?>\s*', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<meta name="viewport".*?>\s*', '', content, flags=re.IGNORECASE)
    # Removing any <script type="application/ld+json"> blocks so we don't duplicate
    content = re.sub(r'<script type="application/ld\+json">.*?</script>\s*', '', content, flags=re.IGNORECASE|re.DOTALL)

    # 2. Insert new SEO tags right before </head>
    seo_block = generate_seo_block(filename)
    content = content.replace("</head>", f"{seo_block}\n</head>")

    # 3. Hamburger icon insert
    # Check if hamburger already exists
    if '<button class="hamburger">' not in content:
        # Insert before `<a href="booking.html" class="pill-btn-wrapper">` inside `.web3-nav-right`
        content = re.sub(r'(<div class="web3-nav-right">\s*)<a href="booking.html"', r'\1' + hamburger_btn + r'        <a href="booking.html"', content)

    # 4. Mobile Menu insert
    if '<div class="mobile-menu">' not in content:
        # Insert after </nav>
        # We need to find the specific closing </nav> for the top level, or replace the first </nav> which works since there's typically only one navbar.
        content = re.sub(r'(</nav>)', r'\1\n' + mobile_menu_html, content, count=1)
        
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Successfully injected SEO tags and Mobile navigation into all files.")
