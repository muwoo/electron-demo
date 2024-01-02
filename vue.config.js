const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: 'src/renderer/main.js',
    },
  },
  configureWebpack: {
    externals: {
      lodash: 'require("./node_modules/lodash/lodash.js")',
    },
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      mainProcessFile: 'src/main/index.js',
      mainProcessWatch: ['src/main'],
      builderOptions: {
        productName: 'electron-vue',
        appId: 'com.muwoo.electron',
        compression: 'maximum',
        asar: true,
        // extraResources: [{
        //   from: "dist_electron/bundled",
        //   to: "app.asar.unpacked",
        //   filter: [
        //     "!**/icons",
        //     "!**/preload.js",
        //     "!**/node_modules",
        //     "!**/background.js"
        //   ]
        // }],
        // files: [
        //   "**/icons/*",
        //   "**/preload.js",
        //   "**/node_modules/**/*",
        //   "**/background.js"
        // ],
        directories: {
          output: 'build',
        },
        dmg: {
          contents: [
            {
              x: 410,
              y: 150,
              type: 'link',
              path: '/Applications',
            },
            {
              x: 130,
              y: 150,
              type: 'file',
            },
          ],
        },
        mac: {
          target: [
            {
              target: 'dmg',
              arch: ['x64', 'arm64'],
            },
          ],
          artifactName: 'electron-${version}-${arch}.dmg',
          gatekeeperAssess: false,
          hardenedRuntime: true,
        },
        win: {
          artifactName: 'rubick-Setup-${version}-${arch}.exe',
          target: [
            {
              target: 'nsis',
              arch: ['x64', 'ia32'],
            },
          ],
        },
        nsis: {
          shortcutName: 'rubick',
          oneClick: false,
          allowToChangeInstallationDirectory: true,
        }
      },
    },
  },
})
