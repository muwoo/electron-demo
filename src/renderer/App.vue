<template>
  v1.0.4
  <button @click="open()">打开窗口</button>

</template>

<script setup>
import {ipcRenderer} from 'electron';
const open = () => {
  ipcRenderer.invoke('loadWindow', {
    x: 100,
    y: 100,
    width: 400,
    height: 400,
    url: 'http://localhost:8080'
  })
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
