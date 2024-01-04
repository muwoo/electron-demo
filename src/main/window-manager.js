import {BrowserWindow, ipcMain} from 'electron';

class WindowPoolItem {
  constructor() {
    this.params = undefined;
    this.win = new BrowserWindow({
      autoHideMenuBar: true,
      show: false,
      enableLargerThanScreen: true,
      webPreferences: {
        webSecurity: false,
        contextIsolation: false,
        webviewTag: true,
        nodeIntegration: true,
      },
    });
  }
  
  use(params, close) {
    this.params = params;
    this.win.setBounds({
      ...params,
    });
    this.win.loadURL(params.url);
    this.win.once('ready-to-show', () => {
      this.win.show();
    });
    this.win.on('close', () => {
      close();
    });
  }
  
  effectParam(params) {
    this.win.setBounds({
      ...params,
    });
  }
}


class WindowManager {
  items = [];
  
  init() {
    // 初始创建 3 个窗口
    for (let i = 0; i < 3; i++) {
      this.items.push(new WindowPoolItem())
    }
    // 渲染进程发送消息告诉主进程需要从窗口池中获取一个窗口
    ipcMain.handle('loadWindow', (e, data) => {
      // 判断是否有正在使用的窗口
      if (this.isWindowInUse(data)) return
      // 从窗口池中选取一个窗口
      this.picAndUse(data)
    })
  }
  
  isWindowInUse(params) {
    // 根据 url 判断窗口是否已经打开过
    let item = this.items.find((v) => v.params?.url === params.url)
    if (!item) return false
    // 如果打开过了，对窗口位置、大小进行调整
    item.effectParam(params)
    return true
  }
  
  picAndUse(params) {
    // 没有params属性的，就是没用过的
    let item = this.items.find((v) => !v.params);
    // 使用窗口
    item.use(params, () => {
      // 窗口关闭后，从窗口池中移除
      this.items = this.items.filter(v => v.params?.url !== params.url);
    });
    // 取出一个窗口后，立刻再创建一个窗口
    this.items.push(new WindowPoolItem())
  }
}

export default WindowManager;