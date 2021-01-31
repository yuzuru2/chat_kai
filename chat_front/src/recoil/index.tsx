import { atom } from 'recoil';
import { T_Lounge, T_Talk, T_Room } from '../types';

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
  icon: atom({
    key: counter.count,
    default: 0,
  }),
  lounge: atom({
    key: counter.count,
    default: [] as T_Lounge[],
  }),
  talk: atom({
    key: counter.count,
    default: [] as T_Talk[],
  }),
  room: atom({
    key: counter.count,
    default: [] as T_Room[],
  }),
};
