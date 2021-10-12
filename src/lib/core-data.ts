import {IDrawData} from "types/common";

export type IDataChangeEvent<T> = {
  target: string;
  value: T | null;
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
      }
    });
  }

  public get length(): number {
    return this.value.length;
  }

  // public set length(val: number): void {
  //   this.value.length = val;
  // }

  private setEventDetail(target: string, value: T[] | T | null) {
    this.dataChange.detail.target = target;
    this.dataChange.detail.value = value;
  }

  public getItem(index: number): T {
    return this.value[index];
  }

  public setItem(index: number, item: T) {
    this.value[index] = item;
    this.setEventDetail('clear', null);
    window.dispatchEvent(this.dataChange);
  }

  public clear() {
    this.value.length = 0;
    this.setEventDetail('clear', this.value);
    window.dispatchEvent(this.dataChange);
  }

  public push(...item: T[]): number {
    if(Array.isArray(item)) {
      this.value.push(...item);
    } else {
      this.value.push(item);
    }
    this.setEventDetail('push', this.value);
    window.dispatchEvent(this.dataChange);
    return this.value.length;
  }

  public pop(): T | undefined {
    const value = this.value.pop();
    this.setEventDetail('pop', this.value);
    window.dispatchEvent(this.dataChange);
    return value;
  }

  public splice(index: number, count: number, item?: T) {
    const value = this.value.splice(index, count);
    this.setEventDetail('splice', this.value);
    window.dispatchEvent(this.dataChange);
    return value;
  }
}

export const coreData = new CoreData<IDrawData>();
