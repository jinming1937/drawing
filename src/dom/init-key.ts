import {KeyEventName} from '../util';
/**
 * 初始化键盘事件
 * @param {Function} fn callback
 */
export function initKey(w: Window, fn: Function) {
  w.addEventListener('keydown', (e: KeyboardEvent) => {
    if (document.getElementById('textarea-input')?.style.display === 'block') {
      // 文字输入状态时，返回（因为输入框那里阻止冒泡会扰乱文字操作，所以在这里阻止）
      // 退出事件也是在 textarea 那里注册
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    if (e.metaKey || e.ctrlKey) { // windows ctrl 或者 Mac meta
      switch(e.key) {
        case 'a':
          fn(KeyEventName.selectAll);
          break;
        case 's':
          fn(KeyEventName.save);
          break;
        case 'c':
          fn(KeyEventName.copy);
          break;
        case 'v':
          fn(KeyEventName.parse);
          break;
        case 'x':
          fn(KeyEventName.shear);
          break;
        case 'r':
          fn(KeyEventName.clear);
          break;
        case 'y':
          fn(KeyEventName.forward);
          break;
        case 'z':
          fn(KeyEventName.back);
          break;
        case '1':
        case '2':
        case 'ArrowLeft':
        case 'ArrowRight':
        // case '3':
        // case '4':
        // case '5':
          if (e.shiftKey) {
            fn(KeyEventName.changeType, e.key);
          }
          break;
      }
    } else if (e.key === 'Escape') {
      fn(KeyEventName.escape);
    } else if (e.key === 'Backspace') {
      fn(KeyEventName.delete);
    }
  });
}
