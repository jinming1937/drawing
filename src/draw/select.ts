export function select(ctx: CanvasRenderingContext2D, center: [number, number], callback: () => void) {
  ctx.save();
  if (center.length === 2) {
    const [centerX, centerY] = center;
    ctx.translate(centerX, centerY);
  }
  callback();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();
}
