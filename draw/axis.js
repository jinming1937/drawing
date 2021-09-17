;(function(w) {
  /**
   * creat axis
   * @param {Object} ctx canvas context
   * @param {Boolean} needOriginPoint need show origin point
   * @param {String} x x axis string x, s etc...
   * @param {String} y y axis string x, t etc...
   */
  function drawAxis(ctx, color = '#FFFFFF', needOriginPoint = false, x = 'x', y = 'y') {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    const halfLine = 450; // 半线长
    const arrowHeight = 20; // 箭头长度
    const arrowWidth = arrowHeight / 2; // 箭头宽度
    const textTrans = [5, 25]; // x,y 偏移
    const textSize = 16 * 2; // x,y 字体
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.beginPath();
    // axis x line
    ctx.moveTo(-halfLine, 0);
    ctx.lineTo(halfLine, 0);
    // axis y line
    ctx.moveTo(0, -halfLine);
    ctx.lineTo(0, halfLine);
    ctx.strokeStyle = color;
    // arrow x
    ctx.moveTo(halfLine, -arrowWidth);
    ctx.lineTo(halfLine, arrowWidth);
    ctx.lineTo(halfLine + arrowHeight, 0);
    ctx.closePath();
    // arrow y
    ctx.moveTo(-arrowWidth, -halfLine);
    ctx.lineTo(arrowWidth, -halfLine);
    ctx.lineTo(0, -(halfLine + arrowHeight));
    ctx.closePath();
    ctx.fillStyle = color
    ctx.stroke();
    ctx.fill();
    ctx.restore();
    // x, y
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.font = `italic ${textSize}px serif`;
    ctx.fillStyle = color;
    ctx.fillText(x, halfLine + textTrans[0], textTrans[1]);
    ctx.fillText(y, -textTrans[1], -(halfLine + textTrans[0]));
    if (needOriginPoint) {
      ctx.fillText('(0, 0)', -textTrans[1] * 3, textTrans[1]);
    }
    ctx.restore();
  }

  w.drawAxis = drawAxis;
}(window));