import {drawData} from './mouse-draw';

function exportRaw(w: Window, name: string, data: string) {
  const urlObject = URL;
  const export_blob = new Blob([data]);
  const save_link = document.createElement<'a'>('a');
  save_link.href = urlObject.createObjectURL(export_blob);
  save_link.download = name;
  save_link.click();
}

export function initExportData(w: Window) {
  const dom = document.getElementById('export-data');
  if (dom) {
    dom.addEventListener('click', () => {
      exportRaw(w, `draw_data_${+new Date()}.json`, JSON.stringify(drawData));
    });
  }
}
