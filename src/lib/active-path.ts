  // 获取斜率
export function activePath(start: [number, number], end: [number, number]): [number, number, number] {
  const [startX, startY] = start;
  const [endX, endY] = end;
  if (endY === startY && endX === startX) return [0, 0, 0];
  if (endX === startX) return [0, 0, endY - startY];
  if (endY === startY) return [0, endX - startX, 0];
  return [(endY - startY) / (endX - startX), 0, 0];
}
