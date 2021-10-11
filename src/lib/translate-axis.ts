
export function translateAxis(x: number, y: number, canvas: HTMLCanvasElement) {
  const trueX = x;
  const trueY = canvas.height - y;
  return [trueX, trueY];
}
