/**
 * 气泡
*/

export function bubble(content: string, position: {x: number, y: number}, refName: string = '') {
  const wrapName = `bubble-${refName}`;
  if (document.getElementById(wrapName)) {
    return;
  }
  const {innerWidth, innerHeight} = window;
  const {x, y} = position;
  const defaultWidth = 220;
  const gap = 30;
  let offsetX = -100;
  let offsetY = -85;
  if (x + defaultWidth + gap > innerWidth) {
    offsetX = innerWidth - (defaultWidth + x + gap);
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
