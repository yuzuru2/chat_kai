import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { Header } from '../components/room/header';
import { useRoomHooks, useRoomFireBase } from '../hooks/room';
import { Loading } from '../components/loading';
import { Section } from '../components/room/section';
import { DetailModal } from '../components/room/detailModal';

import { State } from '../recoil';
import { Constant } from '../constant';

import { T_Talk } from '../types';

export const Room = () => {
  const [uid] = useRecoilState(State.uid);
  const [global_loading, setGlobalLoading] = useRecoilState(State.loading);
  const [, setTalk] = useRecoilState(State.talk);

  const history = useHistory();

  const { init } = useRoomFireBase();
  const { data, loading, refetch } = useRoomHooks();

  React.useEffect(() => {
    if (data?.talk == null) {
      return;
    }

    if (data.talk.url !== Constant.place.room) {
      data.talk.url === Constant.place.root
        ? history.push('/')
        : history.push(`/${Constant.place.lounge}`);
      return;
    }

    if (data.talk.info != null && data.talk.info[0] != null) {
      const rid = data.talk.info[0].rid as string;
      init(refetch, rid);
    }
  }, [uid, data, history, refetch, init, setTalk]);

  React.useEffect(() => {
    if (data?.talk?.talk == null) {
      return;
    }

    setTalk(data.talk.talk as T_Talk[]);
  }, [data?.talk?.talk, setTalk]);

  React.useEffect(() => {
    return () => {
      setGlobalLoading(false);
    };
  }, [setGlobalLoading]);

  if (loading) {
    return <Loading />;
  }

  if (data?.talk?.url !== Constant.place.room) {
    return <Loading />;
  }

  if (data?.talk?.info?.length === 0) {
    return <Loading />;
  }

  if (global_loading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <hr />

      <main>
        <div className="row">
          <article className="col-xs-12 col-sm-12 col-md-12 col-lg-9 col-xl-9">
            <Section />
          </article>
          <aside className="col-xs-0 col-sm-0 col-md-0 col-lg-3 col-xl-3">
            <div className="card" style={{ width: '90%', height: 1000 }}>
              広告スペース
            </div>
          </aside>
        </div>
      </main>

      <DetailModal />
    </>
  );
};
