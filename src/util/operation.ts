import {CoreData} from 'src/lib';
import {IDrawData} from 'types/common';

function copy<T>(obj1: T): T {
  const obj: T = {} as T;
  function digui<T>(origin: T, copier: T) {
      Object.keys(origin).forEach((key) => {
          if((obj1 as Object).hasOwnProperty(key)) {
              // all.push(key);
              if (typeof origin[key] === 'object') {
                  // if(origin[key]) {}
                  if (Array.isArray(origin[key])) {
                    copier[key] = [].concat(origin[key]);
                  } else {
                    digui(origin[key], copier[key]);
                  }
              } else {
                  copier[key] = origin[key];
              }
          }
      })

  }
  digui(obj1, obj);
  return obj;
}

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
  cacheCopyData.length = 0; // 先清空再填入数据
  coreData.getValue().forEach((item) => {
    if (item.isActive) {
      cacheCopyData.push(copy(item));
    }
  });
  return cacheCopyData;
}

export function parseData(coreData: CoreData<IDrawData>, cacheCopyData: IDrawData[]) {
  const cache = [];
  cacheCopyData.forEach((item) => {
    switch(item.type) {
      case 'pen':
        item.lines.forEach((i, index) => {
          item.lines[index][0] += 10;
          item.lines[index][1] += 10;
        })
        break;
      case 'line':
      case 'rect':
      case 'arrow':
      case 'txt':
        item.shape.forEach((i, index) => {
          item.shape[index] += 10;
        });
        // cache.push(item);
        break;
    }
    coreData.push(item);
  });
  cacheCopyData.length = 0;
}
