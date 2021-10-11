import {IDrawData, IShapeType, Pen, Txt} from 'types/common';
import {initInputDom, showInput} from './init-input-dom';
import {bounce, coreData} from '../lib';

export const drawData: IDrawData[] = new Proxy([], {
  get: (obj, prop) => {
    return obj[prop];
  },
  set: (obj, prop, val) => {
    obj[prop] = val;
    updateList(val);
    return true;
  }
});
let currentIndex = 0;

/**
 * 返回绘画类型
 * @returns 'line' | 'rect' | 'pen' | 'txt' | 'arrow'
 */
function getType(): IShapeType {
  const dom = document.querySelectorAll('input[name="shape"]');
  if((dom[0] as HTMLInputElement).checked) return 'line';
  if((dom[1] as HTMLInputElement).checked) return 'rect';
  if((dom[2] as HTMLInputElement).checked) return 'pen';
  if((dom[3] as HTMLInputElement).checked) return 'txt';
  if((dom[4] as HTMLInputElement).checked) return 'arrow';
  return 'line';
}

function start(colorDom: HTMLInputElement, lineWidthDom: HTMLInputElement, e: {layerX: number, layerY: number}, axisX: number, axisY: number) {
  const type = getType();
  const color = `${colorDom.value || '#ffffff'}`;
  const lineWidth = parseInt(lineWidthDom.value || '1', 10) || 1;
  currentIndex = coreData.length;
  // const obj: IDrawData = {
  //   type, color, lineWidth, shape: [], lines: [], txt: ''
  // } as IDrawData;
  // const shape: number[] = [];
  // const lines: number[][] = [];
  // Object.defineProperties(obj, {
  //   shape: {
  //     writable: true,
  //     configurable: false,
  //     enumerable: false,
  //     get: () => shape,
  //     set: (val: number[]) => shape.push(...val),
  //   },
  //   lines: {
  //     writable: true,
  //     configurable: false,
  //     enumerable: false,
  //     get: () => lines,
  //     set: (val: number[][]) => lines.push(...val),
  //   },
  //   txt: {
  //     writable: true,
  //     configurable: false,
  //     enumerable: false,
  //     get: () => lines,
  //     set: (val: number[][]) => lines.push(...val),
  //   }
  // });
  switch(type) {
    case 'line':
    case 'rect':
    case 'arrow':
      coreData.push({type, color, lineWidth, shape: [e.layerX * 2 - axisX, e.layerY * 2 - axisY]});
      break;
    case 'pen':
      coreData.push({type, color, lineWidth, shape: [], lines: [[e.layerX * 2 - axisX, e.layerY * 2 - axisY]]});
      break;
    case 'txt':
      coreData.push({type, color, lineWidth, shape: [e.layerX * 2 - axisX, e.layerY * 2 - axisY], text: ''});
      break;
  }
}

function move(e: {layerX: number, layerY: number}, axisX: number, axisY: number) {
  const type = getType();
  const current = coreData.getItem(currentIndex);
  if (!current || (current.shape.length + ((current as Pen).lines?.length || 0)) === 0) {
    return;
  }
  switch(type) {
    case 'line':
    case 'rect':
    case 'arrow':
      current.shape[2] = e.layerX * 2 - axisX;
      current.shape[3] = e.layerY * 2 - axisY;
      // coreData.setItem(currentIndex, [...shape])
      break;
    case 'pen':
      bounce(+new Date(), () => {
        (current as Pen).lines.push([e.layerX * 2 - axisX, e.layerY * 2 - axisY]);
      });
      break;
    case 'txt':
      break;
  }
}

function end(e: {layerX: number, layerY: number}, axisX: number, axisY: number) {
  const type = getType();
  const current = coreData.getItem(currentIndex);
  switch(type) {
    case 'line':
    case 'rect':
    case 'arrow':
      current.shape[2] = e.layerX * 2 - axisX;
      current.shape[3] = e.layerY * 2 - axisY;
      break;
    case 'pen':
      (current as Pen).lines.push([e.layerX * 2 - axisX, e.layerY * 2 - axisY]);
      break;
    case 'txt':
      if(document.getElementById('textarea-input')?.style.display === 'block') {
        return;
      }
      showInput(e.layerX, e.layerY);
      return; // input 结束在blur处，所以后面的currentIndex 不用移动
  }
  currentIndex = coreData.length;
}

