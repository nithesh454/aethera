import os, re

pages = ['index.html', 'services.html', 'pricing.html', 'about.html', 'portfolio.html',
         'blog.html', 'booking.html', 'chat.html', 'blog-post-01-rag.html']

# Clean up duplicate "Ask AI" and fix link lists
pattern_nav_links = re.compile(r'<ul class="web3-nav-links">.*?</ul>', re.DOTALL)
clean_nav_links = """<ul class="web3-nav-links">
        <li><a href="services.html" class="web3-nav-link">Services</a></li>
        <li><a href="portfolio.html" class="web3-nav-link">Projects</a></li>
        <li><a href="pricing.html" class="web3-nav-link">Pricing</a></li>
        <li><a href="about.html" class="web3-nav-link">About</a></li>
        <li><a href="blog.html" class="web3-nav-link">Blog</a></li>
        <li><a href="chat.html" class="web3-nav-link">Ask AI</a></li>
      </ul>"""

for filename in pages:
    if not os.path.exists(filename): continue

    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Clean up the nav links
    content = pattern_nav_links.sub(clean_nav_links, content)

    # Ensure the mobile menu has all the links in the order the user wants
    # Pricing, Projects, Blog, Ask AI, Services, About
    mobile_menu_pattern = re.compile(r'<div class="mobile-menu-inner">.*?</div>', re.DOTALL)
    new_mobile_links = """<div class="mobile-menu-inner">
        <a href="pricing.html">Pricing</a>
        <a href="portfolio.html">Projects</a>
        <a href="blog.html">Blog</a>
        <a href="chat.html">Ask AI</a>
        <a href="services.html">Services</a>
        <a href="about.html">About</a>
        <a href="booking.html" class="pill-btn-wrapper">
          <button class="pill-btn-light">Book a Call</button>
        </a>
      </div>"""
    content = mobile_menu_pattern.sub(new_mobile_links, content)

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("HTML cleanup done.")
