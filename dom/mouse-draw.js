;(function(w) {
  w.drawData = [];
  let currentIndex = 0;

  function getType() {
    const [line, rect, pen] = document.querySelectorAll('input[name="shape"]');
    if(line.checked) return 'line';
    if(rect.checked) return 'rect';
    if(pen.checked) return 'pen';
  }

  function start(colorDom, lineWidthDom, e, axisX, axisY) {
    const type = getType();
    const color = `${colorDom.value || '#ffffff'}`;
    const lineWidth = parseInt(lineWidthDom.value || '1', 10) || 1;
    currentIndex = drawData.length;
    const shape = [];
    switch(type) {
      case 'line':
      case 'rect':
        shape.push(e.layerX * 2 - axisX, e.layerY * 2 - axisY);
        break;
      case 'pen':
        shape.push([e.layerX * 2 - axisX, e.layerY * 2 - axisY]);
        break;
    }
    w.drawData.push({type, color, lineWidth, shape});
  }

  function move(e, axisX, axisY) {
    const type = getType();
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
        // const shape = w.drawData[currentIndex].shape;
        // w.drawData[currentIndex].shape[2] = Math.abs(e.layerX * 2 - axisX - shape[0]);
        // w.drawData[currentIndex].shape[3] = Math.abs(e.layerY * 2 - axisY - shape[1]);
        w.drawData[currentIndex].shape[2] = e.layerX * 2 - axisX;
        w.drawData[currentIndex].shape[3] = e.layerY * 2 - axisY;
        break;
      case 'pen':
        w.drawData[currentIndex].shape.push([e.layerX * 2 - axisX, e.layerY * 2 - axisY]);
        break;
    }
  }

  function end(e, axisX, axisY) {
    const type = getType();
    switch(type) {
      case 'line':
        w.drawData[currentIndex].shape[2] = e.layerX * 2 - axisX;
        w.drawData[currentIndex].shape[3] = e.layerY * 2 - axisY;
        break;
      case 'rect':
        // const shape = w.drawData[currentIndex].shape;
        // w.drawData[currentIndex].shape[2] = Math.abs(e.layerX * 2 - axisX - shape[0]);
        // w.drawData[currentIndex].shape[3] = Math.abs(e.layerY * 2 - axisY - shape[1]);
        w.drawData[currentIndex].shape[2] = e.layerX * 2 - axisX;
        w.drawData[currentIndex].shape[3] = e.layerY * 2 - axisY;
        break;
      case 'pen':
        w.drawData[currentIndex].shape.push([e.layerX * 2 - axisX, e.layerY * 2 - axisY]);
        break;
    }
    currentIndex = w.drawData.length;
  }

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
    const colorDom = document.getElementById('color');
    const lineWidthDom = document.getElementById('lineWidth');

    let drawing = false;
    dom.addEventListener('mousedown', (e) => {
      drawing = true;
      start(colorDom, lineWidthDom, e, axisX, axisY);
    });
  
    dom.addEventListener('mousemove', (e) => {
      if (!drawing) return;
      move(e, axisX, axisY);
    });
  
    dom.addEventListener('mouseup', (e) => {
      if (!drawing) return;
      end(e, axisX, axisY);
    });
  }

  w.mouseDraw = draw;
}(window));