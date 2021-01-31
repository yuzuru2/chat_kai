import React from 'react';
import * as _ from 'lodash';
import { useRecoilState } from 'recoil';
import { useLoungeHooks } from '../../hooks/lounge';
import { State } from '../../recoil';
import { MemberModal } from './memberModal';

export const Info = () => {
  const [lounge] = useRecoilState(State.lounge);
  const [, setGlobalLoading] = useRecoilState(State.loading);
  const { join_room } = useLoungeHooks();

  return React.useMemo(() => {
    const tmp = _.orderBy(
      lounge.map(m => {
        return {
          ...m,
          rid: m.rid as string,
          createdAt: Number(m.createdAt),
        };
      }),
      'createdAt',
      'desc'
    );

    const list = _.sortBy(_.groupBy(tmp, 'rid'), item => -item[0]['rid']);

    return (
      <div style={{ maxWidth: 500, margin: '0 auto' }}>
        {list.map((m, i) => {
          return (
            <div key={i}>
              <ul style={{ padding: 5 }}>
                <li className="list-group-item text-center">{m[0].rname}</li>
                <li className="list-group-item text-center">
                  現在数: {m.length} &nbsp;&nbsp;上限数: {m[0].limit}
                </li>
                <li className="list-group-item text-center">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-toggle="modal"
                    data-bs-target={`#memberModal${i}`}
                  >
                    メンバ
                  </button>
                </li>

                {Number(m[0].limit) > m.length && (
                  <li className="list-group-item text-center">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        if (window.confirm('入室しますか?')) {
                          setGlobalLoading(true);
                          join_room({ variables: { rid: m[0].rid } });
                        }
                      }}
                    >
                      入室する
                    </button>
                  </li>
                )}
              </ul>

              <MemberModal data={m} num={i} />
            </div>
          );
        })}
      </div>
    );
  }, [lounge, join_room, setGlobalLoading]);
};
