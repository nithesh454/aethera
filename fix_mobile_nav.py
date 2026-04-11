import os, re

pages = ['services.html', 'pricing.html', 'about.html', 'portfolio.html',
         'blog.html', 'booking.html', 'chat.html', 'blog-post-01-rag.html']

CORRECT_MOBILE_MENU = """
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

CORRECT_NAV_RIGHT = """    <div class="web3-nav-right">
      <button class="hamburger" aria-label="Toggle navigation menu">
        <div class="line line-1"></div>
        <div class="line line-2"></div>
        <div class="line line-3"></div>
      </button>
      <a href="booking.html" class="pill-btn-wrapper">
        <button class="pill-btn-dark">Book a Call</button>
      </a>
    </div>"""

for filename in pages:
    if not os.path.exists(filename):
        print(f"SKIP: {filename}")
        continue

    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Fix web3-nav to have position:relative if not already there
    content = content.replace(
        'class="web3-nav"',
        'class="web3-nav" style="position:relative;"'
    )
    # Don't double-add it
    content = content.replace(
        'style="position:relative;" style="position:relative;"',
        'style="position:relative;"'
    )

    # 2. Remove the old duplicated mobile-menu blocks (all of them)
    content = re.sub(
        r'\s*<div class="mobile-menu">.*?</div>\s*</div>',
        '',
        content,
        flags=re.DOTALL
    )

    # 3. Fix nav-right section to use proper hamburger + pill-btn-wrapper
    content = re.sub(
        r'<div class="web3-nav-right">.*?</div>\s*</nav>',
        CORRECT_NAV_RIGHT + '\n  </nav>\n',
        content,
        flags=re.DOTALL
    )

    # 4. Insert clean mobile menu right after </nav>
    content = content.replace(
        '</nav>\n',
        '</nav>\n' + CORRECT_MOBILE_MENU + '\n',
        1  # only first occurrence
    )

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"FIXED: {filename}")

print("\nDone! Mobile menus updated across all pages.")
