;(function(w) {
  function drawRect(ctx, color, rects) {
    if (rects.length < 0) return;
    const dom = ctx.canvas;
    const domWidth = dom.width;
    const domHeight = dom.height;
    const axisX = domWidth / 2;
    const axisY = domHeight / 2;
    ctx.save();
    ctx.translate(axisX, axisY);
    ctx.strokeStyle = color;
    rects.forEach((item) => {
      ctx.strokeRect(item[0], item[1], item[2], item[3]);
    });
    ctx.restore();
  }

  w.drawRect = drawRect;
} (window));