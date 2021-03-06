import { atom } from 'recoil';
import { T_Talk } from '../types';

class Counter {
  private _count: number = 0;

  get count() {
    this._count = this._count + 1;
    return String(this._count);
  }
}

const counter = new Counter();

export const State = {
  loading: atom({
    key: counter.count,
    default: false,
  }),
  uid: atom({
    key: counter.count,
    default: '',
  }),
  talk: atom({
    key: counter.count,
    default: [] as T_Talk[],
  }),
};
