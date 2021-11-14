import {CoreData} from 'src/lib';
import {IDrawData} from 'types/common';

/**
 * 后退
 *
 * @export
 * @param {CoreData<IDrawData>} data
 * @param {IDrawData[]} cacheData
 * @returns
 */
export function backOnceCoreData(data: CoreData<IDrawData>, cacheData: IDrawData[]) {
  if (data.length > 0) {
    const shape = data.pop();
    if (shape) cacheData.push(shape);
    return true;
  }
  return false;
}

/**
 * 前进
 *
 * @export
 * @param {IDrawData[]} cacheData
 * @param {CoreData<IDrawData>} data
 * @returns
 */
export function backOnceCacheData(cacheData: IDrawData[], data: CoreData<IDrawData>, ) {
  if (cacheData.length > 0) {
    const shape = cacheData.pop();
    if (shape) data.push(shape);
    return true;
  }
  return false;
}

/**
 * delete core data
 *
 * @export
 * @param {CoreData<IDrawData>} coreData
 * @param {IDrawData[]} cacheData
 */
export function deleteData(coreData: CoreData<IDrawData>, cacheData: IDrawData[]) {
  if (coreData.length > 0) {
    let index = coreData.length;
    while(index--) {
      const item = coreData.getItem(index);
      if(item.isActive) {
        cacheData.push(item);
        coreData.splice(index, 1);
      }
    }
  }
}

export function copyData(coreData: CoreData<IDrawData>, cacheCopyData: IDrawData[]) {
  coreData.getValue().forEach((item) => {
    if (item.isActive) {
      cacheCopyData.push(item);
    }
  });
  return cacheCopyData;
}

export function parseData(coreData: CoreData<IDrawData>, cacheCopyData: IDrawData[]) {
  cacheCopyData.forEach((item) => {
    switch(item.type) {
      case 'pen':
        item.lines.forEach((i) => {
          i[0] += 10;
          i[1] += 10;
        })
        break;
      case 'line':
      case 'rect':
      case 'arrow':
      case 'txt':
        item.shape.forEach((i) => i += 10);
        break;
    }
    coreData.push(item);
  })
}
