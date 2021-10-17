/**
 * 离屏canvas，单例
 * 性能优化：为光标选择获取元素使用
*/

interface IOffScreenCanvas {
  screenWidth: number;
  screenHeight: number;
  dpr: number;
}

export class OffScreenCanvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  constructor(option: IOffScreenCanvas) {
    const {screenWidth, screenHeight, dpr} = option;
    const canvas = document.createElement('canvas');
    canvas.style.width = `${screenWidth}px`;
    canvas.style.height = `${screenHeight}px`;
    // canvas.style.position = 'absolute';
    // canvas.style.top = '0';
    // canvas.style.left = '0';
    // canvas.style.zIndex = '1000';
    // canvas.style.background = 'rgb(255 232 200 / 25%)';
    // canvas.style.pointerEvents = 'none';
    canvas.width = screenWidth * dpr;
    canvas.height = screenHeight * dpr;
    this.canvas = canvas;
    const ctx = this.canvas.getContext('2d');
    if(ctx) {
      this.ctx = ctx;
    } else {
      throw('error');
    }
    // this.ctx.translate(screenWidth, screenHeight);
    this.ctx.strokeStyle = '#fff';
    this.ctx.lineWidth = 1;
    this.width = screenWidth * dpr;
    this.height = screenHeight * dpr;
    // document.getElementById('brick-app')?.parentNode?.appendChild(canvas);
  }
}

// export const osCanvas = new OffScreenCanvas({
//   screenHeight: window.innerHeight,
//   screenWidth: window.innerWidth,
//   dpr: 2, // window.devicePixelRatio
// });
