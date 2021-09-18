function Matrix({data, row, column}) {
  if (!Array.isArray(data)) {
    throw('data not a array');
  }
  if (!this) {
    return new Matrix({data});
  }
  this.data = data;
  this.row = row;
  this.column = column;
}

Matrix.prototype.getInfo = function() {
  return {
    data: this.data,
    row: this.row,
    column: this.column
  }
}

function SquareMatrix3() {
  
}