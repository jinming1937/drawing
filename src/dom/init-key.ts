/**
 * 初始化键盘事件
 * @param {Function} fn callback
 */
export function initKey(w: Window, fn: Function) {
  w.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.metaKey || e.ctrlKey) { // windows ctrl 或者 Mac meta
      switch(e.key) {
        case 'z':
          fn('back');
          break;
        case 'y':
          fn('forward');
          break;
      }
    } else if (e.key === 'Escape') {
      fn('back');
    }
  });
}
