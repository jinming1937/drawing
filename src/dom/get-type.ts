import {IShapeType} from "types/common";

/**
 * 返回当前绘画类型
 * @returns 'line' | 'rect' | 'pen' | 'txt' | 'arrow' | 'hand'
 */
 export function getType(): IShapeType {
  const dom = document.querySelectorAll('input[name="shape"]');
  if((dom[0] as HTMLInputElement).checked) return 'line';
  if((dom[1] as HTMLInputElement).checked) return 'rect';
  if((dom[2] as HTMLInputElement).checked) return 'pen';
  if((dom[3] as HTMLInputElement).checked) return 'txt';
  if((dom[4] as HTMLInputElement).checked) return 'arrow';
  if((dom[5] as HTMLInputElement).checked) return 'hand';
  return 'line';
}
