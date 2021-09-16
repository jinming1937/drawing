;(function(w) {

  function createMatrix(start, arr, ctx) {
    let maxStrLength = 1;

    ctx.save();
    ctx.font = `italic 32px serif`;
    const lineArray = [];
    arr.forEach((item) => {
      item.forEach((i) => {
        const text = ctx.measureText(i); // TextMetrics object
        maxStrLength = maxStrLength > text.width ? maxStrLength : text.width;
        lineArray.push(i);
      });
    });
    ctx.restore();

    const matrix = [];
    arr.forEach((rowItems, rowIndex) => {
      rowItems.forEach((item, columnIndex) => {
        const [x, y] = getIndex(start, maxStrLength, rowIndex, columnIndex);
        matrix.push({text: `${item}`, x, y});
      });
    });

    return [matrix, maxStrLength];
  }

  function getIndex(start, maxStrLength, row, column) {
    const varying = 16;
    const [xBase, yBase] = start;
    return [xBase + (maxStrLength + varying * 2) * column, yBase + varying * 2 * row]
  }
  
  w.calMatrix = createMatrix;

}(window));