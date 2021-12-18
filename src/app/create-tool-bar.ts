import {IDrawData} from "types/common";
import {backOperator, forwardOperator, copyData, deleteData, KeyEventName, parseData} from '../util';
import {CoreData, EventCenter} from "../lib";
import {OffScreenCanvas} from "../canvas";
import {axisTips, initRightBar, initMouseDraw, initKey, initHelp} from "../dom";
import {initClear, initExportPicture, initExportData, initImportJSON, initRemote, initInputType} from '../tool-bar';

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
  initRemote((url: string) => {
    if(url) {
      // const url = `http://file.auoqu.com/v1/${name}`;
      window.fetch(url).then((res) => {
        return res.json();
      }).then(function(json) {
        if (Array.isArray(json) && json.length > 0) {
          coreData.push(...json);
        }
      });
    }
  });

  /** 保存【删除】，以便回退 */
  const cacheData: IDrawData[] = [];
  const cacheCopyData: IDrawData[] = [];
  // 注册清除事件回调
  initClear(() => {
    coreData.clear();
    cacheData.length = 0;
  });
  // 注册canvas各种事件
  initMouseDraw(canvas, osCvs, coreData); // 绑定事件
  initInputType();
  {
    // 注册键盘事件，绘画操作的前进、后退
    initKey(window, (action: KeyEventName, key: '1'|'2'|'ArrowRight'|'ArrowLeft') => {
      switch(action) {
        case KeyEventName.back:
          const state = backOperator(cacheData, coreData);
          // if(state) return;
          // backOnceCoreData(coreData, cacheData);
          break;
        case KeyEventName.forward:
          forwardOperator(cacheData, coreData);
          break;
        case KeyEventName.selectAll:
          coreData.getValue().forEach((item) => {
            item.isActive = true;
          });
          break;
        case KeyEventName.delete:
          deleteData(coreData, cacheData)
          break;
        case KeyEventName.copy:
          cacheCopyData.length = 0;
          const data = copyData(coreData, cacheCopyData);
          console.log(data.length);
          break;
        case KeyEventName.parse:
          parseData(coreData, cacheCopyData);
          console.log(coreData.length);
          break;
        case KeyEventName.save:
          EventCenter.keyEvent.detail.value = KeyEventName.save;
          EventCenter.keyEvent.detail.target = KeyEventName.save;
          window.dispatchEvent(EventCenter.keyEvent);
          break;
        case KeyEventName.changeType:
          EventCenter.changeInputType.detail.value = key;
          EventCenter.changeInputType.detail.target = KeyEventName.changeType;
          window.dispatchEvent(EventCenter.changeInputType);
          break;
      }
    });
  }
  // 注册右边栏
  // initRightBar(coreData);
  setTimeout(() => {
    initHelp();
  }, 0)
  return cacheData
}
