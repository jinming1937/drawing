import {IDrawData} from "types/common";

type IDataChangeEvent<T> = {
  target: string;
  value: T | null;
  index: number;
}

export class CoreData<T> {
  value: T[];
  dataChange: CustomEvent;
  constructor() {
    this.value = [];
    this.dataChange = new CustomEvent<IDataChangeEvent<T>>('dataChange', {
      bubbles: false,
      cancelable: true,
      detail: {
        target: '',
        value: null,
        index: 0
      }
    });
  }

  public get length(): number {
    return this.value.length;
  }

  // public set length(val: number): void {
  //   this.value.length = val;
  // }

  public getItem(index: number): T {
    return this.value[index];
  }

  public setItem(index: number, item: T) {
    this.value[index] = item;
  }

  public clear() {
    this.value.length = 0;
  }

  public push(...item: T[]): number {
    this.dataChange.detail.target = 'push';
    this.dataChange.detail.value = item;
    this.dataChange.detail.index = this.value.length;
    window.dispatchEvent(this.dataChange);
    if(Array.isArray(item)) {
      this.value.push(...item);
    } else {
      this.value.push(item);
    }
    return this.value.length;
  }

  public pop(): T {
    this.dataChange.detail.target = 'push';
    this.dataChange.detail.value = this.value[this.value.length - 1];
    this.dataChange.detail.index = this.value.length - 1;
    window.dispatchEvent(this.dataChange);
    return this.value[this.value.length - 1];
  }

  public forEach() {

  }

  public splice(index: number, count: number, item?: T) {
    this.value.splice(index, count);
  }
}

export const coreData = new CoreData<IDrawData>();
