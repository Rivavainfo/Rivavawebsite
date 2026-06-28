import re

with open('index.html', 'r') as f:
    content = f.read()

new_section = """    <!-- DASHBOARD PREVIEW -->
    <section id="dashboard" class="py-32 relative z-10 border-t border-white/5 bg-[#050505]">
        <div class="container mx-auto px-6 lg:px-12">
            <div class="text-center mb-20 fade-in-up">
                <h2 class="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">Habit Formation and SMS tracking.</h2>
                <p class="text-xl text-gray-400 max-w-3xl mx-auto font-light">We believe in habit formation. Use our SMS tracking to manage your funds and build discipline without the noise of complex dashboards.</p>
            </div>

            <div class="max-w-4xl mx-auto glass-panel p-8 md:p-12 text-center fade-in-up stagger-1">
                <i class="fas fa-mobile-alt text-5xl text-[color:var(--accent-primary)] mb-6"></i>
                <h3 class="text-2xl font-bold mb-4">Track via SMS</h3>
                <p class="text-gray-400 mb-8 max-w-2xl mx-auto">Skip the complex charts. Send a quick SMS to log your daily expenses or investments. Build the habit of tracking your money consistently, one message at a time.</p>
                <div class="flex items-center justify-center gap-4">
                     <div class="bg-white/5 border border-white/10 rounded-xl p-4 text-left max-w-xs w-full">
                         <div class="flex items-center gap-2 mb-2">
                             <div class="w-2 h-2 rounded-full bg-green-500"></div>
                             <span class="text-xs text-gray-400 uppercase tracking-wider">SMS Sent</span>
                         </div>
                         <div class="text-sm font-mono text-gray-200">Invested $500 in VOO today</div>
                     </div>
                </div>
            </div>
        </div>
    </section>"""

pattern = re.compile(r'<!-- DASHBOARD PREVIEW -->.*?<section id="tracking"', re.DOTALL)
new_content = pattern.sub(new_section + '\n\n<section id="tracking"', content)

with open('index.html', 'w') as f:
    f.write(new_content)

print("Replaced Command Center")
