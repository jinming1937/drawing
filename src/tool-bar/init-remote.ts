export function initRemote(fun: (name: string) => void) {
  const dom = document.querySelector<HTMLInputElement>('#remote');
  dom?.addEventListener('change', (e) => {
    fun(dom.value);
  });
  const url = `http://www.auoqu.com/math/modules_211013132446.json?t=${Date.now()}`;
  window.fetch(url).then((res) => {
    return res.json();
  }).then(function(json) {
    if (Array.isArray(json) && json.length > 0) {
      json.forEach((item) => {
        const option = document.createElement('option');
        option.innerText = item.label;
        option.value = item.url;
        dom?.appendChild(option);
      })
    }
  });
}
