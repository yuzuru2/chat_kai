import * as Express from 'express';

export interface custom_request extends Express.Request {
  query: {
    uid: string;
    uname: string;
    icon: string;
    rid: string;
    place: string;
  };
}
