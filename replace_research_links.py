import re

with open('research.html', 'r') as f:
    content = f.read()

# Replace links
content = content.replace(
    '<a href="#" class="text-green-400 hover:underline">Read Full Report &rarr;</a>',
    '<a href="assets/ireda%20portfolio%203.0.pdf" class="text-green-400 hover:underline">Read Full Report &rarr;</a>'
)

content = content.replace(
    '<a href="#" class="text-blue-400 hover:underline text-sm">View Analysis</a>',
    '<a href="assets/RTX%20CORP.pdf" class="text-blue-400 hover:underline text-sm">View Analysis</a>'
)

content = content.replace(
    '<a href="#" class="text-blue-400 hover:underline text-sm">View Report</a>',
    '<a href="assets/RTX%20CORP.pdf" class="text-blue-400 hover:underline text-sm">View Report</a>'
)

with open('research.html', 'w') as f:
    f.write(content)

print("Research links replaced")
