import re

with open('index.html', 'r') as f:
    html = f.read()

# Fix light mode CSS to handle Tailwind text colors
css_fix = """
        /* Light Mode Extensions */
        body.light-mode {
            --bg-dark: #f8fafc;
            --bg-card: rgba(255, 255, 255, 0.7);
            --border-color: rgba(0, 0, 0, 0.1);
            color: #1e293b;
        }
        body.light-mode .text-white,
        body.light-mode .text-gray-100,
        body.light-mode .text-gray-200,
        body.light-mode .text-gray-300,
        body.light-mode .text-gray-400 {
            color: #1e293b !important;
        }
        body.light-mode .bg-black {
            background-color: #f1f5f9 !important;
        }
        body.light-mode .glass-panel {
            background: rgba(255, 255, 255, 0.6);
            border: 1px solid rgba(0,0,0,0.1);
        }
        body.light-mode .bg-gray-900 {
            background-color: #e2e8f0 !important;
        }
"""

html = re.sub(r'body\.light-mode\s*\{[^}]+\}', css_fix, html)

# Add "Billing Summary" to Elite section
billing_summary_html = """
                                <div class="flex justify-between items-center text-sm mb-4 pb-4 border-b border-white/10">
                                    <span class="text-gray-400">Billing Summary</span>
                                    <span class="text-white font-medium">₹1,999/mo (Active)</span>
                                </div>
                                <div class="flex justify-between items-center text-sm">
"""

html = html.replace('<div class="flex justify-between items-center text-sm">\n                                    <span class="text-gray-400">Upcoming Session</span>', billing_summary_html + '                                    <span class="text-gray-400">Upcoming Session</span>')

with open('index.html', 'w') as f:
    f.write(html)
