<template>
  <div id="notification" class="hidden">
    <p id="message"></p>
    <button id="close-button" @click="closeNotification()">
      暂不更新
    </button>
    <button id="restart-button" @click="restartApp()" class="hidden">
      重启更新
    </button>
  </div>
</template>

<script setup>
import {ipcRenderer} from 'electron';
const restartApp = () => {
  ipcRenderer.send('restart_app');
}
</script>