/**
 * 截流
 */
let time = +new Date();
export function bounce(dateTime: number, fn: Function) {
  if(dateTime - time < 30) {
    return;
  }
  time = dateTime;
  fn();
}
