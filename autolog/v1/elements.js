//from gpt which gives every element  version 0
const puppeteer = require('puppeteer');
const fs = require('fs'); // Import the Node.js file system module

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto('https://forms.gle/SLLeVXBiQsnnPmxd8');

    const allElements = await page.$$('body *');

    const elementData = [];

    for (const element of allElements) {
      const tagName = await element.evaluate((el) => el.tagName);
      const textContent = await element.evaluate((el) => el.textContent);
      elementData.push({ tagName, textContent });
    }

    // Save the collected data to a file (JSON format in this example)
    fs.writeFileSync('element-data.json', JSON.stringify(elementData, null, 2));

    console.log('Data saved to element-data.json');
  } catch (error) {
    console.error('Error: ', error);
  } finally {
    await browser.close();
  }
})();
