// it will searches  the elements and matches with .txt file and then it will runs

const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto('https://forms.gle/Q6ZCzzFVtUuqHpD68'); // Replace with your Google Form URL

    // Read the data from info.txt
    const data = fs.readFileSync('info.txt', 'utf8').split('\n');

    for (const line of data) {
      const [label, value] = line.split('=');
      const labelLowerCase = label.toLowerCase(); // Convert label to lowercase
      const inputFields = await page.$$('input[type="text"]');

      for (const inputField of inputFields) {
        const labelElement = await inputField.$('label');
        if (labelElement) {
          const labelForAttribute = await labelElement.evaluate(el => el.getAttribute('for'));
          if (labelForAttribute && labelForAttribute.toLowerCase() === labelLowerCase) {
            await inputField.type(value.trim());
            break; // Exit the loop once the input field is found
          }
        }
      }
    }
  } finally {
    
  }
})();
