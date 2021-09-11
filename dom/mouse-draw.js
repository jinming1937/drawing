;(function(w) {
  w.drawData = [];

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
    
    let currentIndex = 0;
    let drawing = false;
    dom.addEventListener('mousedown', (e) => {
      drawing = true;
      const type = typeDom.checked ? 'line' : 'rect';
      currentIndex = drawData.length;
      const shape = [];
      switch(type) {
        case 'line':
          shape.push(e.layerX * 2 - axisX, e.layerY * 2 - axisY);
          break;
        case 'rect':
          shape.push(e.layerX * 2 - axisX, e.layerY * 2 - axisY);
          break;
        }
        w.drawData.push({type, shape});
      });
  
    dom.addEventListener('mousemove', (e) => {
      if (!drawing) return;
      const type = typeDom.checked ? 'line' : 'rect';
      const current = w.drawData[currentIndex];
      if (!current || current.shape.length === 0) {
        return;
      }
      switch(type) {
        case 'line':
          w.drawData[currentIndex].shape[2] = e.layerX * 2 - axisX;
          w.drawData[currentIndex].shape[3] = e.layerY * 2 - axisY;
          break;
        case 'rect':
          const shape = w.drawData[currentIndex].shape;
          w.drawData[currentIndex].shape[2] = Math.abs(e.layerX * 2 - axisX - shape[0]);
          w.drawData[currentIndex].shape[3] = Math.abs(e.layerY * 2 - axisY - shape[1]);
          break;
      }
    });
  
    dom.addEventListener('mouseup', (e) => {
      if (!drawing) return;
      const type = typeDom.checked ? 'line' : 'rect';
      switch(type) {
        case 'line':
          w.drawData[currentIndex].shape[2] = e.layerX * 2 - axisX;
          w.drawData[currentIndex].shape[3] = e.layerY * 2 - axisY;
          break;
        case 'rect':
          const shape = w.drawData[currentIndex].shape;
          w.drawData[currentIndex].shape[2] = Math.abs(e.layerX * 2 - axisX - shape[0]);
          w.drawData[currentIndex].shape[3] = Math.abs(e.layerY * 2 - axisY - shape[1]);
          break;
      }
      currentIndex = w.drawData.length;
    });
  }

  w.mouseDraw = draw;
}(window));