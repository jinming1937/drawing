;(function(w) {
  function translateAxis(x, y, ctx) {
    const trueX = x;
    const trueY = ctx.canvas.height - y;
    return [trueX, trueY];
  }
  
  w.tAxis = translateAxis;
} (window));
