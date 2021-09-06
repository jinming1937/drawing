;(function(w) {
  function init(canvas) {
    const dom = document.getElementById('export-picture');
    dom.addEventListener('click', () => {
      canvas.toDataURL('image/png', 0);
    });
  }

  w.initExport = init;

}(window));