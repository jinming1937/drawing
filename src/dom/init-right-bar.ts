/**
 * right bar
 * show data
 */

import {IDrawData, Txt} from "types/common";
import {CoreData, IDataChangeEvent} from "../lib";

export function initRightBar(coreData: CoreData<IDrawData>) {
  const div = document.createElement('div');
  const divBtn = document.createElement('div');
  const ul = document.createElement('ul');
  div.id = 'right-bar';
  div.className = 'right-bar';
  divBtn.className = 'right-bar-btn';
  ul.id = 'right-bar-list'

  divBtn.addEventListener('click', (e: MouseEvent) => {
    if (div.className.match('show')) {
      div.className = div.className.replace('show', '').trim();
    } else {
      div.className += ' show';
    }
  });

  ul.addEventListener('click', (e: MouseEvent) => {
    // ul.querySelectorAll('li')?.forEach((i, index: number) => {
    //   i.className = '';
    //   coreData.getItem(index).isActive = false;
    // });
    let flag = false;
    let deleteIndex = -1;
    let liNode: any = null;
    (e as any).path.forEach((i: any) => {
      if (i.localName === 'li' && !flag) {
        flag = true;
        i.className = 'active';
        const index = parseInt(i.getAttribute('data-index'), 10);
        coreData.getItem(index).isActive = true;
      }
      if (i.localName === 'div' && i.getAttribute('name') === 'delete' && liNode === null) {
        liNode = i.parentNode;
        deleteIndex = parseInt(liNode.getAttribute('data-index'), 10);
      }
    });

    if (deleteIndex >= 0 && liNode) {
      ul.removeChild(liNode);
      coreData.splice(deleteIndex, 1);
    }
  });

  ul.addEventListener('input', (e: any) => {
    console.log(e);
    const val = e.target.value;
    const type = e.target.getAttribute('data-type');
    const index = searchIndex(e.path);
    const item = coreData.getItem(index);
    switch(type) {
      case 'color':
        coreData.setItem(index, {
          ...item,
          color: val,
        });
        break;
      case 'shape':
        const [startX = '0', startY = '0', endX = '0', endY = '0'] = val.split(',');
        const shape = [...item.shape];
        const strShape = [];
        switch(item.type) {
          case 'txt':
            strShape.push(startX, startY);
            break;
          case 'line':
          case 'rect':
          case 'arrow':
            strShape.push(startX, startY, endX, endY);
            break;
        }
        if(strShape.every(item => /^[-]?\d+$/.test(item))) {
          shape.length = 0;
          shape.push(...strShape.map((item) => parseInt(item)));
        }
        coreData.setItem(index, {
          ...item,
          shape,
        });
        break;
      case 'text':
        coreData.setItem(index, {
          ...item,
          text: val
        } as Txt);
        break;
    }
  });

  // let cacheData: IDrawData[] = [];
  window.addEventListener('dataChange', (e) => {
    if ((e as CustomEvent<IDataChangeEvent<IDrawData>>).detail.target !== 'set') {
    // if (diff(cacheData, coreData.getValue())) {
      // cacheData = cacheData.concat(coreData.getValue());
      render(coreData.getValue());
    }
  });

  div.appendChild(divBtn);
  div.appendChild(ul);
  document.body.append(div);
}


function render(data: IDrawData[]) {
  const ul = document.querySelector<HTMLUListElement>('#right-bar-list');
  if(ul) {
    ul.innerHTML = "";
    data.forEach((draw, index) => {
      const {type, lineWidth, color, shape} = draw;
      const li = document.createElement('li');
      const txtDom = `
        <div class="input-box">
          <span class="type">${type}(${index})</span>
          <input class="color-box" type="color" data-type="color" value="${color}" />
          <div class="input-cube">
            <span>text:</span>
            <input maxlength="30" ${draw.type === 'txt' ? '': 'disabled'} type="text" data-type="text" value="${draw.type === 'txt' ? draw.text : '-'}" />
          </div>
          <div class="input-cube">
            <span>position:</span>
            <input maxlength="50" ${draw.type === 'pen' ? 'disabled' : ''} type="text" value="${shape}" data-type="shape" />
          </div>
        </div>
        <div class="delete" name="delete">×</div>
      `;
      li.innerHTML = txtDom;
      li.setAttribute('data-index', `${index}`);
      ul.appendChild(li);
    });
  }
}

// function diff(cache: IDrawData[], value: IDrawData[]) {
//   console.log(cache, value);
//   if (cache.length !== value.length) return true;
//   let flag = false;
//   value.forEach((item, index) => {
//     if (cache[index].type !== item.type && !flag) {
//       flag = true;
//     }
//   });
//   return flag;
// }

function searchIndex(nodeList: HTMLElement[]) {
  let dataIndex = -1;
  nodeList.forEach((item) => {
    if(item.nodeName === 'LI' && dataIndex === -1) {
      dataIndex = parseInt(item.getAttribute('data-index') || '0', 10);
    }
  });
  return dataIndex;
}
