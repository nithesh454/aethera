import os
import re

# Comprehensive SEO configuration
seo_config = {
    'index.html': {
        'title': 'Aethera — AI Automation for Data-Heavy Businesses | Real Estate & Wholesale',
        'desc': 'Aethera builds AI systems that search large datasets, automate complex workflows, and deliver live dashboards. Custom RAG & n8n solutions from ₹4,999.'
    },
    'services.html': {
        'title': 'AI Automation Services | RAG Systems, n8n Workflows & Chatbots — Aethera',
        'desc': 'Deploy custom AI solutions: WhatsApp agents, RAG knowledge search, n8n automation, and full data analytics backends built on Supabase and Qdrant.'
    },
    'portfolio.html': {
        'title': 'AI Automation Portfolio | Built by Aethera India',
        'desc': 'Review Aethera\'s real-world AI systems: Hybrid RAG search pipelines, n8n invoice processing, and real-estate automation backends.'
    },
    'pricing.html': {
        'title': 'AI Automation Pricing | Transparent Costs from ₹4,999 — Aethera',
        'desc': 'Clear, transparent pricing for AI automation. Starter bots from ₹4,999, custom RAG systems from ₹14,999. Includes deployment and 30-day support.'
    },
    'about.html': {
        'title': 'About Nithesh Devarla | n8n Automation Engineer & Founder of Aethera',
        'desc': 'Learn about Nithesh Devarla, an n8n automation engineer from India specializing in RAG systems, Supabase architectures, and AI for business.'
    },
    'blog.html': {
        'title': 'AI Automation Blog | Technical Deep-Dives & Tutorials — Aethera',
        'desc': 'Read technical deep-dives on deploying n8n workflows, building RAG systems with Qdrant, and scaling operations with Supabase backends.'
    },
    'booking.html': {
        'title': 'Book a Discovery Call | Aethera AI Automation',
        'desc': 'Schedule a free consultation with Aethera to discuss implementing RAG document search or n8n workflow automation in your business.'
    },
    'chat.html': {
        'title': 'Ask the Aethera AI Assistant',
        'desc': 'Chat with our AI assistant to instantly find answers about Aethera services, technical capabilities, pricing, and project timelines.'
    },
    'industry-real-estate.html': {
        'title': 'AI Automation for Real Estate | Automate Leasing & Property Management',
        'desc': 'Discover 12 powerful AI automation systems for real estate: lease intelligence, instant lead follow-up, and automated maintenance tracking using n8n and RAG.'
    },
    'blog-post-01-rag.html': {
        'title': 'Build a RAG System with Qdrant, Supabase & n8n | Aethera Blog',
        'desc': 'A comprehensive technical guide to building a production-ready Retrieval-Augmented Generation (RAG) system using Qdrant, Supabase, and n8n workflows.'
    },
    'blog-post-02-lease.html': {
        'title': 'Automating Lease Agreements with AI Document Intelligence | Aethera',
        'desc': 'Learn how to automate lease processing, extract contract clauses instantly, and trigger expiry alerts using n8n and hybrid vector search.'
    },
    'blog-post-03-real-estate.html': {
        'title': 'Real Estate AI in 2026: 7 Industry Problems & 12 System Solutions',
        'desc': 'A deep-dive McKinsey-style report on how real estate agencies are using AI and n8n automation to solve their 12 most expensive operational bottlenecks.'
    }
}

base_tags = """
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="keywords" content="n8n automation India, RAG system India, AI chatbot small business, Qdrant hybrid search, Supabase backend, AI automation agency India, real estate AI, document intelligence">
  <meta name="author" content="Nithesh Devarla">
  <meta name="robots" content="index, follow">
  <meta name="language" content="English">

  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <meta name="theme-color" content="#000000">

  <!-- Performance: Preconnect & Font Loading -->
  <link rel="preconnect" href="https://api.fontshare.com" crossorigin>
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
  <meta property="og:type" content="{"article" if "blog-post" in filename else "website"}">
  <meta property="og:site_name" content="Aethera">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{desc}">
  <meta property="og:url" content="{url}">
  <meta property="og:image" content="https://aethera.in/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="{title}">
  <meta property="og:locale" content="en_IN">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@__aethera__ai">
  <meta name="twitter:creator" content="@__aethera__ai">
  <meta name="twitter:title" content="{title}">
  <meta name="twitter:description" content="{desc}">
  <meta name="twitter:image" content="https://aethera.in/og-image.png">
"""

    schemas = ""
    
    # Organization Schema (Global)
    if filename == 'index.html':
        schemas += """
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Aethera",
    "url": "https://aethera.in",
    "logo": "https://aethera.in/og-image.png",
    "description": "AI automation agency building chatbots, RAG systems, and n8n workflows.",
    "founder": {
      "@type": "Person",
      "name": "Nithesh Devarla"
    },
    "sameAs": [
      "https://github.com/nithesh454",
      "https://www.linkedin.com/in/nithesh-devarla-7a887a358"
    ]
  }
  </script>"""

    # Article Schema for Blog Posts
    if "blog-post" in filename:
        schemas += f"""
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "{title}",
    "description": "{desc}",
    "author": {{
      "@type": "Person",
      "name": "Nithesh Devarla",
      "url": "https://aethera.in/about.html"
    }},
    "publisher": {{
      "@type": "Organization",
      "name": "Aethera",
      "logo": {{
        "@type": "ImageObject",
        "url": "https://aethera.in/og-image.png"
      }}
    }},
    "datePublished": "2026-04-15",
    "dateModified": "2026-04-26"
  }}
  </script>
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://aethera.in/" }},
      {{ "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://aethera.in/blog.html" }},
      {{ "@type": "ListItem", "position": 3, "name": "{title.split('|')[0].strip()}", "item": "{url}" }}
    ]
  }}
  </script>"""

    return base_tags + og_block + schemas

# Execute Injection
for filename in seo_config.keys():
    if not os.path.exists(filename):
        continue
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Clean old tags aggressively
    content = re.sub(r'<title>.*?</title>\s*', '', content, flags=re.IGNORECASE|re.DOTALL)
    content = re.sub(r'<meta name="description".*?>\s*', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<link rel="canonical".*?>\s*', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<meta property="og:.*?>\s*', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<meta name="twitter:.*?>\s*', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<meta charset=.*?>\s*', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<meta name="viewport".*?>\s*', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<meta name="keywords".*?>\s*', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<meta name="author".*?>\s*', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<script type="application/ld\+json">.*?</script>\s*', '', content, flags=re.IGNORECASE|re.DOTALL)

    # Clean previous API fontshare imports to avoid duplicates
    content = re.sub(r'<link rel="preconnect" href="https://api\.fontshare\.com".*?>\s*', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<link rel="preload" as="style" href="https://api\.fontshare\.com.*?>\s*', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<link rel="stylesheet" href="https://api\.fontshare\.com.*?>\s*', '', content, flags=re.IGNORECASE)

    # Insert new SEO tags right before </head>
    seo_block = generate_seo_block(filename)
    content = content.replace("</head>", f"{seo_block}\n</head>")

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("✅ Successfully injected optimized SEO tags, Meta Descriptions, and Schema into all HTML files.")
