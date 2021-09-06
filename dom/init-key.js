;(function(w) {
  /**
   * 初始化键盘事件
   * @param {Function} fn callback
   */
  function initKey(fn) {
    w.addEventListener('keydown', (e) => {
      // console.log(e.ctrl, e.metaKey, e.key, e.shiftKey, e.composed);
      if (e.metaKey || e.ctrlKey) { // windows ctrl 或者 Mac meta 
        switch(e.key) {
          case 'z':
            fn('back');
            break;
          case 'y':
            fn('forward');
            break;
        }
      }
    });
  }

  w.initKey = initKey;
}(window));