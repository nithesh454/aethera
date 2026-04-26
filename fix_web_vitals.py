import os
import re

html_files = [
    'index.html', 'about.html', 'blog.html', 'booking.html', 
    'chat.html', 'portfolio.html', 'pricing.html', 'services.html',
    'blog-post-01-rag.html', 'blog-post-02-lease.html', 'blog-post-03-real-estate.html',
    'industry-real-estate.html'
]

# 1. Update Sitemap
sitemap_content = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">"""

priority_map = {
    'index.html': '1.0',
    'services.html': '0.9',
    'booking.html': '0.9',
    'pricing.html': '0.8',
    'portfolio.html': '0.8',
    'blog.html': '0.8',
    'chat.html': '0.8',
    'about.html': '0.7',
}

for file in html_files:
    if not os.path.exists(file):
        continue
    url = "https://aethera.in/" if file == 'index.html' else f"https://aethera.in/{file}"
    priority = priority_map.get(file, '0.7')
    freq = 'weekly' if priority in ['1.0', '0.9'] else 'monthly'
    sitemap_content += f"""
  <url>
    <loc>{url}</loc>
    <lastmod>2026-04-26</lastmod>
    <changefreq>{freq}</changefreq>
    <priority>{priority}</priority>
  </url>"""

sitemap_content += "\n</urlset>"
with open('sitemap.xml', 'w', encoding='utf-8') as f:
    f.write(sitemap_content)


# 2. Fix CLS and INP in HTML files
def fix_cls_and_inp(content):
    # Add poster to video if not exists
    content = re.sub(r'(<video\s+[^>]*?)(\s*>)', 
                     lambda m: m.group(0) if 'poster=' in m.group(1) else f'{m.group(1)} poster="images/og-image.png"{m.group(2)}', 
                     content, flags=re.IGNORECASE)
                     
    # Add defer to script tags that have src
    content = re.sub(r'(<script\s+src="[^"]+"[^>]*?)(\s*>)',
                     lambda m: m.group(0) if 'defer' in m.group(1) or 'async' in m.group(1) else f'{m.group(1)} defer{m.group(2)}',
                     content, flags=re.IGNORECASE)
    
    return content

for file in html_files:
    if not os.path.exists(file):
        continue
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    updated_content = fix_cls_and_inp(content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(updated_content)

print("Finished fixing web vitals and generating sitemap.")