function updateList(val: unknown) {
  // if(typeof val === 'object') {
  //   const proxyVal = new Proxy(val as Object, {
  //     get: (obj, prop) => {
  //       return obj[prop];
  //     }
  //   });
  // }
  const ul = document.querySelector<HTMLUListElement>('#right-bar-list');
  if(ul) {
    ul.innerHTML = "";
    coreData.value.forEach((draw, index) => {
      const {type, lineWidth, color, shape} = draw;
      const li = document.createElement('li');
      const txtDom = `
        <div class="left">
          <div>${type}</div>
          <div style="width: 20px;height: 20px;background-color: ${color}"></div>
        </div>
        <div class="right">
          <input ${draw.type === 'txt' ? '': 'disabled' } type="text" value="${draw.type === 'txt' ? draw.text : '-'}" />
          <input type="text" value="${shape}" />
        </div>
        <div class="delete" name="delete">x</div>
      `;
      li.innerHTML = txtDom;
      li.setAttribute('data-index', `${index}`);
      ul.appendChild(li);
    });
  }
}

/**
 * 结束输入状态
 * @param {Object} inputDom textarea dom
 */
function endInput(inputDom: HTMLTextAreaElement, textareaMask: HTMLDivElement) {
  if (inputDom.value) {
    (coreData.getItem(currentIndex) as Txt).text = inputDom.value;
  } else {
    coreData.pop();
  }
  textareaMask.style.display = 'none';
  inputDom.style.display = 'none';
  inputDom.value = '';
  currentIndex = coreData.length;
}

/**
 * 绑定事件 & 返回绘画函数
 * @param {Object} ctx canvas context
 * @param {String} type type line
 * @returns Fn Callback
 */
export function mouseDraw(ctx: CanvasRenderingContext2D) {
  const dom = ctx.canvas;
  const domWidth = dom.width;
  const domHeight = dom.height;
  const axisX = domWidth / 2;
  const axisY = domHeight / 2;
  const colorDom = document.getElementById('color') as HTMLInputElement;
  const lineWidthDom = document.getElementById('lineWidth') as HTMLInputElement;
  const [textarea, textareaMask] = initInputDom(colorDom);

  let drawing = false;
  dom.addEventListener('mousedown', (e: MouseEvent) => {
    drawing = true;
    start(colorDom, lineWidthDom, {layerX: e.layerX, layerY: e.layerY}, axisX, axisY);
  });

  dom.addEventListener('mousemove', (e: MouseEvent) => {
    if (!drawing) return;
    move({layerX: e.layerX, layerY: e.layerY}, axisX, axisY);
  });

  dom.addEventListener('mouseup', (e: MouseEvent) => {
    if (!drawing) return;
    end({layerX: e.layerX, layerY: e.layerY}, axisX, axisY);
    drawing = false;
  });
  dom.addEventListener('mouseleave', () => {
    drawing = false;
  });
  dom.addEventListener('mouseout', () => {
    drawing = false;
  });
  {
    // touch
    dom.addEventListener('touchstart', (e: TouchEvent) => {
      drawing = true;
      start(colorDom, lineWidthDom, {layerX: e.changedTouches[0].clientX, layerY: e.changedTouches[0].clientY}, axisX, axisY);
    });
    dom.addEventListener('touchmove', (e: TouchEvent) => {
      console.log(e.changedTouches.length, e);
      if (!drawing) return;
      move({layerX: e.changedTouches[0].clientX, layerY: e.changedTouches[0].clientY}, axisX, axisY);
    });
    dom.addEventListener('touchend', (e: TouchEvent) => {
      if (!drawing) return;
      end({layerX: e.changedTouches[0].clientX, layerY: e.changedTouches[0].clientY}, axisX, axisY);
      drawing = false;
    });
    dom.addEventListener('touchcancel', (e: TouchEvent) => {
      drawing = false;
    });
    dom.addEventListener('drag', () => {});
    document.body.addEventListener('touchmove', function (e) {
      e.preventDefault();
    }, {passive: false});
  }
  let input = ''; // 维护文字输入状态，超长禁止输入
  textarea.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      cancelInput();
      return
    }
    if (e.key === 'Enter') return cancelInput();
    if (input.length > 30 && e.key !== 'Backspace') {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    input = (e.target as HTMLTextAreaElement).value;
  });

  textareaMask.addEventListener('click', (e: MouseEvent) => {
    cancelInput();
  });

  function cancelInput() {
    input = '';
    endInput(textarea, textareaMask);
  }
}
