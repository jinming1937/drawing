/**
 * right bar
 * show data
 */

import {IDrawData} from "types/common";
import {coreData, CoreData, IDataChangeEvent} from "../lib";

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
      div.className = div.className.replace('show', '').replace(/\s/g, '');
    } else {
      div.className += ' show';
    }
  });

  ul.addEventListener('click', (e: MouseEvent) => {
    ul.querySelectorAll('li')?.forEach((i) => {
      i.className = '';
    });
    let flag = false;
    let deleteIndex = -1;
    let liNode: any = null;
    (e as any).path.forEach((i: any) => {
      if (i.localName === 'li' && !flag) {
        flag = true;
        i.className = 'active';
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

  window.addEventListener('dataChange', (e) => {
    console.log(e);
    updateList(e as CustomEvent<IDataChangeEvent<IDrawData>>);
  });

  div.appendChild(divBtn);
  div.appendChild(ul);
  document.body.append(div);
}


function updateList(val: CustomEvent<IDataChangeEvent<IDrawData>>) {
  const ul = document.querySelector<HTMLUListElement>('#right-bar-list');
  if(ul) {
    ul.innerHTML = "";
    coreData.value.forEach((draw, index) => {
      const {type, lineWidth, color, shape} = draw;
      const li = document.createElement('li');
      const txtDom = `
        <div class="left">
          <div>${type}</div>
          <div style="width: 20px;height: 20px;background-color: ${color}"></div>
        </div>
        <div class="right">
          <input ${draw.type === 'txt' ? '': 'disabled' } type="text" value="${draw.type === 'txt' ? draw.text : '-'}" />
          <input type="text" value="${shape}" />
        </div>
        <div class="delete" name="delete">x</div>
      `;
      li.innerHTML = txtDom;
      li.setAttribute('data-index', `${index}`);
      ul.appendChild(li);
    });
  }
}
