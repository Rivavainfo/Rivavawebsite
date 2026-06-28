import re

with open('index.html', 'r') as f:
    content = f.read()

# Replace iframe src to include #page=1 and update link to donation page.
pattern = re.compile(r'(<iframe src="assets/ireda%20portfolio%203.0.pdf)#(.*?)"', re.DOTALL)
content = pattern.sub(r'\1#page=1&\2"', content)

# Also wrap it or update the button link to donation.html
btn_pattern = re.compile(r'<button class="w-full py-2 bg-white/10 hover:bg-white/20 rounded text-sm font-medium transition-colors border border-white/5">Open Full Report</button>')
content = btn_pattern.sub(r'<a href="donation.html" class="block w-full py-2 text-center bg-white/10 hover:bg-white/20 rounded text-sm font-medium transition-colors border border-white/5">Open Full Report</a>', content)

# Add a blur overlay for the bottom half of the iframe
iframe_container_pattern = re.compile(r'(<div class="relative rounded-xl overflow-hidden bg-white/5 border border-white/10 aspect-\[3/4\] flex items-center justify-center group">)')
overlay_html = r'\1\n                            <div class="absolute inset-x-0 bottom-0 h-1/2 bg-black/40 backdrop-blur-sm z-10 pointer-events-none"></div>'
content = iframe_container_pattern.sub(overlay_html, content)

with open('index.html', 'w') as f:
    f.write(content)
print("Updated index.html PDF preview")
