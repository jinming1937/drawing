import {initCanvas, OffScreenCanvas} from "../canvas";

const CANVAS_ID = 'brick-app';

interface IConfig {
  width: number;
  height: number;
  dpr: number;
}
/**
 *
 */
export function createApp(config: IConfig): [CanvasRenderingContext2D, HTMLCanvasElement, OffScreenCanvas] {
  const {height, width, dpr} = config;
  const [context, canvas] = initCanvas(CANVAS_ID, width, height, dpr);
  const osCvs = new OffScreenCanvas({screenWidth: width, screenHeight: height, dpr});
  return [context, canvas, osCvs];
}
