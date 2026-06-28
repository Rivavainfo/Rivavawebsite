import re

with open('research.html', 'r') as f:
    content = f.read()

# Replace first "Read Full Report" link with PDF preview pattern
content = content.replace(
    '<a href="#" class="text-green-400 hover:underline">Read Full Report &rarr;</a>',
    '<a href="donation.html" class="text-green-400 hover:underline">Read Full Report (IREDA) &rarr;</a>'
)

# Second link for Stock Research (Tech Giant Analysis AAPL vs MSFT doesn't have a PDF, but let's point to RTX as a placeholder for testing or change text)
content = content.replace(
    '<h3 class="text-lg font-bold mb-2">Tech Giant Analysis: AAPL vs MSFT</h3>',
    '<h3 class="text-lg font-bold mb-2">Defense Sector: RTX Corp</h3>'
)
content = content.replace(
    '<a href="#" class="text-blue-400 hover:underline text-sm">View Analysis</a>',
    '<a href="donation.html" class="text-blue-400 hover:underline text-sm">View Analysis (RTX CORP)</a>'
)

# And Fund Research report to point to donation
content = content.replace(
    '<a href="#" class="text-blue-400 hover:underline text-sm">View Report</a>',
    '<a href="donation.html" class="text-blue-400 hover:underline text-sm">View Report</a>'
)

with open('research.html', 'w') as f:
    f.write(content)

print("Updated research.html links")
