import React from 'react';
import * as _ from 'lodash';
import moment from 'moment';
import { useRecoilState } from 'recoil';

import { T_Talk } from '../../types';
import { State } from '../../recoil';

moment.locale('ja');

const reactStringReplace = require('react-string-replace');

type T_Data = {
  createdAt: number;
  icon: number;
  kind: number;
  message: string;
  uid: string;
  uname: string;
};

const left = (data: T_Data) => {
  return (
    <div>
      <div style={{ fontSize: 12, color: '#fff' }}>{data.uname}</div>
      <div style={{ fontSize: 12, color: '#fff' }}>{data.uid}</div>
      <div className="clearfix">
        <div className="float-start">
          <img src={`/img/${data.icon}.png`} alt="" width="40" />
        </div>
        <div className="balloon1 float-start">
          {data.kind === 0 ? (
            reactStringReplace(
              data.message,
              /(https?:\/\/\S+)/g,
              (match: string, j: number) => (
                <a
                  href={match}
                  key={match + j}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {match}
                </a>
              )
            )
          ) : (
            <img src={data.message} alt="画像" width="100%" />
          )}
        </div>
      </div>
      <div className="clearfix">
        <div className="float-start">
          <time style={{ fontSize: 12 }}>
            {moment(new Date(data.createdAt)).format('YYYY-MM-DD HH:mm:ss')}
          </time>
        </div>
      </div>
    </div>
  );
};

const right = (data: T_Data) => {
  return (
    <div>
      <div className="clearfix">
        <div className="float-end">
          <div style={{ fontSize: 12, color: '#fff' }}>{data.uname}</div>
          <div style={{ fontSize: 12, color: '#fff' }}>{data.uid}</div>
        </div>
      </div>
      <div className="clearfix">
        <div className="balloon2 float-end">
          {data.kind === 0 ? (
            reactStringReplace(
              data.message,
              /(https?:\/\/\S+)/g,
              (match: string, j: number) => (
                <a
                  href={match}
                  key={match + j}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {match}
                </a>
              )
            )
          ) : (
            <img src={data.message} alt="画像" width="100%" />
          )}
        </div>
      </div>
      <div className="clearfix">
        <div className="float-end">
          <time style={{ fontSize: 12 }}>
            {moment(new Date(data.createdAt)).format('YYYY-MM-DD HH:mm:ss')}
          </time>
        </div>
      </div>
    </div>
  );
};

export const Talk = (params: { talk: T_Talk[] }) => {
  const [uid] = useRecoilState(State.uid);

  return React.useMemo(() => {
    const data = _.orderBy(
      params.talk.map(m => {
        return {
          createdAt: Number(m.createdAt),
          icon: m.icon,
          kind: m.kind,
          message: m.message,
          uid: m.uid,
          uname: m.uname,
        };
      }),
      'createdAt',
      'desc'
    ) as T_Data[];

    const html = data.map((m, i) => {
      if (m.kind === 2) {
        return (
          <div className="text-center" key={i}>
            <p style={{ fontSize: 15 }}>{m.message}</p>
          </div>
        );
      }

      if (m.uid === uid) {
        return <div key={i}>{right(m)}</div>;
      }

      return <div key={i}>{left(m)}</div>;
    });

    return <>{html}</>;
  }, [params.talk, uid]);
};
