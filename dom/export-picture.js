;(function(w) {

  function down (canvas) {
    const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    window.location.href = image; // it will save locally
  }

  function init(canvas) {
    const dom = document.getElementById('export-picture');
    dom.addEventListener('click', () => {
      down(canvas);
    });
    // dom.addEventListener('touchstart', () => {
    //   down(canvas);
    // });
  }

  w.initExport = init;
}(window));