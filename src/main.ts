import {animate} from './util/animate';
import {axisTips, initCanvas, drawData, mouseDraw, initKey, initExportPicture, initExportData, IDrawData, Txt, Pen} from './dom';
import {drawAxis, setBackground, drawLine, drawLineRect, drawPen, drawText} from './draw';

function Main(w: Window) {
  console.log('window load ok, start js!!!');
  const themeDom = document.getElementById('theme') as HTMLInputElement;
  const needAxis = document.getElementById('need-axis') as HTMLInputElement;
  const [context, canvas] = initCanvas('brick-app', window.innerWidth, window.innerHeight);
  if (!context) return;
  axisTips(canvas); // 坐标提示
  setBackground(context, themeDom.value); // bg
  initExportPicture(canvas); // 绑定导出图片
  initExportData(w);
  mouseDraw(context); // 绑定事件

  {
    // 绘画操作的前进、后退
    const cache: IDrawData[] = [];
    initKey(window, function(action: 'back' | 'forward') {
      switch(action) {
        case 'back':
          // command + z, 执行
          if (drawData.length > 0) {
            const shape = drawData.pop();
            if (shape) cache.push(shape);
          }
          break;
        case 'forward':
          if (cache.length > 0) {
            const shape = cache.pop();
            if (shape) drawData.push(shape);
          }
          break;
      }
    });
  }

  animate(function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    setBackground(context, themeDom.value);
    if(needAxis.checked) { drawAxis(context, '#FFFFFF') }
    drawData.forEach((item) => {
      const {type, color, lineWidth, shape} = item;
      switch(type) {
        case 'line':
          drawLine(context, color, lineWidth, shape);
          break;
        case 'rect':
          drawLineRect(context, color, lineWidth, shape);
          break;
        case 'pen':
          drawPen(context, color, lineWidth, (item as Pen).lines);
          break;
        case 'txt':
          drawText(context, color, (item as Txt).text || '', shape);
          break;
      }
    })
  });
}

window.onload = () => {
  Main(window);
}
