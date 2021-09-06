;(function(w) {

  function createMatrix(canvas, start, arr) {
    const domWidth = canvas.width;
    const domHeight = canvas.height;
    const centerX = domWidth / 2;
    const centerY = domHeight / 2;
    const textSize = 32;
    const data = [];

    let maxStrLength = 1;
    arr.forEach((item) => {
      maxStrLength = maxStrLength > String(item).length ? maxStrLength : String(item).length;
    });
    
    arr.forEach((item, index) => {
      const rowIndex = Math.floor(index / 3);
      const columnIndex = index % 3;
      const [x, y] = getIndex(item, rowIndex, columnIndex);
      data.push({text: item, x, y});
    });

    function getIndex(item, row, column) {
      const [xBase, yBase] = start;
      const varying = 16;
      return [xBase + (maxStrLength + 2) * varying * column, yBase + varying * 2 * row]
    }

    return [data, maxStrLength];
  }

  w.drawMatrix = createMatrix;

}(window));