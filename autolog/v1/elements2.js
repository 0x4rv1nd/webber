//new extractor using chatgpt
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate to the website
  await page.goto('https://forms.gle/SLLeVXBiQsnnPmxd8'); // Replace with the URL of the website you want to scrape

  // Wait for the page to load and for input fields to be present
  await page.waitForSelector('input');

  // Get all input elements
  const inputFields = await page.$$('input');
  const elementsWithInputFields = [];

  for (const inputField of inputFields) {
    const isEmpty = await inputField.evaluate(el => el.value === ''); // Check if the input field is empty
    if (!isEmpty) {
      const elementText = await inputField.evaluate(el => el.outerHTML);
      elementsWithInputFields.push(elementText);
    }
  }

  // Write the elements with input fields to a .txt file
  fs.writeFileSync('elements_with_input_fields.txt', elementsWithInputFields.join('\n'));

  
})();
