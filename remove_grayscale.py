import os
import glob
import re

files = [
    'index.html',
    'blogs/index.html'
] + glob.glob('blogs/blog*.html')

for filepath in files:
    if not os.path.exists(filepath):
        continue

    with open(filepath, 'r') as f:
        content = f.read()

    # Match grayscale and group-hover:grayscale-0
    content = content.replace(' grayscale group-hover:grayscale-0', '')
    content = content.replace('grayscale group-hover:grayscale-0', '')
    # Just grayscale (for blog detail pages where group-hover might not be used)
    # But only inside class="..."

    # regex to remove grayscale class
    content = re.sub(r'(\bclass="[^"]*?)\bgrayscale\b([^"]*?")', r'\1\2', content)
    # clean up extra spaces
    content = re.sub(r'(\bclass="[^"]*?)\s{2,}([^"]*?")', r'\1 \2', content)

    with open(filepath, 'w') as f:
        f.write(content)

print("Grayscale classes removed")
