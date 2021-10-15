/**
 * 画线段
 * @param {Object} ctx canvas context
 * @param {Array} lines line array
 * @returns
 */
export function drawLine(ctx: CanvasRenderingContext2D, color: string, lineWidth: number, lines: number[], isActive?: boolean) {
  if (lines.length < 0) return
  const dom = ctx.canvas
  const domWidth = dom.width
  const domHeight = dom.height
  const axisX = domWidth / 2
  const axisY = domHeight / 2
  const [x1, y1, x2, y2] = lines
  ctx.save()
  ctx.translate(axisX, axisY)
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  if(isActive) {
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
      ctx.closePath();
    }
  }
  ctx.strokeStyle = color // '#f5f5f5';
  ctx.lineWidth = lineWidth
  ctx.closePath()
  ctx.stroke()
  ctx.restore()
}
