
/**
 * 矩阵叉乘
 * @param {Array} arrLeft left Matrix
 * @param {Array} arrRight right Matrix
 * @returns
 */
export function cal(arrLeft: number[][] | string[][], arrRight: number[][] | string[][], isStr: boolean): [number[], string[][]] {
  // left column = right row , 计算依据
  const calculatorBaseNum = 3; // 计算依据
  const leftColumn = arrLeft[0].length; // 动态获取
  const rightRow = arrRight.length; // 动态获取
  const onlyStr = isStr;
  if (leftColumn !== rightRow) return [[], []];
  const newMatrix = [];
  const newMatrixStr = [];
  for(var i = 0; i < arrLeft.length; i++) {
    const rowResult = [];
    const rows = arrLeft[i];
    for(var j = 0; j < arrRight[0].length; j++) {
      const [column1, column2, column3] = arrRight;
      const columns = [column1[j], column2[j], column3[j]];
      let newElement = 0;
      let newElementStr = '';
      rows.forEach((item, index) => {
        const c = columns[index];
        if (!onlyStr && typeof item === 'number' && typeof c === 'number') {
          newElement += item * c;
        }
        newElementStr += `${item} * ${c} + `
      });
      newMatrix.push(newElement);
      rowResult.push(newElementStr.replace(/\+\s$/, ''));
    }
    newMatrixStr.push(rowResult);
  }
  return [newMatrix, newMatrixStr];
}
