/**
 * 气泡
*/

const nameList: string[] = [];
function getUniqueName(n: number = 0) {
  if (nameList.indexOf(`bubble-${n}`) !== -1) {
    return n;
  }
  return nameList.push(`bubble-${nameList.length}`);
}

export function bubble(content: string, position: {x: number, y: number}, trigger: 'click' | 'hover' = 'hover') {
  // const name = getUniqueName();
  if (document.getElementById('name')) {
    return;
  }
  const div = document.createElement('div');
  div.className = 'bubble-box';
  div.id = `name`;
  // div.textContent = content;
  // div.title
  div.style.position = 'absolute';
  div.style.left = `${position.x}px`;
  div.style.top = `${position.y}px`;
  const contentDom = document.createElement('div');
  contentDom.className = 'bubble-content';
  contentDom.textContent = content;
  contentDom.style.left = '-88px';
  contentDom.style.top = '-88px';
  const boxDom = document.createElement('div');
  boxDom.className = 'bubble-box';
  boxDom.appendChild(contentDom);
  div.appendChild(boxDom);
  document.body.appendChild(div);
  return div;
}
