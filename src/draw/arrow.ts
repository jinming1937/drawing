export function drawArrow(ctx: CanvasRenderingContext2D, color: string, lineWidth: number, lines: number[], solid: boolean = false) {
  if (lines.length < 4) return
  const dom = ctx.canvas
  const domWidth = dom.width
  const domHeight = dom.height
  const axisX = domWidth / 2
  const axisY = domHeight / 2
  const [x1, y1, x2, y2] = lines

  // const [cX, cY] = [x2 + axisX, y2 + axisY];

  ctx.save()
  ctx.translate(axisX, axisY)
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)


  let angle = 0;
  let f = -1;

  if (x2 !== x1) {
    angle = -Math.atan(((-y2) - (-y1)) / (x2 - x1)); // 反正切值 返回弧度
    if (x2 < x1) {
      f = 1;
    } else {
      f = -1;
    }
  } else {
    angle = (y2 > y1 ? 1 : -1) * 90 * Math.PI / 180;
  }

  const len = Math.min(Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)) * 0.1, solid ? 15 : 20);
  ctx.save()
  ctx.translate(x2, y2);
  ctx.rotate(angle);  // y/x -> 应该逆时针旋转
  ctx.moveTo(0, 0);
  ctx.lineTo(f * len * 2, len);
  if (solid) {
    ctx.lineTo(f * len * 2, -len);
    ctx.moveTo(0, 0);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  } else {
    ctx.moveTo(0, 0);
    ctx.lineTo(f * len * 2, -len);
    ctx.strokeStyle = color;
    ctx.stroke();
  }
  ctx.restore()

  ctx.strokeStyle = color
  ctx.lineWidth = lineWidth
  ctx.stroke()
  ctx.restore()
}
