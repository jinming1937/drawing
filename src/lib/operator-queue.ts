/**
 * 为了解决键盘操作,需要一个操作队列
 * 每一个操作，都会dispatch core data的变化
 * push(添加) pop(删除)，splice(删除or移动排序),clear（清空）
 * 键盘事件：同时也会去dispatch操作, 而引发队列变化，进而 core data 变化
 * ctrl a 全选
 * ctrl c 复制
 * ctrl v 粘贴
 * ctrl z 撤销上一步操作
 * ctrl y 前进
*/
export interface IOperator<T> {
  eventName: string;
  data: T;
}

export class OperatorQueue<T> {
  value: IOperator<T>[];
  constructor() {
    this.value = [] as IOperator<T>[];
  }

  getItem() {

  }

  setItem() {

  }
}
