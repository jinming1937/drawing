export function drawText(ctx: CanvasRenderingContext2D, color: string, text: string, position: number[]) {
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
}
