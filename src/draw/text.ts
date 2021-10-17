import {txtRectPath} from '../canvas/ctx-calc'
import {select} from './select'

export function drawText(ctx: CanvasRenderingContext2D, color: string, text: string, position: number[], isActive?: boolean) {
  if (!text) return
  const textSize = 32
  const dom = ctx.canvas
  const domWidth = dom.width
  const domHeight = dom.height
  const centerX = domWidth / 2
  const centerY = domHeight / 2
  const [x, y] = position

  ctx.save()
  ctx.translate(centerX, centerY)
  ctx.font = `${textSize}px serif`
  ctx.fillStyle = color
  ctx.fillText(text, x, y)
  ctx.restore()
  if(isActive) {
    select(ctx, [centerX, centerY], () => {
      txtRectPath(ctx, text, x, y);
    });
  }
}
