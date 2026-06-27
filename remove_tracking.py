import re

with open('index.html', 'r') as f:
    content = f.read()

tracking_pattern = re.compile(r'<section id="tracking".*?Tracking Insights.*?</div>\s*</div>\s*</div>\s*</section>', re.DOTALL)
content = tracking_pattern.sub('', content)

with open('index.html', 'w') as f:
    f.write(content)

with open('research.html', 'r') as f:
    content = f.read()

content = content.replace("Evaluating expense ratios and tracking errors.", "Evaluating expense ratios and managing risk.")
with open('research.html', 'w') as f:
    f.write(content)

print("Done")
