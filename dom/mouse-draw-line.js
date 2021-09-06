;(function(w) {
  /**
   * 绑定事件 & 返回绘画函数
   * @param {Object} ctx canvas context
   * @param {String} type type line
   * @returns Fn Callback
   */
  function draw(ctx, type = 'line') {
    const dom = ctx.canvas;
    const domWidth = dom.width;
    const domHeight = dom.height;
    const axisX = domWidth / 2;
    const axisY = domHeight / 2;

    const lines = [];
    let currentLineIndex = lines.length;
    dom.addEventListener('mousedown', (e) => {
      currentLineIndex = lines.length;
      lines.push([e.layerX * 2 - axisX, e.layerY * 2 - axisY]);
    });
  
    dom.addEventListener('mousemove', (e) => {
      if (!lines[currentLineIndex] || lines[currentLineIndex].length === 0) { // 没有点击开始
        return;
      }
      switch(type) {
        case 'line':
          lines[currentLineIndex][2] = e.layerX * 2 - axisX;
          lines[currentLineIndex][3] = e.layerY * 2 - axisY;
          break;
        case '':
          break;
      }
    });
  
    dom.addEventListener('mouseup', (e) => {
      lines[currentLineIndex][2] = e.layerX * 2 - axisX;
      lines[currentLineIndex][3] = e.layerY * 2 - axisY;
      currentLineIndex = lines.length; // 本次绘画结束，index 前移
    });

    return () => drawLine(ctx, lines);
  }

  /**
   * 画线段
   * @param {Object} ctx canvas context
   * @param {Array} lines line array
   * @returns 
   */
  function drawLine(ctx, lines) {
    if (lines.length < 0) return;
    const dom = ctx.canvas;
    const domWidth = dom.width;
    const domHeight = dom.height;
    const axisX = domWidth / 2;
    const axisY = domHeight / 2;
    ctx.save();
    ctx.translate(axisX, axisY);
    ctx.beginPath();
    lines.forEach((item) => {
      ctx.moveTo(item[0], item[1]);
      ctx.lineTo(item[2], item[3]);
    })
    ctx.strokeStyle = '#f5f5f5';
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  window.mouseDrawLine = draw;
}(window));