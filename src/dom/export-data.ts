import { IDrawData } from '.';
import {drawData} from './mouse-draw';

function exportRaw(w: Window, name: string, data: string) {
  const urlObject = URL;
  const export_blob = new Blob([data]);
  const save_link = document.createElement<'a'>('a');
  save_link.href = urlObject.createObjectURL(export_blob);
  save_link.download = name;
  save_link.click();
}

function filterData(data: IDrawData[]) {
  return data.filter((item) => {
    switch(item.type) {
      case 'txt':
        return !!item.text;
      case 'line':
      case 'rect':
      case 'arrow':
        const [x1, y1, x2, y2] = item.shape;
        return item.shape.length === 4 && x1 !== x2 && y1 !== y2;
      case 'pen':
        return item.lines.filter(i => i.length === 2).length > 0;
    }
  })
}

export function initExportData(w: Window) {
  const dom = document.getElementById('export-data');
  if (dom) {
    dom.addEventListener('click', () => {
      const simpleData = filterData(drawData);
      exportRaw(w, `draw_data_${+new Date()}.json`, JSON.stringify(simpleData));
    });
  }
}
