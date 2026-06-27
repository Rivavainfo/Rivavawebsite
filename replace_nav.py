import os
import glob
import re

files = [
    'index.html',
    'about.html',
    'contact.html',
    'learn.html',
    'research.html',
    'donation.html',
    'challenge.html',
    'terms-of-service.html',
    'privacy-policy.html'
] + glob.glob('blogs/*.html')

for filepath in files:
    if not os.path.exists(filepath):
        continue

    with open(filepath, 'r') as f:
        content = f.read()

    prefix = "../" if filepath.startswith("blogs/") else ""

    # 1. Replace the "R" block with the logo
    # <div class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
    #     <span class="text-xl font-bold">R</span>
    # </div>
    # OR
    # <div class="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
    #     <span class="text-white font-bold">R</span>
    # </div>
    pattern_r_div1 = re.compile(r'<div class="w-10 h-10 rounded-xl[^>]+>\s*<span class="[^>]+">R</span>\s*</div>', re.DOTALL)
    pattern_r_div2 = re.compile(r'<div class="w-8 h-8 rounded[^>]+>\s*<span class="[^>]+">R</span>\s*</div>', re.DOTALL)

    replacement = f'<img src="{prefix}logo.png" alt="Rivava Logo" class="h-10 w-10 object-contain" onerror="this.onerror=null;this.src=\'https://placehold.co/40x40/000000/FFFFFF?text=R\';">'

    new_content = pattern_r_div1.sub(replacement, content)
    new_content = pattern_r_div2.sub(replacement, new_content)

    # Write back
    with open(filepath, 'w') as f:
        f.write(new_content)

print("Done replacing logo 'R' divs")
