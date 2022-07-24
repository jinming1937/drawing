/**
 * 气泡
*/

export function bubble(content: string, position: {x: number, y: number, width: number, height: number}, refName: string = '') {
  const wrapName = `bubble-${refName}`;
  if (document.getElementById(wrapName)) {
    return;
  }
  const {innerWidth, innerHeight} = window;
  const {x, y, width} = position;
  const defaultWidth = 220;
  const gap = 30;
  const triangleHeight = 11;
  const [clientWidth, clientHeight] = calculator(content, defaultWidth);
  let offsetX = - (clientWidth / 2 - width / 2);
  let offsetY = - (clientHeight + triangleHeight);
  if (x + clientWidth / 2 + gap > innerWidth) { // 超出屏幕，进行自适应
    offsetX = innerWidth - (clientWidth  + x);
  } else if (x <= 8) {
    offsetX = 0;
  }

  const div = document.createElement('div');
  div.className = 'bubble';
  div.id = wrapName;
  div.style.display = 'none';
  div.style.position = 'absolute';
  div.style.left = `${position.x}px`;
  div.style.top = `${position.y}px`;
  const contentDom = document.createElement('div');
  contentDom.className = 'bubble-content';
  contentDom.textContent = content;
  contentDom.style.left = `${offsetX}px`;
  contentDom.style.top = `${offsetY}px`;
  const boxDom = document.createElement('div');
  boxDom.className = 'bubble-box';
  boxDom.appendChild(contentDom);
  div.appendChild(boxDom);
  document.body.appendChild(div);
  return div;
}

function calculator(text: string, defaultWidth: number) {
  const contentDom = document.createElement('div');
  contentDom.style.width = `${defaultWidth}px`;
  contentDom.style.padding = '4px';
  contentDom.style.fontSize = '12px';
  contentDom.style.borderRadius = '4px';
  contentDom.textContent = text;
  document.body.appendChild(contentDom);
  const domSize = [contentDom.clientWidth, contentDom.clientHeight];
  document.body.removeChild(contentDom);
  return domSize;
}
