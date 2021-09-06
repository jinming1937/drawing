;(function(){
  /**
   * set background
   * @param {Object} ctx canvas context
   * @param {String} color color string
   */
  function setBackground(ctx, color) {
    ctx.save();
    // ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // ctx.closePath();
    ctx.restore();
  }
  window.setBackground = setBackground;
}());