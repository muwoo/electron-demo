/* eslint-disable */
if (typeof snapshotResult !== 'undefined') {
  const Module = __non_webpack_require__('module');
  const originalLoad = Module._load;
  
  console.log('snapshot 加载。。。。', snapshotResult);
  
  Module._load = function _load(module, ...args) {
    let cachedModule = snapshotResult.customRequire.cache[module];
  
    if (cachedModule)  {
      console.log('snapshot 缓存模块：', module)
      return cachedModule.exports
    };
    if (snapshotResult.customRequire.definitions[module]) {
      cachedModule = {exports: snapshotResult.customRequire(module)};
    } else {
      cachedModule = {exports: originalLoad(module, ...args)};
    }
    
    snapshotResult.customRequire.cache[module] = cachedModule;
    return cachedModule.exports;
  };
  
  snapshotResult.setGlobals(global, process, window, document, console, global.require);
}