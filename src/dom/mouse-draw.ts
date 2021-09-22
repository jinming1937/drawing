
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

export const drawData: IDrawData[] = [];
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
 * @returns 'line' | 'rect' | 'pen' | 'txt'
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

function start(colorDom: HTMLInputElement, lineWidthDom: HTMLInputElement, e: MouseEvent, axisX: number, axisY: number) {
  const type = getType();
  const color = `${colorDom.value || '#ffffff'}`;
  const lineWidth = parseInt(lineWidthDom.value || '1', 10) || 1;
  currentIndex = drawData.length;
  switch(type) {
    case 'line':
    case 'rect':
    case 'arrow':
      drawData.push({type, color, lineWidth, shape: [e.layerX * 2 - axisX, e.layerY * 2 - axisY]});
      break;
    case 'pen':
      drawData.push({type, color, lineWidth, shape: [], lines: [[e.layerX * 2 - axisX, e.layerY * 2 - axisY]]});
      break;
    case 'txt':
      drawData.push({type, color, lineWidth, shape: [e.layerX * 2 - axisX, e.layerY * 2 - axisY], text: ''});
      break;
  }
}

function move(e: MouseEvent, axisX: number, axisY: number) {
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
  // let time = +new Date();
  console.log(dateTime - time);
  if(dateTime - time < 30) {
    return;
  }
  time = dateTime;
  fn();
}

function end(e: MouseEvent, axisX: number, axisY: number) {
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

/**
 * 结束输入状态
 * @param {Object} inputDom textarea dom
 */
function endInput(inputDom: HTMLTextAreaElement) {
  if (inputDom.value) {
    (drawData[currentIndex] as Txt).text = inputDom.value;
  } else {
    drawData.pop();
  }
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
    start(colorDom, lineWidthDom, e, axisX, axisY);
  });

  dom.addEventListener('mousemove', (e: MouseEvent) => {
    if (!drawing) return;
    move(e, axisX, axisY);
  });

  dom.addEventListener('mouseup', (e: MouseEvent) => {
    if (!drawing) return;
    end(e, axisX, axisY);
  });

  let input = ''; // 维护文字输入状态，超长禁止输入
  textarea.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      input = '';
      endInput(textarea);
      textareaMask.style.display = 'none';
      return;
    }
    if (input.length > 30 && e.key !== 'Backspace') {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    input = (e.target as HTMLTextAreaElement).value;
  });

  textareaMask.addEventListener('click', (e: MouseEvent) => {
    input = '';
    endInput(textarea); // 点击蒙层关闭输入态
    textareaMask.style.display = 'none';
  });
}
