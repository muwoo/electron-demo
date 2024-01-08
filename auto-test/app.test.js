// const { describe, before, after } = require('mocha')
const assert = require('assert');
const {join} = require("path");
const { TestDriver } = require('./driver')


// for each OS
let APP_PATH;
if (process.platform === 'linux') {
  APP_PATH = join(__dirname, 'build', 'linux-unpacked', 'electron-vue')
} else if (process.platform === 'win32') {
  APP_PATH = join(__dirname, 'build', 'win-unpacked', 'electron-vue.exe')
} else if (process.platform === 'darwin') {
  APP_PATH = join(__dirname, '../build', 'mac-arm64', 'electron-vue.app', 'Contents', 'MacOS', 'electron-vue')
} else {
  throw new Error(`Platform '${process.platform}' not implemented`)
}

console.log(APP_PATH);

const app = new TestDriver({
  path: APP_PATH,
  args: ['./app'],
  env: {
    NODE_ENV: 'test'
  }
})

describe('测试启动', () => {
  before(async () => {
    await app.isReady
  });
  it('获取 app name', async () => {
    const name = await app.rpc('getAppName');
    assert(name, 'electron-app')
  })
  after(async () => {
    await app.stop()
  });
})
