import {IDrawData, Pen, Txt} from 'types/common';
import {CoreData} from '../lib';
import {bounce} from '../util';
import {OffScreenCanvas} from '../canvas';
import {initInputDom, showInput} from './init-input-dom';
import {getType} from './get-type';
import {isPointInPath, createRectPath, lineRectPath, penRectPath, txtRectPath} from '../canvas/ctx-calc';

function getSelectorIndex(coreData: CoreData<IDrawData>, ctx: CanvasRenderingContext2D, colorDom: HTMLInputElement, aimX1: number, aimY1: number): number {
  let currentIndex = -1
  let index = coreData.length;
  while(index--) {
    const item = coreData.getValue()[index]; // 倒序遍历
    const [x1, y1, x2, y2] = item.shape;
    let isGetElement = false;
    {
      ctx.beginPath();
      switch(item.type) {
        case 'arrow':
        case 'line':
          lineRectPath(ctx, x1, y1, x2, y2);
          isGetElement = ctx.isPointInPath(aimX1, aimY1);
          break;
        case 'rect':
          createRectPath(ctx, x1, y1, Math.abs(x2 - x1), Math.abs(y2 - y1));
          isGetElement = ctx.isPointInPath(aimX1, aimY1);
          break;
        case 'txt':
          txtRectPath(ctx, item.text, x1, y1);
          isGetElement = ctx.isPointInPath(aimX1, aimY1);
          break;
        case 'pen':
          penRectPath(ctx, item.lines)
          isGetElement = ctx.isPointInPath(aimX1, aimY1);
          break;
      }
      ctx.stroke();
      if (isGetElement) { // 命中
        currentIndex = index;
        // console.log(currentIndex);
        current_position.x = aimX1;
        current_position.y = aimY1;
        current_position.baseX1 = item.shape[0];
        current_position.baseY1 = item.shape[1];
        current_position.baseX2 = item.shape[2];
        current_position.baseY2 = item.shape[3];
        current_position.lines = (item as Pen).lines;
        colorDom.value = item.color
        item.isActive = true;
        index = 0; // 退出循环
      }
    }
  }
  return currentIndex;
}

/**
 * TODO
 * [√]离屏Canvas, 做isPointInPath 性能优化，判断是否选中，
 * TODO
 * [√]selected： 所有元素（pen,text,line,arrow,rect）添加 一个矩形外选框，[有]无色边，
 * [x]有四个点
 * [x]拖动点可以移位，
 * [x]变形（宽窄）
 * [x]行军蚁样式
 * [ ] ctrl c, [ ] ctrl v, [ ] ctrl s
 * TODO
 * [ ]selected 可以键盘移动选中元素
 * TODO
 * [ ]精细化调整：左侧、上侧刻度、辅助线（选择状态时）（样式实现？穿透canvas?）
 * TODO
 * [ ]非常精细化调整：虚拟DOM，DOM differ
 * TODO
 * [ ]动画
 */

let currentIndex = 0;
const current_position = {
  x: 0, y: 0,
  baseX1: 0,
  baseY1: 0,
  baseX2: 0,
  baseY2: 0,
  lines: [[]] as unknown as number[][],
};

function start(coreData: CoreData<IDrawData>, osCtx: CanvasRenderingContext2D, colorDom: HTMLInputElement, lineWidthDom: HTMLInputElement, e: {layerX: number, layerY: number}, axisX: number, axisY: number) {
  const type = getType();
  const color = `${colorDom.value || '#ffffff'}`;
  const lineWidth = parseInt(lineWidthDom.value || '1', 10) || 1;
  currentIndex = coreData.length;
  const saveX1 = e.layerX * 2 - axisX;
  const saveY1 = e.layerY * 2 - axisY;
  switch(type) {
    case 'line':
    case 'rect':
    case 'arrow':
      coreData.push({type, color, lineWidth, shape: [saveX1, saveY1, saveX1, saveY1]});
      break;
    case 'pen':
      coreData.push({type, color, lineWidth, shape: [], lines: [[saveX1, saveY1]]});
      break;
    case 'txt':
      if(document.getElementById('textarea-input')?.style.display === 'block') {
        return;
      }
      showInput(e.layerX, e.layerY); // 因为必须end之后，才会执行里面的focus,所以里面的focus 用了setTimeout
      coreData.push({type, color, lineWidth, shape: [saveX1, saveY1], text: ''});
      break;
    case 'hand':
      currentIndex = getSelectorIndex(coreData, osCtx, colorDom, saveX1, saveY1);
      break;
  }
}

