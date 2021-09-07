;(function(w) {
  function init(canvas) {
    const dom = document.getElementById('export-picture');
    dom.addEventListener('click', () => {
      const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      window.location.href = image; // it will save locally

      // var image = canvas.toDataURL("image/png");
      // var w = window.open('about:blank','image from canvas');
      // w.document.write("<img src='"+image+"' alt='from canvas'/>");
    });
  }

  w.initExport = init;
}(window));