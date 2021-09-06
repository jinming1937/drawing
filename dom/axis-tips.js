;(function(w) {
  /**
   * layer: 元素级别, 元素左上角 0,0
   * offset: 元素级别, 元素左上角 0,0
   * client: document级别, 文档左上角 0,0
   * x,y: ?
   * page: document 级别
   * screen: 屏幕级别,电脑屏幕左上角 0,0
   * movement: 移动方向判断 [-1,0,1], →:1, ←:-1, ↓:1, ↑:-1
  */

  /**
   * cursor position info tips
   * @param {DocumentElement} dom canvas element
   * @param {Boolean} needAllInfo need show all cursor position info
   */
  function addTips(dom, needAllInfo = false) {
    const ID = 'sub-tips';
    const BLANK_WIDTH = 130;
    const div = document.createElement('div');
    const domWidth = dom.width;
    const domHeight = dom.height;
    const axisX = domWidth / 2;
    const axisY = domHeight / 2;
    div.setAttribute('id', ID)
    div.style.position = 'absolute';
    div.style.top = 0;
    div.style.left = 0;
    div.style.background = 'rgb(88 88 88 / 30%)';
    div.style.color = '#ababab';
    div.style.fontSize = '12px';
    div.style.width = `${BLANK_WIDTH}px`;
    div.style.lineHeight = '14px';
    div.style.textAlign = 'left';
    // const _text = document.createTextNode('');
    // div.appendChild(_text);
    dom.parentNode.appendChild(div);
    dom.addEventListener('mouseover', (e) => {
      div.style.display = 'block';
    });
    dom.addEventListener('mousemove', (e) => {
      div.style.left = e.layerX < (BLANK_WIDTH + 10) && e.layerY < BLANK_WIDTH ? `${axisX - BLANK_WIDTH}px` : 0;
      const baseInfo =
        `axis: [${e.layerX * 2 - axisX}, ${-e.layerY * 2 + axisY}]
        canvas: [${e.layerX * 2}, ${e.layerY * 2}]
        layer: [${e.layerX}, ${e.layerY}]`;

      const info = `offset: [${e.offsetX}, ${e.offsetY}]
        client:[${e.clientX}, ${e.clientY}]
        page: [${e.pageX}, ${e.pageY}]
        xy: [${e.x}, ${e.y}]
        screen: [${e.screenX}, ${e.screenY}]
        movement: [${e.movementX}, ${e.movementY}]`;
      div.innerText = baseInfo + (needAllInfo ? info : '');
    });
    dom.addEventListener('mouseout', (e) => {
      div.style.display = 'none';
    });
  }
  w.axisTips = addTips;
}(window));