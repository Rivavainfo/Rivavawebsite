import re

with open('index.html', 'r') as f:
    content = f.read()

# Blog Card 1: Shift in Global Supply Chains -> let's link to blog1.html
content = content.replace(
    '<div class="story-card glass-panel fade-in-up stagger-1">',
    '<a href="blogs/blog1.html" class="story-card glass-panel fade-in-up stagger-1">'
)
content = content.replace(
    '<img src="https://placehold.co/600x400/111111/FFFFFF?text=Market+Trend" alt="Blog Image" class="story-image">',
    '<img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop" alt="Blog Image" class="story-image">'
)
# Close anchor instead of div at the end of the card
# The div structure is:
# <div class="story-card ...">
#    <div class="story-image-wrapper">...</div>
#    <div class="story-content p-6">...</div>
# </div>
# We changed the opening to <a href="...">
# Need to change the corresponding closing </div> to </a>
pattern_1 = re.compile(r'(<a href="blogs/blog1.html" class="story-card glass-panel fade-in-up stagger-1">.*?<div class="read-more font-semibold text-sm">Read Article <i class="fas fa-arrow-right ml-1"></i></div>\s*</div>\s*)</div>', re.DOTALL)
content = pattern_1.sub(r'\1</a>', content)


# Blog Card 2: Cost of FOMO -> link to blog2.html
content = content.replace(
    '<div class="story-card glass-panel fade-in-up stagger-2">',
    '<a href="blogs/blog2.html" class="story-card glass-panel fade-in-up stagger-2">'
)
content = content.replace(
    '<img src="https://placehold.co/600x400/111111/FFFFFF?text=Psychology" alt="Blog Image" class="story-image">',
    '<img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=600&auto=format&fit=crop" alt="Blog Image" class="story-image">'
)
pattern_2 = re.compile(r'(<a href="blogs/blog2.html" class="story-card glass-panel fade-in-up stagger-2">.*?<div class="read-more font-semibold text-sm">Read Article <i class="fas fa-arrow-right ml-1"></i></div>\s*</div>\s*)</div>', re.DOTALL)
content = pattern_2.sub(r'\1</a>', content)


# Blog Card 3: Mutual Funds -> link to blog3.html
content = content.replace(
    '<div class="story-card glass-panel fade-in-up stagger-3">',
    '<a href="blogs/blog3.html" class="story-card glass-panel fade-in-up stagger-3">'
)
content = content.replace(
    '<img src="https://placehold.co/600x400/111111/FFFFFF?text=Mutual+Funds" alt="Blog Image" class="story-image">',
    '<img src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600&auto=format&fit=crop" alt="Blog Image" class="story-image">'
)
pattern_3 = re.compile(r'(<a href="blogs/blog3.html" class="story-card glass-panel fade-in-up stagger-3">.*?<div class="read-more font-semibold text-sm">Read Article <i class="fas fa-arrow-right ml-1"></i></div>\s*</div>\s*)</div>', re.DOTALL)
content = pattern_3.sub(r'\1</a>', content)


# Change "View All Articles" button to link to blogs/index.html
content = content.replace(
    '<button class="btn btn-secondary">View All Articles</button>',
    '<a href="blogs/index.html" class="btn btn-secondary">View All Articles</a>'
)

with open('index.html', 'w') as f:
    f.write(content)
print("Updated blog links")
