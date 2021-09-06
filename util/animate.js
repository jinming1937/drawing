;(function(w) {

  function animate(fn) {
    fn();
    requestAnimationFrame(() => animate(fn));
  }

  w.animateFrame = animate;
}(window));