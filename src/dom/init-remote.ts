export function initRemote(fun: (name: string) => void) {
  const dom = document.querySelector<HTMLInputElement>('#remote');

  dom?.addEventListener('change', (e) => {
    fun(dom.value);
  })
}
