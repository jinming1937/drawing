/**
 * 键盘事件
*/
export const OPERATION = 'operation';
export const keyEvent = new CustomEvent('operation', {
  bubbles: false,
  cancelable: true,
  detail: {
    value: '',
    target: ''
  }
});

export const changeinput = '';
export const changeInputType = new CustomEvent('change')

export const EventCenter = {
  keyEvent,
}
