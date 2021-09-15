;(function(w) {
  function drawPan(ctx, color, lineWidth, lines) {
    if (lines.length < 0) return;
    const dom = ctx.canvas;
    const domWidth = dom.width;
    const domHeight = dom.height;
    const axisX = domWidth / 2;
    const axisY = domHeight / 2;
    ctx.save();
    ctx.translate(axisX, axisY);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    lines.forEach((item) => {
      ctx.moveTo(item[0], item[1]);
      ctx.lineTo(item[2], item[3]);
    });
    ctx.stroke();
    ctx.restore();
  }

  w.drawPan = drawPan;
} (window));