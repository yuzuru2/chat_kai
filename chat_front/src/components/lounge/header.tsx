import React from 'react';
import { useRecoilState } from 'recoil';
import { Constant } from '../../constant';
import { useLoungeHooks } from '../../hooks/lounge';
import { State } from '../../recoil';

export const Header = () => {
  const { logout } = useLoungeHooks();
  const [, setGlobalLoading] = useRecoilState(State.loading);

  return (
    <>
      <header>
        <div className="clearfix">
          <div className="float-start">
            <h1 style={{ fontSize: 25 }}>{Constant.title}</h1>
          </div>
          <div className="float-end">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                if (window.confirm('ログアウトしますか?')) {
                  setGlobalLoading(true);
                  logout();
                }
              }}
            >
              ログアウト
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
