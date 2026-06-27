import re

with open('index.html', 'r') as f:
    content = f.read()

dashboard_pattern = re.compile(r'(<section id="dashboard"[^>]*>.*?</section>)', re.DOTALL)
match = dashboard_pattern.search(content)

if match:
    new_dashboard = """<section id="dashboard" class="py-32 relative z-10 border-t border-white/5 bg-[#050505]">
        <div class="container mx-auto px-6 lg:px-12">
            <div class="text-center mb-20 fade-in-up">
                <h2 class="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">Habit Formation & SMS Tracking</h2>
                <p class="text-xl text-gray-400 max-w-3xl mx-auto font-light">We believe in habit formation and we have SMS tracking that can help you to manage your funds.</p>
            </div>
        </div>
    </section>"""

    content = dashboard_pattern.sub(new_dashboard, content)
    with open('index.html', 'w') as f:
        f.write(content)
    print("Dashboard replaced successfully.")
else:
    print("Could not find dashboard section.")
