
function getIndex(start: [number, number], maxStrLength: number, row: number, column: number) {
  const varying = 16;
  const [xBase, yBase] = start;
  return [xBase + (maxStrLength + varying * 2) * column, yBase + varying * 2 * row]
}

export function createMatrix(start: [number, number], arr: string[][] | number[][], ctx: CanvasRenderingContext2D): [{text: string; x: number; y: number;}[], number] {
  let maxStrLength = 1;

  ctx.save();
  ctx.font = `italic 32px serif`;
  const lineArray = [];
  arr.forEach((item: string[] | number[]) => {
    item.forEach((i: string | number) => {
      const text = ctx.measureText(`${i}`); // TextMetrics object
      maxStrLength = maxStrLength > text.width ? maxStrLength : text.width;
      lineArray.push(i);
    });
  });
  ctx.restore();

  const matrix: {text: string; x: number; y: number;}[] = [];
  arr.forEach((rowItems: string[] | number[], rowIndex: number) => {
    rowItems.forEach((item: string | number, columnIndex: number) => {
      const [x, y] = getIndex(start, maxStrLength, rowIndex, columnIndex);
      matrix.push({text: `${item}`, x, y});
    });
  });

  return [matrix, maxStrLength];
}
