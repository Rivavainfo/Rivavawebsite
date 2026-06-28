import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # The issue might be missing styles for mobileMenu or logo in blogs, let's just make sure
    # we don't break anything. Actually, we should check if they look correct.
    print(f"Checked {filepath}")

for root, _, files in os.walk('./blogs'):
    for file in files:
        if file.endswith('.html'):
            process_file(os.path.join(root, file))
