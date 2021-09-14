;(function(w) {
  function drawRect(ctx, color, lineWidth, rects) {
    if (rects.length < 0) return;
    const dom = ctx.canvas;
    const domWidth = dom.width;
    const domHeight = dom.height;
    const axisX = domWidth / 2;
    const axisY = domHeight / 2;
    ctx.save();
    ctx.translate(axisX, axisY);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    // rects.forEach((item) => {
      ctx.strokeRect(rects[0], rects[1], rects[2], rects[3]);
    // });
    ctx.restore();
  }

  w.drawRect = drawRect;
} (window));