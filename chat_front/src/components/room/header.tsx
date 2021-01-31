import React from 'react';
import { useRecoilState } from 'recoil';
import { useRoomHooks } from '../../hooks/room';
import { State } from '../../recoil';

export const Header = () => {
  const { exit_room } = useRoomHooks();
  const [, setGlobalLoading] = useRecoilState(State.loading);

  return (
    <>
      <header>
        <div className="clearfix">
          <div className="float-start">
            <button
              type="button"
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#detailGroup"
            >
              グループ詳細
            </button>
          </div>

          <div className="float-end">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                if (window.confirm('退室しますか?')) {
                  setGlobalLoading(true);
                  exit_room();
                }
              }}
            >
              退室
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
