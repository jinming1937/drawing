import {IDrawData} from "types/common";
import {CoreData} from "../lib";
import {OffScreenCanvas} from "../canvas";
import {axisTips, initRightBar, initMouseDraw, initKey} from "../dom";
import {initClear, initExportPicture, initExportData, initImportJSON, initRemote} from '../tool-bar';

/**
 *
 */
export function createToolBar(canvas: HTMLCanvasElement, coreData: CoreData<IDrawData>, osCvs: OffScreenCanvas) {
  // 注册canvas坐标提示
  axisTips(canvas);
  // 注册绑定导出图片
  initExportPicture(canvas);
  // 注册导出数据
  initExportData(coreData);
  // 注册导入数据
  initImportJSON((val: IDrawData[]) => {
    coreData.push(...val);
  });
  // 注册拉取远程
  initRemote((fileName: string) => {
    if(fileName) {
      const name = window.encodeURIComponent(fileName);
      const url = `http://file.auoqu.com/v1/${name}`;
      window.fetch(url).then((res) => {
        return res.json();
      }).then(function(json) {
        if (Array.isArray(json) && json.length > 0) {
          coreData.push(...json);
        }
      });
    }
  });

  const cacheData: IDrawData[] = [];
  // 注册清除事件回调
  initClear(() => {
    coreData.clear();
    cacheData.length = 0;
  });
  // 注册canvas各种事件
  initMouseDraw(canvas, osCvs, coreData); // 绑定事件

  {
    // 注册键盘事件，绘画操作的前进、后退
    initKey(window, (action: 'back' | 'forward' | 'select_all') => {
      switch(action) {
        case 'back':
          // command + z, 执行
          if (coreData.length > 0) {
            const shape = coreData.pop();
            if (shape) cacheData.push(shape);
          }
          break;
        case 'forward':
          if (cacheData.length > 0) {
            const shape = cacheData.pop();
            if (shape) coreData.push(shape);
          }
          break;
        case 'select_all':
          coreData.getValue().forEach((item) => {
            item.isActive = true;
          });
          break;
      }
    });
  }
  // 注册右边栏
  // initRightBar(coreData);

  return cacheData
}
