
export function initClear(fun: () => void) {
  const dom = document.querySelector<HTMLInputElement>('#clear-page');

  dom?.addEventListener('click', () => {
    fun();
  })
}
