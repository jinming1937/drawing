import { IDrawData } from "types/common";

export type IDataChangeEvent<T> = {
  target: string;
  value: T | null;
}

export class CoreData<T> {
  value: T[];
  dataChange: CustomEvent;
  useWatcher: boolean;
  constructor() {
    this.value = [];
    this.useWatcher = true;
    this.dataChange = new CustomEvent<IDataChangeEvent<T>>('dataChange', {
      bubbles: false,
      cancelable: true,
      detail: {
        target: '',
        value: null,
      }
    });
  }

  private watcher(obj: any): T {
    if (!this.useWatcher) return obj;
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'object') {
        this.define(obj, key); // 监控
        this.watcher(obj[key]); // 遍历watcher
      } else if (['number', 'boolean', 'string'].indexOf(typeof obj[key]) >= 0) {
        this.define(obj, key); // 仅监控
      }
    });
    return obj;
  }

  private define(obj: T, key: string) {
    let value = obj[key];
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      get: () => value,
      set: (val: unknown) => {
        if(typeof val === 'object') {
          value = this.watcher(val)
        } else {
          value = val
        }
        this.dispatchDataChangeEvent('change-array', val);
      },
    });
  }

  private setEventDetail(target: string, value: any) {
    this.dataChange.detail.target = target;
    this.dataChange.detail.value = value;
  }

  private dispatchDataChangeEvent(target: string, value: any) {
    this.setEventDetail(target, value);
    window.dispatchEvent(this.dataChange);
  }

  public dispatchInputDataChangeEvent() {
    this.setEventDetail('input-change', this.value);
    window.dispatchEvent(this.dataChange);
  }

  public get length(): number {
    return this.value.length;
  }

  // public set length(val: number): void {
  //   this.value.length = val;
  // }

  public getValue(): T[] {
    return this.value;
  }

  public getItem(index: number): T {
    return this.value[index];
  }

  // public getItemById(id: number): T {
  //   return this.value.filter(i => i.)[0];
  // }

  /**
   * 更新数据，且不需要更新UI
   * @param index 索引
   * @param item 当前写入对象
   */
  public setItem(index: number, item: T) {
    this.value[index] = this.watcher(item);
    this.dispatchDataChangeEvent('set', null);
  }

  public clear() {
    this.value.length = 0;
    this.dispatchDataChangeEvent('clear', this.value);
  }

  public push(...item: T[]): number {
    if(Array.isArray(item)) {
      this.value.push(...item.map((i) => this.watcher(i)));
    } else {
      this.value.push(this.watcher(item));
    }
    this.dispatchDataChangeEvent('push', this.value);
    return this.value.length;
  }

  public pop(): T | undefined {
    const value = this.value.pop();
    this.dispatchDataChangeEvent('pop', this.value);
    return value;
  }

  public splice(index: number, count: number, item?: T) {
    const value = this.value.splice(index, count);
    this.dispatchDataChangeEvent('splice', this.value);
    return value;
  }
}

export const coreData = new CoreData<IDrawData>();
