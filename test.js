const { remote } = require("webdriverio");

const capabilities = {
  platformName: "Windows",
  'appium:options': {
    automationName: 'windows',
    app: "C:\\Windows\\System32\\notepad.exe",
    'ms:waitForAppLaunch': 50,
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
    const currentTime = new Date().toISOString();
    await driver.keys(currentTime);
    await driver.keys(['Control', 's']);
    await driver.keys('Desktop\\' + currentTime + '.txt');
    await driver.keys('Enter');
    await driver.keys(['Alt', 'f4']);
  } finally {
    await driver.deleteSession();
  }
}

runTest().catch(console.error);
