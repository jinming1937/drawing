;(function(w) {

  function exportRaw(name, data) {
    var urlObject = w.URL || w.webkitURL || w;
    var export_blob = new Blob([data]);
    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = name;
    save_link.click();
  }

  function init() {
    const dom = document.getElementById('export-data');
    dom.addEventListener('click', () => {
      exportRaw(`draw_data_${+new Date()}.json`, JSON.stringify(w.drawData));
    });
  }

  w.initExportData = init;
}(window));