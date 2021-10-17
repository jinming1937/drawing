
export function initClear(fun: () => void) {
  let dom = document.querySelector<HTMLInputElement>('#clear-page');

  dom?.addEventListener('click', () => {
    fun();
  })
  dom = null;
}
