const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Test loading page
  await page.goto('http://localhost:8000/index.html');
  console.log("Page title: " + await page.title());

  // Test market-ticker is gone
  const ticker = await page.$('#market-ticker');
  if (ticker) {
      console.log("ERROR: market-ticker is still present.");
      process.exit(1);
  } else {
      console.log("SUCCESS: market-ticker is removed.");
  }

  // Test Android app link is present and iOS app link is removed
  const iosApp = await page.$('i.fa-apple');
  if (iosApp) {
      console.log("ERROR: App Store (iOS) button is still present.");
      process.exit(1);
  } else {
      console.log("SUCCESS: App Store (iOS) button is removed.");
  }

  const androidApp = await page.$('i.fa-google-play');
  if (androidApp) {
      console.log("SUCCESS: Google Play Store button is present.");
  } else {
      console.log("ERROR: Google Play Store button is missing.");
      process.exit(1);
  }

  // Test whatsapp automated message links
  const waLinks = await page.$$('a[href^="https://wa.me/"]');
  if (waLinks.length >= 2) {
      console.log("SUCCESS: WhatsApp links with automated messages are present.");
  } else {
      console.log(`ERROR: Found only ${waLinks.length} WhatsApp links.`);
      process.exit(1);
  }

  // Test Tagline
  const content = await page.content();
  if (content.includes("Be a master of your money")) {
      console.log("SUCCESS: Tagline is present in Hero section.");
  } else {
      console.log("ERROR: Tagline not found.");
      process.exit(1);
  }

  // Test Talk to Advisor link
  const talkLinks = await page.$$('a[href^="tel:"]');
  let foundTalk = false;
  for (let link of talkLinks) {
      const text = await link.innerText();
      if (text.includes("Talk to Advisor")) {
          foundTalk = true;
          break;
      }
  }
  if (foundTalk) {
      console.log("SUCCESS: 'Talk to Advisor' is an active tel link.");
  } else {
      console.log("ERROR: 'Talk to Advisor' tel link not found.");
      process.exit(1);
  }

  await browser.close();
})();
