
function getIndex(start: [number, number], maxStrLength: number, row: number, column: number) {
  const varying = 16;
  const [xBase, yBase] = start;
  return [xBase + (maxStrLength + varying * 2) * column, yBase + varying * 2 * row]
}

export function calculateMatrix(start: [number, number], arr: string[] | number[], ctx: CanvasRenderingContext2D) {
  const data: {text: string | number; x: number; y: number}[] = [];
  let maxStrLength = 1;

  ctx.save();
  ctx.font = `italic 32px serif`;
  arr.forEach((item) => {
    const text = ctx.measureText(`${item}`); // TextMetrics object
    maxStrLength = maxStrLength > text.width ? maxStrLength : text.width;
  });
  ctx.restore();

  arr.forEach((item, index) => {
    const rowIndex = Math.floor(index / 3);
    const columnIndex = index % 3;
    const [x, y] = getIndex(start, maxStrLength, rowIndex, columnIndex);
    data.push({text: item, x, y});
  });
  return [data, maxStrLength];
}
