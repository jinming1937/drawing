import {IDrawData, Pen, Txt} from 'types/common';
import {calculateMatrix, calculate3D, cal, createMatrix, CoreData} from './lib';
import {createApp, createToolBar} from './app';
import {animate} from './util';
import {setBackground, drawLine, drawLineRect, drawPen, drawText, drawArrow} from './draw';

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

function Main() {
  console.log('window load ok, start js!!!');
  const themeDom = document.getElementById('theme') as HTMLInputElement;
  // 注册canvas, 离屏canvas
  const [context, canvas, osCvs] = createApp({width: window.innerWidth, height: window.innerHeight, dpr: 2});
  // 初始化数据管理
  const coreData = new CoreData<IDrawData>();
  createToolBar(canvas, coreData, osCvs);
  setBackground(context, themeDom.value); // bg

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
      const {type, color, lineWidth, shape, isActive = false} = item;
      switch(type) {
        case 'line':
          drawLine(context, color, lineWidth, shape, isActive);
          break;
        case 'rect':
          drawLineRect(context, color, lineWidth, shape, isActive);
          break;
        case 'pen':
          drawPen(context, color, lineWidth, (item as Pen).lines, isActive);
          break;
        case 'txt':
          drawText(context, color, (item as Txt).text || '', shape, isActive);
          break;
        case 'arrow':
          drawArrow(context, color, lineWidth, shape, isActive);
      }
    })
  });
  return coreData;
}

const globalData = {
  coreData: [] as unknown as CoreData<IDrawData>,
}

window.onload = () => {
  globalData.coreData = Main();
  // window.coreData = globalData.coreData;
};

export default globalData;
