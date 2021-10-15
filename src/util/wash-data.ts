import {IDrawData} from "types/common";

/**
 * 去除无意义绘画数据
 * @param data 绘画数据
 * @returns 清洗后的绘画数据
 */
export function washData(data: IDrawData[]): IDrawData[] {
  return data.filter((item) => {
    switch(item.type) {
      case 'txt':
        return !!item.text; // text 不为空
      case 'line':
      case 'rect':
      case 'arrow':
        const [x1, y1, x2, y2] = item.shape;
        return item.shape.length === 4 && !(x1 === x2 && y1 === y2); // 线段数据合规 && 首尾不重合
      case 'pen':
        return item.lines.filter(i => i.length === 2).length > 0;
    }
  })
}
