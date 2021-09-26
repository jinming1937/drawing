import {animate} from './util/animate';
import {axisTips, initCanvas, drawData, mouseDraw, initKey, initExportPicture, initExportData, initImportJSON, IDrawData, Txt, Pen, initRemote, initClear} from './dom';
import {setBackground, drawLine, drawLineRect, drawPen, drawText, drawArrow} from './draw';

const cacheData: IDrawData[] = [];

function Main(w: Window) {
  console.log('window load ok, start js!!!');
  const themeDom = document.getElementById('theme') as HTMLInputElement;
  const [context, canvas] = initCanvas('brick-app', window.innerWidth, window.innerHeight);
  if (!context) return;
  axisTips(canvas); // 坐标提示
  setBackground(context, themeDom.value); // bg
  initExportPicture(canvas); // 绑定导出图片
  initExportData(w);
  initImportJSON((val: IDrawData[]) => {
    drawData.push(...val);
  });

  initRemote((fileName: string) => {
    if(fileName) {
      const name = window.encodeURIComponent(fileName);
      const url = `http://file.auoqu.com/v1/${name}`;
      window.fetch(url).then((res) => {
        return res.json();
      }).then(function(json) {
        console.log(json);
        if (Array.isArray(json) && json.length > 0) {
          drawData.push(...json);
        }
      });
    }
  });

  initClear(() => {
    drawData.length = 0;
    cacheData.length = 0;
  });

  mouseDraw(context); // 绑定事件

  {
    // 绘画操作的前进、后退
    initKey(window, function(action: 'back' | 'forward') {
      switch(action) {
        case 'back':
          // command + z, 执行
          if (drawData.length > 0) {
            const shape = drawData.pop();
            if (shape) cacheData.push(shape);
          }
          break;
        case 'forward':
          if (cacheData.length > 0) {
            const shape = cacheData.pop();
            if (shape) drawData.push(shape);
          }
          break;
      }
    });
  }

  animate(function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    setBackground(context, themeDom.value);
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
        case 'arrow':
          drawArrow(context, color, lineWidth, shape);
      }
    })
  });
}

window.onload = () => {
  Main(window);
}

export {
  drawData,
  cacheData,
}
