const webdriver = require('selenium-webdriver')
const {join} = require("path");

// for each OS
let APP_PATH;
if (process.platform === 'linux') {
  APP_PATH = join(__dirname, '../build', 'linux-unpacked', 'electron-vue')
} else if (process.platform === 'win32') {
  APP_PATH = join(__dirname, '../build', 'win-unpacked', 'electron-vue.exe')
} else if (process.platform === 'darwin') {
  APP_PATH = join(__dirname, '../build', 'mac-arm64', 'electron-vue.app', 'Contents', 'MacOS', 'electron-vue')
} else {
  throw new Error(`Platform '${process.platform}' not implemented`)
}

const driver = new webdriver.Builder()
  // 端口号 "9515" 是被 ChromeDriver 开启的.
  .usingServer('http://localhost:9515')
  .withCapabilities({
    'goog:chromeOptions': {
      // 这里填您的Electron二进制文件路径。
      binary: APP_PATH
    }
  })
  .forBrowser('chrome') // note: use .forBrowser('electron') for selenium-webdriver <= 3.6.0
  .build()

driver.wait(() => {
  return driver.getTitle().then((title) => {
    return title === 'electron-vue'
  })
}, 1000)
driver.quit()