import {OPERATION} from '../lib';

function exportPicture(canvas: HTMLCanvasElement) {
  const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    window.open(image);
}

/**
 * 导出图片
 * @param canvas Canvas
 */
export function initExportPicture(canvas: HTMLCanvasElement) {
  let dom = document.getElementById('export-picture')
  dom?.addEventListener('click', () => {
    exportPicture(canvas);
    // window.location.href = image // it will save locally
  })
  dom = null;

  window.addEventListener(OPERATION, () => {
    exportPicture(canvas);
  })
}
