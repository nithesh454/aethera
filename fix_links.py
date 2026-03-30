import os
import re

folder = r"C:\Users\DELL\Documents\N.Startup"
for f in os.listdir(folder):
    if f.endswith(".html") or f.endswith(".js"):
        path = os.path.join(folder, f)
        with open(path, "r", encoding="utf-8") as file:
            content = file.read()

        # Replace href="#" with href="blog.html" for Blog links
        content = re.sub(r'href="#"([^>]*>)\s*Blog\s*</a>', r'href="blog.html"\1Blog</a>', content, flags=re.IGNORECASE)

        # Add Ask AI to single-line Navbars
        if "chat.html" not in content:
            content = re.sub(
                r'(<li><a href="blog\.html"[^>]*>Blog</a></li>)', 
                r'\1\n        <li><a href="chat.html" class="web3-nav-link">Ask AI</a></li>', 
                content
            )
            
            # Add Ask AI to multi-line Navbars
            content = re.sub(
                r'(<li>\s*<a href="blog\.html"[^>]*>\s*Blog\s*</a>\s*</li>)', 
                r'\1\n          <li>\n            <a href="chat.html" class="web3-nav-link">\n              Ask AI\n            </a>\n          </li>', 
                content
            )
            
            # Add Ask AI to simple anchor footers
            content = re.sub(
                r'(<a href="blog\.html">Blog</a>)', 
                r'\1\n        <a href="chat.html">Ask AI</a>', 
                content
            )

        with open(path, "w", encoding="utf-8") as file:
            file.write(content)
print("Done")
