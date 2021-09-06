;(function(w) {
  w.lines = [];
  w.rects = [];

  /**
   * 绑定事件 & 返回绘画函数
   * @param {Object} ctx canvas context
   * @param {String} type type line
   * @returns Fn Callback
   */
  function draw(ctx) {
    const dom = ctx.canvas;
    const domWidth = dom.width;
    const domHeight = dom.height;
    const axisX = domWidth / 2;
    const axisY = domHeight / 2;

    const typeDom = document.getElementById('line');
    
    const lines = w.lines;
    const rects = w.rects;
    let currentLineIndex = lines.length;
    let currentRectIndex = rects.length;
    dom.addEventListener('mousedown', (e) => {
      const type = typeDom.checked ? 'line' : 'rect';
      switch(type) {
        case 'line':
          currentLineIndex = lines.length;
          lines.push([e.layerX * 2 - axisX, e.layerY * 2 - axisY]);
          break;
        case 'rect':
          currentRectIndex = rects.length;
          rects.push([e.layerX * 2 - axisX, e.layerY * 2 - axisY]);
          break;
      }

    });
  
    dom.addEventListener('mousemove', (e) => {
      const type = typeDom.checked ? 'line' : 'rect';
      switch(type) {
        case 'line':
          if (!lines[currentLineIndex] || lines[currentLineIndex].length === 0) { // 没有点击开始
            return;
          }
          lines[currentLineIndex][2] = e.layerX * 2 - axisX;
          lines[currentLineIndex][3] = e.layerY * 2 - axisY;
          break;
        case 'rect':
          if (!rects[currentRectIndex] || rects[currentRectIndex].length === 0) { // 没有点击开始
            return;
          }
          rects[currentRectIndex][2] = Math.abs(e.layerX * 2 - axisX - rects[currentRectIndex][0]);
          rects[currentRectIndex][3] = Math.abs(e.layerY * 2 - axisY - rects[currentRectIndex][1]);
          break;
      }
    });
  
    dom.addEventListener('mouseup', (e) => {
      const type = typeDom.checked ? 'line' : 'rect';
      switch(type) {
        case 'line':
          lines[currentLineIndex][2] = e.layerX * 2 - axisX;
          lines[currentLineIndex][3] = e.layerY * 2 - axisY;
          currentLineIndex = lines.length; // 本次绘画结束，index 前移
          break;
        case 'rect':
          rects[currentRectIndex][2] = Math.abs(e.layerX * 2 - axisX - rects[currentRectIndex][0]);
          rects[currentRectIndex][3] = Math.abs(e.layerY * 2 - axisY - rects[currentRectIndex][1]);
          currentRectIndex = rects.length; // 本次绘画结束，index 前移
          break;
      }
      
    });
  }

  w.mouseDraw = draw;
}(window));