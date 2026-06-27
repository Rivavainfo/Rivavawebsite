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

    # Check if there are other R placeholders, like:
    # <div class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
    #     <span class="text-xl font-bold">R</span>
    # </div>
    # Let's use a broader regex or just replace known ones manually.

    # Fix the missing logo in learn.html and research.html and blogs/index.html
    # Some files just have <a href="index.html" class="text-2xl font-extrabold text-white">RIVAVA <span class="text-sm font-normal text-gray-400">| Academy</span></a>
    # Let's add the logo before "RIVAVA".

    # We will search for <a href="index.html" class="text-2xl font-extrabold text-white">RIVAVA
    # and replace with <a href="index.html" class="text-2xl font-extrabold text-white flex items-center gap-3"><img src="logo.png" class="h-8 w-8">RIVAVA

    new_content = re.sub(
        r'<a href="(?:\.\./)?index\.html" class="text-2xl font-extrabold text-white">\s*RIVAVA',
        f'<a href="{prefix}index.html" class="flex items-center gap-3 text-2xl font-extrabold text-white">\n                    <img src="{prefix}logo.png" alt="Rivava Logo" class="h-8 w-8 md:h-10 md:w-10 object-contain" onerror="this.onerror=null;this.src=\'https://placehold.co/40x40/000000/FFFFFF?text=R\';">\n                    RIVAVA',
        content
    )

    # Update Nav Links so they all point to the correct sections of index.html
    # In index.html:
    # <a href="#hero" class="text-gray-300 hover:text-white transition-colors">Home</a>
    # In other pages:
    # <a href="index.html#hero" class="text-gray-300 hover:text-white transition-colors">Home</a>
    # Let's ensure top nav links are consistent.

    with open(filepath, 'w') as f:
        f.write(new_content)

print("Done")
