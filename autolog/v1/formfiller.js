//first form filler which fills the data like name=xyz and not finding the elements in the form =error
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto('https://docs.google.com/forms/d/e/1FAIpQLSesPS4lV4NTlN96YCB9mg5vr4hP0z8Fxq2sY_Dn5qq315FDIA/viewform?usp=sf_link'); // Replace with your Google Form URL

    // Read the data from info.txt
    const data = fs.readFileSync('info.txt', 'utf8').split('\n');

    // Find all input fields on the form
    const inputFields = await page.$$('input[type="text"]');

    // Fill the input fields with data from info.txt
    for (let i = 0; i < inputFields.length && i < data.length; i++) {
      const inputField = inputFields[i];
      const value = data[i].trim(); // Read a line from info.txt and trim whitespace
      await inputField.type(value);
    }
  }  finally {
    } 

    
})();
