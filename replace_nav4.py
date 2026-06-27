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

    # In index.html, we need to replace the R icon.
    # Pattern 1
    # <div class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
    #     <span class="text-xl font-bold">R</span>
    # </div>
    pattern1 = re.compile(r'<div class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">\s*<span class="text-xl font-bold">R</span>\s*</div>', re.MULTILINE)
    replacement1 = f'<img src="{prefix}logo.png" alt="Rivava Logo" class="h-10 w-10 object-contain" onerror="this.onerror=null;this.src=\'https://placehold.co/40x40/000000/FFFFFF?text=R\';">'
    content = pattern1.sub(replacement1, content)

    # Pattern 2
    # <div class="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
    #     <span class="text-white font-bold">R</span>
    # </div>
    pattern2 = re.compile(r'<div class="w-8 h-8 rounded bg-white/10 flex items-center justify-center">\s*<span class="text-white font-bold">R</span>\s*</div>', re.MULTILINE)
    replacement2 = f'<img src="{prefix}logo.png" alt="Rivava Logo" class="h-8 w-8 object-contain" onerror="this.onerror=null;this.src=\'https://placehold.co/40x40/000000/FFFFFF?text=R\';">'
    content = pattern2.sub(replacement2, content)

    # Some files just have <a href="index.html" class="text-2xl font-extrabold text-white">RIVAVA <span class="text-sm font-normal text-gray-400">| Academy</span></a>
    content = re.sub(
        r'<a href="(?:\.\./)?index\.html" class="text-2xl font-extrabold text-white">\s*RIVAVA',
        f'<a href="{prefix}index.html" class="flex items-center gap-3 text-2xl font-extrabold text-white">\n                    <img src="{prefix}logo.png" alt="Rivava Logo" class="h-8 w-8 md:h-10 md:w-10 object-contain" onerror="this.onerror=null;this.src=\'https://placehold.co/40x40/000000/FFFFFF?text=R\';">\n                    RIVAVA',
        content
    )

    with open(filepath, 'w') as f:
        f.write(content)

print("Done replacing R with logo.png")