function move(coreData: CoreData<IDrawData>, e: {layerX: number, layerY: number}, axisX: number, axisY: number) {
  // console.log('mouse move');
  const type = getType();
  const current = coreData.getItem(currentIndex);
  if (!current || (current.shape.length + ((current as Pen).lines?.length || 0)) === 0) {
    return;
  }
  const saveX1 = e.layerX * 2 - axisX;
  const saveY1 = e.layerY * 2 - axisY;
  switch(type) {
    case 'line':
    case 'rect':
    case 'arrow':
      current.shape[2] = saveX1;
      current.shape[3] = saveY1;
      break;
    case 'pen':
      bounce(+new Date(), () => {
        (current as Pen).lines.push([saveX1, saveY1]);
      });
      break;
    case 'txt':
      break;
    case 'hand':
      // console.log('hand move', currentIndex, current.shape[0] + saveX1 - current_position.x, current.shape[1] + saveY1 - current_position.y);
      switch (current.type) {
        case 'line':
        case 'rect':
        case 'arrow':
          current.shape[0] = current_position.baseX1 + saveX1 - current_position.x;
          current.shape[1] = current_position.baseY1 + saveY1 - current_position.y;
          current.shape[2] = current_position.baseX2 + saveX1 - current_position.x;
          current.shape[3] = current_position.baseY2 + saveY1 - current_position.y;
          break;
        case 'txt':
          current.shape[0] = current_position.baseX1 + saveX1 - current_position.x;
          current.shape[1] = current_position.baseY1 + saveY1 - current_position.y;
          break;
        case 'pen':
          current.lines = current_position.lines.map(([x, y]) => {
            return [x + saveX1 - current_position.x, y + saveY1 - current_position.y];
          })
          break;
      }
      break;
  }
}

function end(coreData: CoreData<IDrawData>, e: {layerX: number, layerY: number}, axisX: number, axisY: number) {
  // console.log('mouse up');
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
      return; // input 结束在blur处，所以后面的currentIndex 不用移动
    case 'hand':
      if(current) {
        current_position.x = 0;
        current_position.y = 0;
        // current.isActive = false;
        coreData.splice(currentIndex, 1);
        coreData.push(current);
        currentIndex = coreData.length - 1;
      } else {
        coreData.getValue().forEach((item) => item.isActive = false); // 没有选中，去掉所有选中态
        currentIndex = coreData.length;
      }
      return;
  }
  currentIndex = coreData.length;
}

/**
 * 绑定事件 & 返回绘画函数
 * @param {Object} ctx canvas context
 * @param {String} type type line
 * @returns Fn Callback
 */
