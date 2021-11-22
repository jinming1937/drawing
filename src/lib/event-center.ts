/**
 * 键盘事件
*/
export const OPERATION = 'operation';
export const keyEvent = new CustomEvent(OPERATION, {
  bubbles: false,
  cancelable: false,
  detail: {
    value: '',
    target: ''
  }
});

export type IChangeInputDetail = {
  value: '1' | '2' | 'ArrowRight' | 'ArrowLeft';
  target: string;
}
const detail: IChangeInputDetail = {
  value: '1',
  target: ''
}
export const CHANGE_INPUT = 'change-input';
export const changeInputType = new CustomEvent(CHANGE_INPUT, {
  bubbles: false,
  cancelable: false,
  detail: detail,
});

export const EventCenter = {
  keyEvent,
  changeInputType,
}
