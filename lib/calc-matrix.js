;(function(w) {

  function createMatrix(start, arr, ctx) {
    const data = [];
    let maxStrLength = 1;

    ctx.save();
    ctx.font = `italic 32px serif`;
    arr.forEach((item) => {
      const text = ctx.measureText(item); // TextMetrics object
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

  function getIndex(start, maxStrLength, row, column) {
    const varying = 16;
    const [xBase, yBase] = start;
    return [xBase + (maxStrLength + varying * 2) * column, yBase + varying * 2 * row]
  }
  
  w.drawMatrix = createMatrix;

}(window));