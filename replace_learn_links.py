import re

with open('learn.html', 'r') as f:
    content = f.read()

# Make sure all links in learning center that go to '#' or lessons point to the blogs
# Let's map them to the new blogs based on title
content = content.replace(
    '<a href="#" class="text-purple-400 hover:underline text-sm">Start Guide</a>',
    '<a href="blogs/blog7.html" class="text-purple-400 hover:underline text-sm">Start Guide</a>'
)
content = content.replace(
    '<h3 class="text-xl font-bold mb-2">How to Research a Stock</h3>\n                <p class="text-gray-400 text-sm mb-4">Learn how to read financial statements, evaluate management, and understand competitive moats.</p>\n                <a href="#" class="text-blue-400 hover:underline text-sm">Read Lesson</a>',
    '<h3 class="text-xl font-bold mb-2">How to Research a Stock</h3>\n                <p class="text-gray-400 text-sm mb-4">Learn how to read financial statements, evaluate management, and understand competitive moats.</p>\n                <a href="blogs/blog1.html" class="text-blue-400 hover:underline text-sm">Read Lesson</a>'
)
content = content.replace(
    '<h3 class="text-xl font-bold mb-2">How to Read a Research Report</h3>\n                <p class="text-gray-400 text-sm mb-4">Decode the jargon and understand the structure of professional analyst reports.</p>\n                <a href="#" class="text-green-400 hover:underline text-sm">Read Lesson</a>',
    '<h3 class="text-xl font-bold mb-2">How to Read a Research Report</h3>\n                <p class="text-gray-400 text-sm mb-4">Decode the jargon and understand the structure of professional analyst reports.</p>\n                <a href="blogs/blog4.html" class="text-green-400 hover:underline text-sm">Read Lesson</a>'
)
content = content.replace(
    '<h3 class="text-xl font-bold mb-2">Investment Mindset</h3>\n                <p class="text-gray-400 text-sm mb-4">Mastering your psychology: Avoiding FOMO, hype-driven decisions, and emotional biases.</p>\n                <a href="#" class="text-yellow-400 hover:underline text-sm">Read Lesson</a>',
    '<h3 class="text-xl font-bold mb-2">Investment Mindset</h3>\n                <p class="text-gray-400 text-sm mb-4">Mastering your psychology: Avoiding FOMO, hype-driven decisions, and emotional biases.</p>\n                <a href="blogs/blog2.html" class="text-yellow-400 hover:underline text-sm">Read Lesson</a>'
)
content = content.replace(
    '<h3 class="text-xl font-bold mb-2">Risk Management</h3>\n                <p class="text-gray-400 text-sm mb-4">Position sizing, portfolio diversification, and understanding downside protection.</p>\n                <a href="#" class="text-red-400 hover:underline text-sm">Read Lesson</a>',
    '<h3 class="text-xl font-bold mb-2">Risk Management</h3>\n                <p class="text-gray-400 text-sm mb-4">Position sizing, portfolio diversification, and understanding downside protection.</p>\n                <a href="blogs/blog5.html" class="text-red-400 hover:underline text-sm">Read Lesson</a>'
)
content = content.replace(
    '<h3 class="text-xl font-bold mb-2">Case Studies</h3>\n                <p class="text-gray-400 text-sm mb-4">Real-world examples of research-driven investing successes and failures.</p>\n                <a href="#" class="text-pink-400 hover:underline text-sm">View Cases</a>',
    '<h3 class="text-xl font-bold mb-2">Case Studies</h3>\n                <p class="text-gray-400 text-sm mb-4">Real-world examples of research-driven investing successes and failures.</p>\n                <a href="blogs/blog6.html" class="text-pink-400 hover:underline text-sm">View Cases</a>'
)

with open('learn.html', 'w') as f:
    f.write(content)

print("Updated learn.html links")
