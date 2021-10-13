import {IDrawData, Pen, Txt} from 'types/common';
import {animate} from './util/animate';
import {axisTips, initCanvas, initMouseDraw, initKey, initExportPicture, initExportData, initImportJSON, initRemote, initClear, initRightBar} from './dom';
import {setBackground, drawLine, drawLineRect, drawPen, drawText, drawArrow} from './draw';
import {calculateMatrix, calculate3D, cal, createMatrix, coreData} from './lib';

function getNumMatrix(ctx: CanvasRenderingContext2D) {
  const startLeft: [number, number] = [-300 , -100];
  const matrixLeft = [-3,2,3,-4,4,-2,7,8,-4];
  const startRight: [number, number] = [60 , -100];
  const matrixRight = [5,8,-1,2,-6,0,9,8,4];
  const startReturn: [number, number] = [-600, 100];
  const [result, resultStr] = calculate3D(matrixLeft, matrixRight);
  const [leftMatrix] = calculateMatrix(startLeft, matrixLeft, ctx);
  const [rightMatrix] = calculateMatrix(startRight, matrixRight, ctx);
  const [resultMatrix] = calculateMatrix(startReturn, resultStr, ctx);
  const startR: [number, number] = [-200, 300];
  const [resultM] = calculateMatrix(startR, result, ctx);

  return [leftMatrix, rightMatrix, resultMatrix, resultM];
}

function getStrMatrix(ctx: CanvasRenderingContext2D) {
  const startLeft: [number, number] = [-300 , -100];
  const matrixLeft = [
    [-3,2,3],
    [-4,8,1],
    [9,5,6],
  ];
  const startRight: [number, number] = [60 , -100];
  const matrixRight = [
    ['x'],
    ['y'],
    ['z']
  ];
  const startReturn: [number, number] = [-280, 100];
  const [result, resultStr] = cal(matrixLeft, matrixRight, true);
  const [leftMatrix] = createMatrix(startLeft, matrixLeft, ctx);
  const [rightMatrix] = createMatrix(startRight, matrixRight, ctx);
  const [resultMatrix] = createMatrix(startReturn, resultStr, ctx);
  return [leftMatrix, rightMatrix, resultMatrix];
}


export const cacheData: IDrawData[] = [];
export const drawData = coreData.value;

function Main(w: Window) {
  console.log('window load ok, start js!!!');
  const themeDom = document.getElementById('theme') as HTMLInputElement;
  const [context, canvas] = initCanvas('brick-app', window.innerWidth, window.innerHeight);
  if (!context) return;
  axisTips(canvas); // 坐标提示
  setBackground(context, themeDom.value); // bg
  initExportPicture(canvas); // 绑定导出图片
  initExportData(coreData, w);
  initImportJSON((val: IDrawData[]) => {
    coreData.push(...val);
  });
  initRightBar(coreData);

  initRemote((fileName: string) => {
    if(fileName) {
      const name = window.encodeURIComponent(fileName);
      const url = `http://file.auoqu.com/v1/${name}`;
      window.fetch(url).then((res) => {
        return res.json();
      }).then(function(json) {
        if (Array.isArray(json) && json.length > 0) {
          coreData.push(...json);
        }
      });
    }
  });

  initClear(() => {
    coreData.clear();
    cacheData.length = 0;
  });

  initMouseDraw(coreData, context); // 绑定事件

  {
    // 绘画操作的前进、后退
    initKey(window, (action: 'back' | 'forward') => {
      switch(action) {
        case 'back':
          // command + z, 执行
          if (coreData.length > 0) {
            const shape = coreData.pop();
            if (shape) cacheData.push(shape);
          }
          break;
        case 'forward':
          if (cacheData.length > 0) {
            const shape = cacheData.pop();
            if (shape) coreData.push(shape);
          }
          break;
      }
    });
  }

  // const allMatrix = getNumMatrix(context);
  // const allMatrix = getStrMatrix(context);

  // const item = leftMatrix[0];
  // animateFrame(function() {
  //   if (item.x >= -100 || item.y >= 100) {
  //     return;
  //   }
  //   item.x += 2.7;
  //   item.y += 2;
  // });


  animate(function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    setBackground(context, themeDom.value);

    // allMatrix.forEach((arr) => {
    //   arr.forEach((item) => {
    //     drawText(context, '#FFFFFF', item.text, [item.x, item.y]);
    //   });
    // });

    coreData.value.forEach((item) => {
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
