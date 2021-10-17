import {IShapeType} from "types/common";

/**
 * 返回当前绘画类型
 * @returns 'line' | 'rect' | 'pen' | 'txt' | 'arrow' | 'hand'
 */
 export function getType(): IShapeType {
  const dom = document.querySelectorAll('input[name="shape"]');
  let type: IShapeType = 'line';
  dom.forEach((item) => {
    const domInput = item as HTMLInputElement;
    if(domInput.checked) {
      type = domInput.value as IShapeType;
    }
  });
  return type;
}
