const { join } = require('path')

// for each OS
let APP_PATH;
if (process.platform === 'linux') {
    APP_PATH = join(__dirname, 'build', 'linux-unpacked', 'electron-vue')
} else if (process.platform === 'win32') {
    APP_PATH = join(__dirname, 'build', 'win-unpacked', 'electron-vue.exe')
} else if (process.platform === 'darwin') {
    APP_PATH = join(__dirname, 'build', 'mac-arm64', 'electron-vue.app', 'Contents', 'MacOS', 'electron-vue')
} else {
    throw new Error(`Platform '${process.platform}' not implemented`)
}

exports.config = {
    runner: 'local',
    services: ['electron'],
    capabilities: [{
        browserName: 'electron',
        'wdio:electronServiceOptions': {
            // WebdriverIO can automatically find your bundled application
            // if you use Electron Forge or electron-builder, otherwise you
            // can define it here, e.g.:
            appBinaryPath: APP_PATH,
            appArgs: []
        }
    }],
    specs: [
        './test/specs/**/*.js'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    logLevel: 'info',
    // outputDir: 'wdio-logs',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    // reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 10000,
    },
}
