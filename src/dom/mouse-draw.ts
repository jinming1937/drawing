
export type IShapeType = 'line' | 'rect' | 'pen' | 'txt' | 'arrow';

export type Pen = {
  type: 'pen';
  color: string;
  lineWidth: number;
  shape: number[];
  lines: Array<number[]>;
}

export type Common = {
  type: 'line' | 'rect' | 'arrow';
  color: string;
  lineWidth: number;
  shape: number[];
}

export type Txt = {
  type: 'txt';
  color: string;
  lineWidth: number;
  shape: number[];
  text: string;
}

export type IDrawData = Common | Pen | Txt;

export const drawData: IDrawData[] = new Proxy([], {
  get: (obj, prop) => {
    return obj[prop];
  },
  set: (obj, prop, val) => {
    obj[prop] = val;
    // updateList(val);
    return true;
  }
});
let currentIndex = 0;

/**
 * 初始化一个颜色dom
 * @param {Object} colorDom 颜色DOM
 */
function initInputDom(colorDom: HTMLInputElement): [HTMLTextAreaElement, HTMLDivElement] {
  const textarea = document.createElement('textarea');
  textarea.id = 'textarea-input';
  textarea.style.background = "rgb(255 255 255 / 70%)";
  textarea.style.position = "absolute";
  textarea.style.left = '0';
  textarea.style.top = '0';
  textarea.style.color = colorDom.value;
  textarea.style.fontFamily = 'serif';
  textarea.style.fontSize = '16px';
  textarea.style.zIndex = '1000';
  textarea.style.border = 'none';
  textarea.style.outline = 'none';
  textarea.style.resize = 'none';
  textarea.style.width = '150px';
  textarea.style.height = '40px';
  textarea.style.borderRadius = '2px';
  textarea.style.display = 'none';
  textarea.placeholder = '请输入少于30个字';

  const textareaMask = document.createElement('div');
  textareaMask.id = 'textarea-mask';
  textareaMask.style.display = 'none';
  textareaMask.style.position = 'absolute';
  textareaMask.style.width = '100%';
  textareaMask.style.height = '100%';
  textareaMask.style.top = '0';
  textareaMask.style.left = '0';
  textareaMask.style.background = 'transparent';

  document.body.append(textarea);
  document.body.append(textareaMask);
  return [textarea, textareaMask];
}

/**
 * 展示文本输入
 * @param {number} x x position
 * @param {number} y y position
 */
function showInput(x: number, y: number) {
  const colorDom = document.getElementById('color') as HTMLInputElement;
  const textarea = document.getElementById('textarea-input');
  const textareaMask = document.getElementById('textarea-mask');
  if (textareaMask) textareaMask.style.display = 'block';
  if (textarea) {
    textarea.style.display = 'block';
    textarea.style.left = `${x}px`;
    textarea.style.top = `${y - 17}px`;
    textarea.style.color = colorDom.value;
    textarea.focus();
  }
}

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
  currentIndex = drawData.length;
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
      // obj.shape.push(...[e.layerX * 2 - axisX, e.layerY * 2 - axisY]);
      // drawData.push(obj);
      drawData.push({type, color, lineWidth, shape: [e.layerX * 2 - axisX, e.layerY * 2 - axisY]});
      break;
    case 'pen':
      // obj.lines.push(...[[e.layerX * 2 - axisX, e.layerY * 2 - axisY]]);
      // drawData.push(obj);
      drawData.push({type, color, lineWidth, shape: [], lines: [[e.layerX * 2 - axisX, e.layerY * 2 - axisY]]});
      break;
    case 'txt':
      // obj.shape.push(...[e.layerX * 2 - axisX, e.layerY * 2 - axisY]);
      // drawData.push(obj);
      drawData.push({type, color, lineWidth, shape: [e.layerX * 2 - axisX, e.layerY * 2 - axisY], text: ''});
      break;
  }
}

function move(e: {layerX: number, layerY: number}, axisX: number, axisY: number) {
  const type = getType();
  const current = drawData[currentIndex];
  if (!current || (current.shape.length + ((current as Pen).lines?.length || 0)) === 0) {
    return;
  }
  switch(type) {
    case 'line':
    case 'rect':
    case 'arrow':
      drawData[currentIndex].shape[2] = e.layerX * 2 - axisX;
      drawData[currentIndex].shape[3] = e.layerY * 2 - axisY;
      break;
    case 'pen':
      bounce(+new Date(), () => {
        (drawData[currentIndex] as Pen).lines.push([e.layerX * 2 - axisX, e.layerY * 2 - axisY]);
      });
      break;
    case 'txt':
      break;
  }
}

let time = +new Date();
function bounce(dateTime: number, fn: Function) {
  if(dateTime - time < 30) {
    return;
  }
  time = dateTime;
  fn();
}

function end(e: {layerX: number, layerY: number}, axisX: number, axisY: number) {
  const type = getType();
  switch(type) {
    case 'line':
    case 'rect':
    case 'arrow':
      drawData[currentIndex].shape[2] = e.layerX * 2 - axisX;
      drawData[currentIndex].shape[3] = e.layerY * 2 - axisY;
      break;
    case 'pen':
      (drawData[currentIndex] as Pen).lines.push([e.layerX * 2 - axisX, e.layerY * 2 - axisY]);
      break;
    case 'txt':
      if(document.getElementById('textarea-input')?.style.display === 'block') {
        return;
      }
      showInput(e.layerX, e.layerY);
      return; // input 结束在blur处，所以后面的currentIndex 不用移动
  }
  currentIndex = drawData.length;
}

function updateList(val: unknown) {
  console.log(val);
  if(typeof val === 'object') {
    // const proxyVal = new Proxy(val as Object, {
    //   get: (obj, prop) => {
    //     return obj[prop];
    //   }
    // });
  }
  const ul = document.querySelector<HTMLUListElement>('#right-bar-list');
  if(ul) {
    ul.innerHTML = "";
    drawData.forEach((draw, index) => {
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

function initRightBar() {
  const div = document.createElement('div');
  const ul = document.createElement('ul');
  div.id = 'right-bar';
  div.className = 'right-bar';
  ul.id = 'right-bar-list'

  ul.addEventListener('click', (e: MouseEvent) => {
    ul.querySelectorAll('li')?.forEach((i) => {
      i.className = '';
    });
    let flag = false;
    let deleteIndex = -1;
    let liNode: any = null;
    (e as any).path.forEach((i: any) => {
      if (i.localName === 'li' && !flag) {
        flag = true;
        i.className = 'active';
      }
      if (i.localName === 'div' && i.getAttribute('name') === 'delete' && liNode === null) {
        liNode = i.parentNode;
        deleteIndex = parseInt(liNode.getAttribute('data-index'), 10);
      }
    });

    if (deleteIndex >= 0 && liNode) {
      ul.removeChild(liNode);
      drawData.splice(deleteIndex, 1);
    }
  });

  div.appendChild(ul);
  document.body.append(div);
}

/**
 * 结束输入状态
 * @param {Object} inputDom textarea dom
 */
function endInput(inputDom: HTMLTextAreaElement, textareaMask: HTMLDivElement) {
  if (inputDom.value) {
    (drawData[currentIndex] as Txt).text = inputDom.value;
  } else {
    drawData.pop();
  }
  textareaMask.style.display = 'none';
  inputDom.style.display = 'none';
  inputDom.value = '';
  currentIndex = drawData.length;
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

  // initRightBar();
}
