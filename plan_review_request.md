1. **Update titles from CIO to CAO:**
   - In `index.html` on line 1183, change "Chief Investment Officer (CIO)" to "Chief Analysis Officer (CAO)".
   - In `blogs/blog2.html` on line 132, change "CIO" to "CAO".
   - In `blogs/blog5.html` on line 132, change "CIO" to "CAO".

2. **Add functionality to download PDF post-payment on the `donation.html` page:**
   - In `donation.html`, when a user successfully scans/simulates payment (in this case, we could add a button inside the QR modal that says "I have paid, verify" or similar simulation since it's just generating a UPI string into a QR).
   - Once verified, show a "Download PDF" button that links to `assets/IREDA portfolio 3.0.pdf` (or `assets/RTX CORP.pdf` depending on context, though `donation.html` doesn't explicitly link which one). Looking at the prompt, "gives you option to download the pdf immediately", I will update the QR modal in `donation.html` to include a button that simulates payment verification, and then displays the download links for the premium PDFs (e.g. `assets/RTX CORP.pdf` and `assets/ireda portfolio 3.0.pdf`).

3. **Complete pre commit steps**
   - Run `pre_commit_instructions` and follow testing and verification steps.
4. **Submit the change**
   - Commit and submit.
