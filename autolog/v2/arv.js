const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // Set to true for headless mode
  });

  // Assuming you have a loaded Google Form URL
  const formURL = 'https://forms.gle/Q6ZCzzFVtUuqHpD68'; // Replace with your Google Form URL

  // Connect to an existing tab or create a new one
  const [page] = await browser.pages();
  if (!page.url() || page.url() !== formURL) {
    await page.goto(formURL);
  }

  // Read the data from info.txt
  const data = fs.readFileSync('info.txt', 'utf8').split('\n');

  for (const line of data) {
    const [label, value] = line.split('=');
    const inputField = await page.$(`input[name="${label}"]`);

    if (inputField) {
      await inputField.type(value.trim());
    } else {
      console.error(`Input field for label "${label}" not found. Skipping.`);
    }
  }

 
})();
