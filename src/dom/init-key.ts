/**
 * 初始化键盘事件
 * @param {Function} fn callback
 */
export function initKey(w: Window, fn: Function) {
  w.addEventListener('keydown', (e: KeyboardEvent) => {
    // console.log(e);
    if (document.getElementById('textarea-input')?.style.display === 'block') {
      // 文字输入状态时，返回（因为输入框那里阻止冒泡会扰乱文字操作，所以在这里阻止）
      return;
    }
    if (e.metaKey || e.ctrlKey) { // windows ctrl 或者 Mac meta
      switch(e.key) {
        case 'z':
          fn('back');
          break;
        case 'y':
          fn('forward');
          break;
        case 'a':
          fn('select_all');
          break;
      }
    } else if (e.key === 'Escape') {
      fn('back');
    } else if (e.key === 'Backspace') {
      fn('back');
    }
  });
}
