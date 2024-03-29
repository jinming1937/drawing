
/**
 * 1 2 3   12 23 34
 * 3 4 5 * 45 56 67
 * 6 7 8   78 89 90
 * 1*12+2*45+3*78
 * 0,1,2
*/
function getColumn(columnIndex: number, rightColumn: number, arr: number[]) {
  const columns: number[] = [], len = arr.length;
  for(let i = columnIndex; i < len; i += rightColumn) { // 3、4
    columns.push(arr[i]);
  }
  return columns;
}

function getRow(rowIndex: number, leftRow: number, arr: number[]) {
  const rows: number[] = [];
  arr.forEach((item, index) => {
    const i = index / leftRow;
    if(Math.floor(i) === rowIndex) rows.push(item)
  });
  return rows;
}
/**
 * 矩阵叉乘
 * @param {Array} arrLeft left Matrix
 * @param {Array} arrRight right Matrix
 * @returns
 */
export function calculate3D(arrLeft: number[], arrRight: number[], isStr?: boolean) {
  // left column === right row , 计算依据
  const calculatorBaseNum = 3; // 计算依据
  const leftRow = 3; // 动态获取
  const rightColumn = 3; // 动态获取
  if (arrLeft.length !== arrRight.length) return [];
  const newMatrix = [];
  const newMatrixStr = [];
  for(var i = 0; i < leftRow; i++) { // 0, 1, 2
    const rows = getRow(i, leftRow, arrLeft);
    for(var j = 0; j < rightColumn; j++) {
      const columns = getColumn(j, rightColumn, arrRight);
      let newElement = 0;
      let newElementStr = '';
      rows.forEach((item, index) => {
        if (!isStr) { newElement += item * columns[index]; }
        newElementStr += `${item} * ${columns[index]} + `
      });
      newMatrix.push(newElement);
      newMatrixStr.push(newElementStr.replace(/\+\s$/, ''));
    }
  }

  return [newMatrix, newMatrixStr];
}
