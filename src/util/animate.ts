/**
 * requestAnimationFrame call
 *
 * @export
 * @param {Function} fn function
 */
export function animate(fn: Function) {
  fn();
  requestAnimationFrame(() => animate(fn));
}
