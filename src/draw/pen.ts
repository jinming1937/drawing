import {penRectPath} from '../canvas/ctx-calc'
import {select} from './select'

export function drawPen(ctx: CanvasRenderingContext2D, color: string, lineWidth: number, lines: number[][], isActive?: boolean) {
  if (lines.length < 0) return
  const dom = ctx.canvas
  const domWidth = dom.width
  const domHeight = dom.height
  const axisX = domWidth / 2
  const axisY = domHeight / 2
  ctx.save()
  ctx.translate(axisX, axisY)
  ctx.strokeStyle = color
  ctx.lineWidth = lineWidth
  ctx.beginPath()
  ctx.moveTo(lines[0][0], lines[0][1])
  lines.forEach(item => {
    ctx.lineTo(item[0], item[1])
  });
  ctx.stroke()
  ctx.restore()
  if(isActive) {
    select(ctx, [axisX, axisY], () => {
      penRectPath(ctx, lines);
    });
  }
}
