export function isPointInPath(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, aimX: number, aimY: number) {
  createRectPath(ctx, x, y, width, height);
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#FFF';
  return ctx.isPointInPath(aimX, aimY);
}

export function createRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.closePath();
}

export function lineRectPath(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {
  ctx.beginPath();
  if (Math.abs(y1 - y2) < 10 && Math.abs(x1 - x2) > 10) {
    const minY = Math.min(y1, y2) - 10;
    const maxY = Math.max(y1, y2) + 10;
    ctx.moveTo(x1, minY);
    ctx.lineTo(x2, minY);
    ctx.lineTo(x2, maxY);
    ctx.lineTo(x1, maxY);
  } else if (Math.abs(x1 - x2) < 10 && Math.abs(y1 - y2) > 10) {
    const minX = Math.min(x1, x2) - 10;
    const maxX = Math.max(x1, x2) + 10;
    ctx.moveTo(minX, y1);
    ctx.lineTo(maxX, y1);
    ctx.lineTo(maxX, y2);
    ctx.lineTo(minX, y2);
  } else {
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x1, y2);
  }
  ctx.closePath();
}

export function penRectPath(ctx: CanvasRenderingContext2D, lines: number[][]) {
  let minX = lines[0][0];
  let minY = lines[0][1];
  let maxX = lines[0][0];
  let maxY = lines[0][1];
  lines.forEach((i) => {
    const [x, y] = i;
    if(x < minX) minX = x;
    if(x > maxX) maxX = x;
    if(y < minY) minY = y;
    if(y > maxY) maxY = y;
  });
  createRectPath(ctx, minX, minY, Math.abs(maxX - minX), Math.abs(maxY - minY))
}

export function txtRectPath(ctx: CanvasRenderingContext2D, text: string, x: number, y: number) {
  ctx.beginPath();
  ctx.font = `16px serif`
  const txtLength = ctx.measureText(text);
  ctx.moveTo(x, y - 24);
  ctx.lineTo(x + txtLength.width * 2, y - 24);
  ctx.lineTo(x + txtLength.width * 2, y + 8);
  ctx.lineTo(x, y + 8);
  ctx.closePath();
}
