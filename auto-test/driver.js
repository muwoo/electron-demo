const childProcess = require('child_process')

class TestDriver {
  constructor ({ path, args, env }) {
    this.rpcCalls = []
    
    // 启动子进程
    env.APP_TEST_DRIVER = 1 // 让应用知道它应当侦听信息
    this.process = childProcess.spawn(path, args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'], env })
    
    // 处理RPC回复
    this.process.on('message', (message) => {
      // 弹出处理器
      const rpcCall = this.rpcCalls[message.msgId]
      if (!rpcCall) return
      this.rpcCalls[message.msgId] = null
      // 拒绝/接受（reject/resolve）
      if (message.reject) rpcCall.reject(message.reject)
      else rpcCall.resolve(message.resolve)
    })
    
    // 等待准备完毕
    this.isReady = this.rpc('isReady').catch((err) => {
      console.error('Application failed to start', err)
      this.stop()
      process.exit(1)
    })
  }
  
  // 简单 RPC 回调
  // 可以使用：driver.rpc('method', 1, 2, 3).then(...)
  async rpc (cmd, ...args) {
    // send rpc request
    const msgId = this.rpcCalls.length
    this.process.send({ msgId, cmd, args })
    return new Promise((resolve, reject) => this.rpcCalls.push({ resolve, reject }))
  }
  
  stop () {
    this.process.kill()
  }
}

module.exports = { TestDriver }