const { remote } = require("webdriverio");

const capabilities = {
  platformName: "Windows",
  'appium:options': {
    automationName: 'windows',
    app: "Microsoft.WindowsCalculator_8wekyb3d8bbwe!App", // This is the application ID for the Windows Calculator
  }
};

const wdOpts = {
  hostname: "localhost",
  port: 4723,
  capabilities,
};

async function runTest() {
  const driver = await remote(wdOpts);
  try {
    // Find the buttons for '4', '2', '+', and '=' by their names
    const button4 = await driver.findElement('name', 'Four');
    const button2 = await driver.findElement('name', 'Two');
    const buttonPlus = await driver.findElement('name', 'Plus');
    const buttonEquals = await driver.findElement('name', 'Equals');

    // Click the buttons in the correct order to perform the calculation 42 + 42
    await driver.elementClick(button4.ELEMENT);
    await driver.elementClick(button2.ELEMENT);
    await driver.elementClick(buttonPlus.ELEMENT);
    await driver.elementClick(button4.ELEMENT);
    await driver.elementClick(button2.ELEMENT);
    await driver.elementClick(buttonEquals.ELEMENT);

    // Find the result element by its automation id
    const resultElement = await driver.findElement('accessibility id', 'CalculatorResults');

    // Get the result text
    const resultText = await driver.getElementText(resultElement.ELEMENT);

    console.log(`Result: ${resultText}`); // Should print: Result: Display is 84

  } finally {
    await driver.deleteSession();
  }
}

runTest().catch(console.error);
