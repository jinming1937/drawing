;(function(w) {

  // 获取斜率
  function activePath(start, end) {
    const [startX, starY] = start;
    const [endX, endY] = end;
    if (endY === startY && endX === startX) return [0, 0, 0];
    if (endX === startX) return [0, 0, endY - startY];
    if (endY === startY) return [0, endX - startX, 0];
    return [(endY - startY) / (endX - startX), 0, 0];
  }

  w.activePath = activePath;
}(window));