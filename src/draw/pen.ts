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
  if(isActive) {
    let minX = 0;
    let minY = 0;
    let maxX = 0;
    let maxY = 0;
    lines.forEach((i) => {
      const [x, y] = i;
      if(x < minX) minX = x;
      if(x > maxX) maxX = x;
      if(y < minY) minY = y;
      if(y > maxY) maxY = y;
    });
    ctx.moveTo(minX, minY);
    ctx.lineTo(maxX, minY);
    ctx.lineTo(maxX, maxY);
    ctx.lineTo(minX, maxY);
    ctx.closePath();
  }
  ctx.stroke()
  ctx.restore()
}
