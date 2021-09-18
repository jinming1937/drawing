/**
 * get canvas context by canvas element id
 * @param {String} canvasElementId canvas element id
 * @param {Number} width canvas width
 * @param {Number} height canvas height
 * @returns canvas context
 */
export function initCanvas(canvasElementId: string, width: number = 680, height: number = 480): [CanvasRenderingContext2D | null, HTMLCanvasElement] {
  const dpr = window.devicePixelRatio
  let canvasElement = window.document.getElementById(canvasElementId) as HTMLCanvasElement
  if (!canvasElement) {
    canvasElement = document.createElement('canvas')
  }
  {
    // 设定尺寸，dpr做超级抗锯齿
    canvasElement.style.width = `${width}px`
    canvasElement.style.height = `${height}px`
    canvasElement.setAttribute('height', `${height * dpr}`)
    canvasElement.setAttribute('width', `${width * dpr}`)
  }
  const context = canvasElement.getContext('2d')
  if (context) {
    return [context, canvasElement]
  } else {
    alert('error: can not create context!!!')
    return [null, canvasElement]
  }
}
