import urllib.request
import re
import os

url = "https://sites.google.com/view/nitheshdevarla/home"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
img_dir = r"C:\Users\DELL\Documents\N.Startup\images"
os.makedirs(img_dir, exist_ok=True)

try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    matches = re.findall(r'<img[^>]+src="([^">]+)"', html)
    
    # Google Sites usually has profile pictures/logos early. 
    # Real project images are usually later. Let's filter high-res ones
    valid_imgs = [s for s in matches if 'googleusercontent' in s and 'w1280' in s]
    
    for i, src in enumerate(valid_imgs[-4:]): # Grab the 4 project images
        dest = os.path.join(img_dir, f"portfolio_project_{i+1}.jpg")
        # Handle relative Google paths if any, but googleusercontent is absolute
        if src.startswith('//'):
            src = 'https:' + src
        print(f"Downloading {src} to {dest}")
        urllib.request.urlretrieve(src, dest)
except Exception as e:
    print(f"Error: {e}")
