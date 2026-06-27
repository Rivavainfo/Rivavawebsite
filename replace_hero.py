import re

with open('index.html', 'r') as f:
    content = f.read()

# 1. Update the .hero-rivava CSS to revert to the old glowing style.
# The old glowing style was:
old_hero_rivava_css = """        .hero-rivava {
            font-size: clamp(2.5rem, 8vw, 5rem);
            font-weight: 900;
            letter-spacing: 0.1em;
            background: linear-gradient(135deg, var(--accent-primary), white, var(--accent-blue), var(--accent-pink), var(--accent-primary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-size: 400% 400%;
            animation: gradient-flow 8s ease-in-out infinite, hero-glow 3s ease-in-out infinite alternate;
        }

        @keyframes gradient-flow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        @keyframes hero-glow {
            from { filter: drop-shadow(0 0 10px rgba(0, 255, 127, 0.4)); }
            to { filter: drop-shadow(0 0 25px rgba(0, 163, 255, 0.5)); }
        }"""

current_hero_rivava_css_pattern = re.compile(r'\s*\.hero-rivava \{.*?\n\s*\}', re.DOTALL)
content = current_hero_rivava_css_pattern.sub("\n" + old_hero_rivava_css, content, count=1)


# 2. Update the Hero section HTML to match what the user requested.
# Remove the side aligned dashboard mockup and center the content.
# Update the CTA button to say "Take the Next Step" linking to "#portfolio".

new_hero_html = """        <!-- HERO -->
        <section id="hero" class="min-h-screen flex items-center justify-center relative z-10 pt-40 pb-20">
            <div class="container mx-auto px-6 text-center">
                <div class="flex flex-col items-center justify-center gap-8">
                    <div>
                        <div class="hero-rivava fade-in-up inline-block">RIVAVA</div>
                        <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mt-4 fade-in-up stagger-1">Intelligence for Your Wealth.</h1>
                        <p class="max-w-xl mx-auto text-lg md:text-xl mt-6 fade-in-up stagger-2">Rivava is a premium platform that combines institutional-grade research, AI insights, and advisor guidance to help you build and manage your portfolio with absolute clarity.</p>
                        <p class="text-sm uppercase tracking-widest text-[color:var(--accent-primary)] mt-4 font-bold fade-in-up stagger-2">Be a master of your money</p>
                    </div>

                    <div class="mt-4 flex flex-col sm:flex-row gap-4 items-center justify-center">
                        <a href="#portfolio" class="btn btn-primary text-lg px-8 py-4 w-full sm:w-auto fade-in-up stagger-3">
                            Take the Next Step
                        </a>
                    </div>
                </div>
            </div>
        </section>"""

# Replace the existing Hero section.
hero_section_pattern = re.compile(r'<!-- HERO -->\s*<section id="hero".*?</section>', re.DOTALL)
content = hero_section_pattern.sub(new_hero_html, content)

with open('index.html', 'w') as f:
    f.write(content)

print("Done replacing hero section")
