
export  function drawLineRect(ctx: CanvasRenderingContext2D, color: string, lineWidth: number, lines: number[], isActive?: boolean) {
    if (lines.length < 0) return;
    const dom = ctx.canvas;
    const domWidth = dom.width;
    const domHeight = dom.height;
    const axisX = domWidth / 2;
    const axisY = domHeight / 2;
    const [x1, y1, x2, y2] = lines;
    ctx.save();
    ctx.translate(axisX, axisY);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1, y2);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x2, y1);
    ctx.lineTo(x1, y1);
    // 对角线
    // ctx.moveTo(x1, y1);
    // ctx.lineTo(x2, y2);

    ctx.stroke();
    ctx.restore();
  }
