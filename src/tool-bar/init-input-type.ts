import {getType} from '../dom/get-type';
import {CHANGE_INPUT} from '../lib';


export function initInputType() {
  const dom = document.querySelectorAll('input[name="shape"]');
  const list = ['hand', 'line', 'rect', 'pen', 'txt', 'arrow'];
  window.addEventListener(CHANGE_INPUT, (e: any) => {
    const current = getType();
    const ind = list.indexOf(current);
    const previous: number = (ind - 1) <= -1 ? list.length - 1 : ind - 1;
    const next: number = (ind + 1) >= list.length ? 0 : (ind + 1);
    // console.log(e.detail, current, next);
    switch(e.detail.value) {
      case '1':
      case 'ArrowLeft':
        if (dom[previous]) (dom[previous]as HTMLInputElement).checked = true;
        break;
      case 'ArrowRight':
      case '2':
        if (dom[next]) (dom[next] as HTMLInputElement).checked = true;
        break;
    }
  });
}
