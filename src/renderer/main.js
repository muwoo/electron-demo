require('../../tools/v8-snapshot-util')
import { createApp } from 'vue'
import App from './App.vue'

const plist = require('plist')
const py = require('pinyin-match')
const _ = require('lodash')

console.log(plist)
console.log(py)
console.log(_.get({}, 'a'))


createApp(App).mount('#app')
