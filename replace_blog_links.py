import re

with open('index.html', 'r') as f:
    content = f.read()

# Replace the read article divs with anchor tags linking to blog posts
# For blog card 1
content = content.replace(
    '<div class="read-more font-semibold text-sm">Read Article <i class="fas fa-arrow-right ml-1"></i></div>',
    '<a href="blogs/blog1.html" class="read-more font-semibold text-sm">Read Article <i class="fas fa-arrow-right ml-1"></i></a>',
    1
)

# For blog card 2
content = content.replace(
    '<div class="read-more font-semibold text-sm">Read Article <i class="fas fa-arrow-right ml-1"></i></div>',
    '<a href="blogs/blog2.html" class="read-more font-semibold text-sm">Read Article <i class="fas fa-arrow-right ml-1"></i></a>',
    1
)

# For blog card 3
content = content.replace(
    '<div class="read-more font-semibold text-sm">Read Article <i class="fas fa-arrow-right ml-1"></i></div>',
    '<a href="blogs/blog3.html" class="read-more font-semibold text-sm">Read Article <i class="fas fa-arrow-right ml-1"></i></a>',
    1
)

# Replace the "View All Articles" button
content = content.replace(
    '<button class="btn btn-secondary">View All Articles</button>',
    '<a href="blogs/index.html" class="btn btn-secondary">View All Articles</a>'
)

with open('index.html', 'w') as f:
    f.write(content)

print("index.html blog links replaced")

# Now update blogs/index.html to point to blog1...blog7.html
with open('blogs/index.html', 'r') as f:
    content_blogs = f.read()

# Replace all <a href="blog-detail.html"> with appropriate blog links
content_blogs = content_blogs.replace('<a href="blog-detail.html">', '<a href="blog{i}.html">')
# Actually, let's just do a sequential replace
for i in range(1, 8):
    content_blogs = content_blogs.replace('<a href="blog-detail.html">', f'<a href="blog{i}.html">', 1)

with open('blogs/index.html', 'w') as f:
    f.write(content_blogs)

print("blogs/index.html blog links replaced")
