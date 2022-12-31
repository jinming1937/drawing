/**
 * 导出数据JSON
*/

import {IDrawData} from 'types/common';
import {CoreData} from '../lib';
import {downFile, washData} from '../util';

export function initExportData(coreData: CoreData<IDrawData>) {
  let dom = document.getElementById('export-data');
  dom?.addEventListener('click', () => {
    const simpleData = washData(coreData.getValue());
    if (simpleData.length === 0) return;
    downFile(`draw_data_${+new Date()}.json`, JSON.stringify(simpleData));
  });
  dom = null;
}
