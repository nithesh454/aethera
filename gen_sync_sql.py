import os, re, json

filename = 'blog-post-01-rag.html'
with open(filename, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract data
title = re.search(r'<title>(.*?) \| Aethera</title>', content).group(1)
description = re.search(r'<meta name="description" content="(.*?)">', content).group(1)
slug = "blog-post-01-rag"
published_at = "2026-04-05"
category = "Tutorial"
tags = ["RAG", "n8n", "AI"]
read_time = 8

# Simple extraction of article body content (roughly)
# We'll just store the description as the content for now, or the first h2 + paragraph
# Actually, I'll try to extract the main content container
article_match = re.search(r'<!-- ARTICLE BODY -->(.*?)<!-- CTA Section -->', content, re.DOTALL)
article_content = article_match.group(1).strip() if article_match else ""

# Clean up HTML for the database content field
# In a real app we might store markdown or raw html. 
# Here we store the HTML section.

# Construct SQL
sql = f"""
INSERT INTO public.blog_posts (
  title, slug, excerpt, content, category, tags, read_time_mins, is_published, published_at
) VALUES (
  '{title.replace("'", "''")}', 
  '{slug}', 
  '{description.replace("'", "''")}', 
  '{article_content.replace("'", "''")}', 
  '{category}', 
  ARRAY['{"','".join(tags)}'], 
  {read_time}, 
  true, 
  '{published_at}'
) ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags,
  read_time_mins = EXCLUDED.read_time_mins,
  is_published = EXCLUDED.is_published,
  published_at = EXCLUDED.published_at;
"""

import sys
sys.stdout.reconfigure(encoding='utf-8')
print(sql)
