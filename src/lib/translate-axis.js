;(function(w) {
  function translateAxis(x, y, canvas) {
    const trueX = x;
    const trueY = canvas.height - y;
    return [trueX, trueY];
  }
  
  w.translateAxis = translateAxis;
} (window));
