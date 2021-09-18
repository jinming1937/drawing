/**
 * 画线段
 * @param {Object} ctx canvas context
 * @param {Array} lines line array
 * @returns
 */
export function drawLine(ctx: CanvasRenderingContext2D, color: string, lineWidth: number, lines: number[]) {
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
  ctx.strokeStyle = color // '#f5f5f5';
  ctx.lineWidth = lineWidth
  ctx.closePath()
  ctx.stroke()
  ctx.restore()
}
