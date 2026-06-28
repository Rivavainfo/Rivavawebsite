import re

with open('index.html', 'r') as f:
    content = f.read()

new_hero = """        <!-- HERO -->
        <section id="hero" class="min-h-screen flex items-center justify-center relative z-10 pt-32 pb-12">
            <div class="container mx-auto px-6 text-center">
                <div class="flex flex-col items-center justify-center gap-8">
                    <div>
                        <div class="hero-rivava fade-in-up">RIVAVA</div>
                        <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mt-4 fade-in-up stagger-1">Invest only after you understand the research.</h1>
                        <p class="max-w-xl mx-auto text-lg md:text-xl mt-6 fade-in-up stagger-2">Rivava is a research-first investment platform that helps you study stocks, funds, market trends, and advisor-backed insights before you invest and track your portfolio.</p>
                        <div class="mt-6 flex items-center justify-center gap-4 text-sm font-semibold text-gray-300 fade-in-up stagger-2">
                            <span>Research</span> <i class="fas fa-arrow-right text-[color:var(--accent-primary)]"></i>
                            <span>Learn</span> <i class="fas fa-arrow-right text-[color:var(--accent-primary)]"></i>
                            <span>Invest</span> <i class="fas fa-arrow-right text-[color:var(--accent-primary)]"></i>
                            <span>Track</span>
                        </div>
                        <p class="text-sm uppercase tracking-widest text-yellow-500 mt-6 font-bold fade-in-up stagger-2">Be a master of your money</p>
                    </div>

                    <div class="mt-2 flex flex-col sm:flex-row gap-4 items-center justify-center">
                        <a href="research.html" class="btn btn-primary text-lg fade-in-up stagger-3">
                            Take the next step
                        </a>
                    </div>
                </div>
            </div>
        </section>"""

pattern = re.compile(r'<!-- HERO -->\s*<section id="hero".*?</section>', re.DOTALL)
new_content = pattern.sub(new_hero, content)

with open('index.html', 'w') as f:
    f.write(new_content)
print("Updated Hero")
