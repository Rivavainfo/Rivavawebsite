import os
import re

NAV_BLOCK = """    <!-- STICKY WRAPPER FOR TICKER AND HEADER -->
    <div class="sticky top-0 z-[60] flex flex-col w-full shadow-lg bg-[color:var(--bg-panel)]/80 backdrop-blur-2xl border-b border-white/5 transition-all duration-300" id="header-wrapper">
        <header id="header" class="left-0 right-0 z-50">
            <div class="container mx-auto px-6 lg:px-12">
                <div class="flex items-center justify-between py-4 transition-all duration-300 h-20">
                    <a href="index.html#hero" class="flex items-center gap-3 group">
                        <div class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                            <span class="text-xl font-bold">R</span>
                        </div>
                        <span class="text-xl font-semibold tracking-tight">Rivava</span>
                    </a>

                    <!-- Desktop Navigation -->
                    <div class="hidden md:flex items-center bg-white/5 rounded-full px-6 py-2 border border-white/5">
                        <nav class="flex items-center gap-8 text-sm font-medium">
                            <a href="index.html#hero" class="text-gray-300 hover:text-white transition-colors">Home</a>
                            <a href="research.html" class="text-gray-300 hover:text-white transition-colors">Research</a>
                            <a href="learn.html" class="text-gray-300 hover:text-white transition-colors">Learn</a>
                            <a href="about.html" class="text-gray-300 hover:text-white transition-colors">About</a>
                            <a href="blogs/index.html" class="text-gray-300 hover:text-white transition-colors">Blog</a>
                        </nav>
                    </div>

                    <div class="hidden md:flex items-center gap-4">
                        <button id="themeToggle" class="text-gray-300 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10" aria-label="Toggle Theme">
                            <i class="fas fa-moon text-sm"></i>
                        </button>
                        <a href="tel:+918881176909" class="text-sm font-medium text-gray-300 hover:text-white transition-colors">Talk to Advisor</a>
                        <a href="contact.html" class="text-sm font-medium text-gray-300 hover:text-white transition-colors">Contact</a>
                        <a href="index.html#pricing" class="bg-white text-black text-sm font-medium px-5 py-2.5 rounded-full hover:bg-gray-200 transition-colors">Get Elite</a>
                    </div>

                    <!-- Mobile Header Buttons -->
                    <div class="flex items-center gap-2 md:hidden">
                        <button id="hambBtn" class="p-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm" aria-label="menu">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M4 6h16M4 12h16M4 18h16" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- MOBILE MENU -->
            <div id="mobileMenu" class="hidden md:hidden border-t border-white/10 bg-[color:var(--bg-panel)]/95 backdrop-blur-xl absolute w-full">
                <div class="container mx-auto px-6 py-6 flex flex-col gap-4 text-base">
                    <a href="index.html#hero" class="block text-gray-300 hover:text-white transition-colors">Home</a>
                    <a href="research.html" class="block text-gray-300 hover:text-white transition-colors">Research</a>
                    <a href="learn.html" class="block text-gray-300 hover:text-white transition-colors">Learn</a>
                    <a href="about.html" class="block text-gray-300 hover:text-white transition-colors">About</a>
                    <a href="blogs/index.html" class="block text-gray-300 hover:text-white transition-colors">Blog</a>
                    <a href="contact.html" class="block text-gray-300 hover:text-white transition-colors">Contact</a>
                    <div class="mt-4 pt-4 border-t border-white/10">
                        <a href="index.html#pricing" class="bg-white text-black w-full text-center py-3 rounded-xl font-medium block">Get Elite</a>
                    </div>
                </div>
            </div>
        </header>
    </div>"""

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Determine if we are in the root or blogs directory
    in_blogs = filepath.startswith('./blogs/') or filepath.startswith('blogs/')

    # Adjust paths if in blogs directory
    nav_to_use = NAV_BLOCK
    if in_blogs:
        nav_to_use = nav_to_use.replace('href="index.html', 'href="../index.html')
        nav_to_use = nav_to_use.replace('href="research.html', 'href="../research.html')
        nav_to_use = nav_to_use.replace('href="learn.html', 'href="../learn.html')
        nav_to_use = nav_to_use.replace('href="about.html', 'href="../about.html')
        nav_to_use = nav_to_use.replace('href="contact.html', 'href="../contact.html')
        nav_to_use = nav_to_use.replace('href="blogs/index.html', 'href="index.html')
    else:
        # For root files, index.html links should just be relative
        nav_to_use = nav_to_use.replace('href="index.html#', 'href="#')
        if filepath == './index.html' or filepath == 'index.html':
            pass # Keep it #hero for index
        else:
             nav_to_use = nav_to_use.replace('href="#', 'href="index.html#')


    # Try different header patterns
    # 1. Has header-wrapper (about.html, index.html, etc)
    if 'id="header-wrapper"' in content:
        pattern = re.compile(r'(<div[^>]*id="header-wrapper"[^>]*>).*?</header>\s*</div>', re.DOTALL)
        if pattern.search(content):
            new_content = pattern.sub(nav_to_use, content)
        else:
            # Fallback if no exact match
            pattern = re.compile(r'<!-- STICKY WRAPPER FOR TICKER AND HEADER -->.*?</header>\s*</div>', re.DOTALL)
            new_content = pattern.sub(nav_to_use, content)
    else:
        # Simple header replacement for files without wrapper (blogs, terms, privacy, learn, research)
        pattern = re.compile(r'<header.*?</header>', re.DOTALL)
        new_content = pattern.sub(nav_to_use, content)

    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('.'):
    for file in files:
        if file.endswith('.html') and not file.startswith('google'):
            process_file(os.path.join(root, file))
