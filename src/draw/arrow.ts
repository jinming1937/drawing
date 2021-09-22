import {activePath} from '../lib';


 export function drawArrow(ctx: CanvasRenderingContext2D, color: string, lineWidth: number, lines: number[]) {
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

  console.log(x1, -y1, x2, -y2);
  let angle = 0;
  let f = -1;
  // if (x2 > x1 && (-y2) > (-y1)) {
  //   // 向上
  //   angle = Math.atan((-y2) - (-y1) / (x2 - x1)); // 余弦值
  // } else if (x2 > x1 && (-y2) < (-y1)) {
  //   angle = Math.atan((-y2) - (-y1) / (x2 - x1)); // 余弦值
  // } else if(x1 === x2 && (-y2) > (-y1)) {
  //   angle = -90 * Math.PI / 180;
  // } else if (x1 === x2 && (-y2) < (-y1)) {
  //   angle = 90 * Math.PI / 180;
  // } else if (x2 < x1 && (-y2) > (-y1)) {
  //   angle = Math.atan((-y2) - (-y1) / (x1 - x2)); // 余弦值
  // } else {
  //   angle = Math.atan((-y2) - (-y1) / (x1 - x2)); // 余弦值
  // }

  if (x2 > x1 && (-y2) > (-y1)) {
    angle = Math.atan((x2 - x1) / (-y2) - (-y1));
  }


  ctx.save()
  ctx.translate(x2, y2);
  ctx.rotate(angle)
  // ctx.save();
  // ctx.rotate(45 * Math.PI / 180);
  ctx.moveTo(0, 0);
  ctx.lineTo(f * 40, 20);
  ctx.lineTo(f * 40, -20);
  ctx.lineTo(0, 0);
  ctx.restore()

  ctx.strokeStyle = color // '#f5f5f5';
  ctx.lineWidth = lineWidth
  // ctx.closePath()
  ctx.stroke()
  ctx.restore()
}
