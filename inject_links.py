import os
import re

html_files = [
    'blog-post-01-rag.html', 'blog-post-02-lease.html', 'blog-post-03-real-estate.html',
    'industry-real-estate.html', 'about.html', 'services.html'
]

# Internal linking mapping: phrase -> url
# We only replace the first occurrence to avoid over-optimizing/spamming links
link_mapping = {
    r'\b(Aethera service)\b': '<a href="services.html" style="color: inherit; text-decoration: underline;">\g<1></a>',
    r'\b(n8n automation workflows?)\b': '<a href="services.html" style="color: inherit; text-decoration: underline;">\g<1></a>',
    r'\b(RAG system)\b': '<a href="blog-post-01-rag.html" style="color: inherit; text-decoration: underline;">\g<1></a>',
    r'\b(book a free call)\b': '<a href="booking.html" style="color: inherit; text-decoration: underline;">\g<1></a>',
    r'\b(AI chatbots?)\b': '<a href="services.html" style="color: inherit; text-decoration: underline;">\g<1></a>',
    r'\b(real estate problems?)\b': '<a href="industry-real-estate.html" style="color: inherit; text-decoration: underline;">\g<1></a>'
}

def inject_internal_links(content):
    # Only replace inside paragraphs <p> to avoid breaking tags/attributes
    def replace_in_p(match):
        p_content = match.group(0)
        # Avoid double linking if already inside an <a> tag
        if '<a ' in p_content:
            return p_content
        
        for pattern, replacement in link_mapping.items():
            # Replace only first occurrence per paragraph
            p_content, count = re.subn(pattern, replacement, p_content, count=1, flags=re.IGNORECASE)
        return p_content

    # Find all <p>...</p> blocks and apply replacement
    content = re.sub(r'<p[^>]*>.*?</p>', replace_in_p, content, flags=re.DOTALL)
    
    # Check heading structures (ensure no multiple H1s, etc.)
    # Simple fix: if there's more than one H1, change subsequent H1s to H2
    h1_matches = list(re.finditer(r'<h1[^>]*>.*?</h1>', content, flags=re.IGNORECASE | re.DOTALL))
    if len(h1_matches) > 1:
        # Keep the first, replace the rest
        for match in h1_matches[1:]:
            old_h1 = match.group(0)
            new_h2 = old_h1.replace('<h1', '<h2').replace('</h1>', '</h2>')
            content = content.replace(old_h1, new_h2, 1)

    return content

for file in html_files:
    if not os.path.exists(file):
        continue
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    updated_content = inject_internal_links(content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(updated_content)

print("Finished injecting internal links and checking heading hierarchy.")
