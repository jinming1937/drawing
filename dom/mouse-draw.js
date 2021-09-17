;(function(w) {
  w.drawData = [];
  let currentIndex = 0;

  /**
   * 初始化一个颜色dom
   * @param {Object} colorDom 颜色DOM
   */
  function initInputDom(colorDom) {
    const textarea = document.createElement('textarea');
    textarea.id = 'textarea-input';
    textarea.style.background = "rgb(255 255 255 / 30%)";
    textarea.style.position = "absolute";
    textarea.style.left = 0;
    textarea.style.top = 0;
    textarea.style.color = colorDom.value;
    textarea.style.fontFamily = 'serif';
    textarea.style.fontSize = '16px';
    textarea.style.zIndex = 1000;
    textarea.style.border = 'none';
    textarea.style.outline = 'none';
    textarea.style.resize = 'none';
    textarea.style.width = '150px';
    textarea.style.height = '40px';
    textarea.style.display = 'none';
    textarea.placeholder = '请输入少于30个字';

    const textareaMask = document.createElement('div');
    textareaMask.id = 'textarea-mask';
    textareaMask.style.display = 'none';
    textareaMask.style.position = 'absolute';
    textareaMask.style.width = '100%';
    textareaMask.style.height = '100%';
    textareaMask.style.top = '0';
    textareaMask.style.left = '0';
    textareaMask.style.background = 'transparent';

    document.body.append(textarea);
    document.body.append(textareaMask);
    return [textarea, textareaMask];
  }

  /**
   * 展示文本输入
   * @param {number} x x position
   * @param {number} y y position
   */
  function showInput(x, y) {
    const colorDom = document.getElementById('color');
    const textarea = document.getElementById('textarea-input');
    const textareaMask = document.getElementById('textarea-mask');
    textareaMask.style.display = 'block';
    textarea.style.display = 'block';
    textarea.style.left = `${x}px`;
    textarea.style.top = `${y - 17}px`;
    textarea.style.color = colorDom.value;
    textarea.focus();
  }

  /**
   * 返回绘画类型
   * @returns 'line' | 'rect' | 'pen' | 'txt'
   */
  function getType() {
    const [line, rect, pen, txt] = document.querySelectorAll('input[name="shape"]');
    if(line.checked) return 'line';
    if(rect.checked) return 'rect';
    if(pen.checked) return 'pen';
    if(txt.checked) return 'txt';
  }

  function start(colorDom, lineWidthDom, e, axisX, axisY) {
    const type = getType();
    const color = `${colorDom.value || '#ffffff'}`;
    const lineWidth = parseInt(lineWidthDom.value || '1', 10) || 1;
    const shape = [];
    switch(type) {
      case 'line':
      case 'rect':
        shape.push(e.layerX * 2 - axisX, e.layerY * 2 - axisY);
        break;
      case 'pen':
        shape.push([e.layerX * 2 - axisX, e.layerY * 2 - axisY]);
        break;
      case 'txt':
        shape.push(e.layerX * 2 - axisX, e.layerY * 2 - axisY);
        break;
    }
    currentIndex = drawData.length;
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
      case 'txt':
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
        w.drawData[currentIndex].shape[2] = e.layerX * 2 - axisX;
        w.drawData[currentIndex].shape[3] = e.layerY * 2 - axisY;
        break;
      case 'pen':
        w.drawData[currentIndex].shape.push([e.layerX * 2 - axisX, e.layerY * 2 - axisY]);
        break;
      case 'txt':
        if(document.getElementById('textarea-input').style.display === 'block') {
          return;
        }
        showInput(e.layerX, e.layerY);
        return; // input 结束在blur处，所以后面的currentIndex 不用移动
    }
    currentIndex = w.drawData.length;
  }

  /**
   * 结束输入状态
   * @param {Object} inputDom textarea dom
   */
  function endInput(inputDom) {
    if (inputDom.value) {
      w.drawData[currentIndex].text = inputDom.value;
    } else {
      w.drawData.pop();
    }
    inputDom.style.display = 'none';
    inputDom.value = '';
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

    const [textarea, textareaMask] = initInputDom(colorDom);

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

    let input = ''; // 维护文字输入状态，超长禁止输入
    textarea.addEventListener('keydown', (e) => {
      if (input.length > 30 && e.key !== 'Backspace') {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      input = e.target.value;
    });

    textareaMask.addEventListener('click', (e) => {
      input = '';
      endInput(textarea); // 点击蒙层关闭输入态
      textareaMask.style.display = 'none';
    });
  }

  w.mouseDraw = draw;
}(window));