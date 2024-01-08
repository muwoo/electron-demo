const { _electron: electron } = require('playwright')
const { test: testSpec } = require('@playwright/test')

testSpec('launch app', async () => {
  const electronApp = await electron.launch({ args: ['../src/main/index.js'] })
  // close app
  await electronApp.close()
})