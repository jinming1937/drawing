;(function(w) {

  /**
   * 画线段
   * @param {Object} ctx canvas context
   * @param {Array} lines line array
   * @returns 
   */
   function drawLine(ctx, color, lines) {
    if (lines.length < 0) return;
    const dom = ctx.canvas;
    const domWidth = dom.width;
    const domHeight = dom.height;
    const axisX = domWidth / 2;
    const axisY = domHeight / 2;
    ctx.save();
    ctx.translate(axisX, axisY);
    ctx.beginPath();
    // lines.forEach((item) => {
      ctx.moveTo(lines[0], lines[1]);
      ctx.lineTo(lines[2], lines[3]);
    // })
    ctx.strokeStyle = color; // '#f5f5f5';
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  w.drawLine = drawLine
}(window));