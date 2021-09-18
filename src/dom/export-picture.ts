function down(canvas: HTMLCanvasElement) {
  const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
  window.location.href = image // it will save locally
}

export function initExportPicture(canvas: HTMLCanvasElement) {
  const dom = document.getElementById('export-picture')
  if (dom) {
    dom.addEventListener('click', () => {
      down(canvas)
    })
  }
}