export function initMouseDraw(canvas: HTMLCanvasElement, osCvs: OffScreenCanvas, coreData: CoreData<IDrawData>) {
  const axisX = osCvs.width / 2;
  const axisY = osCvs.height / 2;
  const colorDom = document.getElementById('color') as HTMLInputElement;
  const lineWidthDom = document.getElementById('lineWidth') as HTMLInputElement;
  const [textarea, textareaMask] = initInputDom(colorDom);

  let drawing = false;
  canvas.addEventListener('mousedown', (e: MouseEvent) => {
    drawing = true;
    start(coreData, osCvs.ctx, colorDom, lineWidthDom, {layerX: e.layerX, layerY: e.layerY}, axisX, axisY);
  });

  canvas.addEventListener('mousemove', (e: MouseEvent) => {
    if (!drawing) return;
    move(coreData, {layerX: e.layerX, layerY: e.layerY}, axisX, axisY);
  });

  canvas.addEventListener('mouseup', (e: MouseEvent) => {
    if (!drawing) return;
    end(coreData, {layerX: e.layerX, layerY: e.layerY}, axisX, axisY);
    drawing = false;
  });
  canvas.addEventListener('mouseleave', () => {
    drawing = false;
  });
  canvas.addEventListener('mouseout', () => {
    drawing = false;
  });
  canvas.addEventListener('dblclick', (e: MouseEvent) => {
    // console.log('dbl click');
    const saveX1 = e.layerX * 2 - axisX;
    const saveY1 = e.layerY * 2 - axisY;
    currentIndex = getSelectorIndex(coreData, osCvs.ctx, colorDom, saveX1, saveY1);
    const current = coreData.getItem(currentIndex);
    if (current) {
      const {color, lineWidth, shape} = current;
      colorDom.value = color;
      lineWidthDom.value = `${lineWidth}`;
      if(current.type === 'txt') {
        input = current.text;
        showInput((shape[0] + axisX) / 2, (shape[1] + axisY) / 2, current.text);
      }
    }
  });
  {
    // touch
    canvas.addEventListener('touchstart', (e: TouchEvent) => {
      drawing = true;
      start(coreData, osCvs.ctx, colorDom, lineWidthDom, {layerX: e.changedTouches[0].clientX, layerY: e.changedTouches[0].clientY}, axisX, axisY);
    });
    canvas.addEventListener('touchmove', (e: TouchEvent) => {
      // console.log(e.changedTouches.length, e);
      if (!drawing) return;
      move(coreData, {layerX: e.changedTouches[0].clientX, layerY: e.changedTouches[0].clientY}, axisX, axisY);
    });
    canvas.addEventListener('touchend', (e: TouchEvent) => {
      if (!drawing) return;
      end(coreData, {layerX: e.changedTouches[0].clientX, layerY: e.changedTouches[0].clientY}, axisX, axisY);
      drawing = false;
    });
    canvas.addEventListener('touchcancel', (e: TouchEvent) => {
      drawing = false;
    });
    canvas.addEventListener('drag', () => {});
    document.body.addEventListener('touchmove', function (e) {
      e.preventDefault();
    }, {passive: false});
  }
  colorDom.addEventListener('input', (e) => {
    coreData.getValue().forEach((item) => {
      if(item.isActive) {
        item.color = colorDom.value || '#fff';
      }
    });
  });
  lineWidthDom.addEventListener('change', (e) => {
    coreData.getValue().forEach((item) => {
      if(item.isActive) {
        item.lineWidth = parseInt(lineWidthDom.value, 10);
      }
    });
  });
  let input = ''; // 维护文字输入状态，超长禁止输入
  textarea.addEventListener('keydown', (e: KeyboardEvent) => {
    // 先keydown，后input
    if (e.key === 'Escape') {
      e.stopPropagation();
      endInput();
      return
    }
    if (e.key === 'Enter') return endInput();
    if (input.length > 30 && e.key !== 'Backspace') {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    input = (e.target as HTMLTextAreaElement).value;
  });

  textarea.addEventListener('input', (e) => {
    // 先keydown，后input
    const current = coreData.getItem(currentIndex);
    if(current) {
      (current as Txt).text = textarea.value;
    }
  })

  textareaMask.addEventListener('click', (e: MouseEvent) => {
    endInput();
  });

  function endInput() {
    input = '';
    if (textarea.value) {
      (coreData.getItem(currentIndex) as Txt).text = textarea.value;
    } else {
      coreData.pop();
    }
    textareaMask.style.display = 'none';
    textarea.style.display = 'none';
    textarea.value = '';
    currentIndex = coreData.length;
  }
}
