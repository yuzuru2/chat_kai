import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { State } from '../recoil';
import { Header } from '../components/room/header';
import { useRoomHooks } from '../hooks/room';
import { Loading } from '../components/loading';
import { Constant } from '../constant';
import { T_Talk, T_Room } from '../types';
import { Section } from '../components/room/section';
import { DetailModal } from '../components/room/detailModal';
import { firebase } from '../firebase';
import { uid } from '../';

import { Exact, TalkQuery } from '../types';
import { ApolloQueryResult } from '@apollo/client';

let rid = '';

const firebase_event = (
  refetch: (
    variables?:
      | Partial<
          Exact<{
            [key: string]: never;
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<TalkQuery>>
) => {
  firebase
    .database()
    .ref(Constant.firebase_databases.broadcast)
    .child(rid)
    .limitToLast(1)
    .on('value', snapshot => {
      if (!snapshot.exists()) {
        return;
      }

      refetch();
    });

  firebase
    .database()
    .ref(Constant.firebase_databases.broadcast)
    .child(uid)
    .limitToLast(1)
    .on('value', snapshot => {
      if (!snapshot.exists()) {
        return;
      }

      const val: { [key: string]: { b: string } } = snapshot.val();
      const key = Object.keys(val)[0];

      if (val[key].b === 'exit') {
        alert('退室しました');
        window.location.href = `/${Constant.place.lounge}`;
        return;
      }

      if (val[key].b === 't') {
        alert('追放されました');
        window.location.reload();
        return;
      }

      refetch();
    });
};

export const Room = () => {
  const history = useHistory();
  const [global_loading, setGlobalLoading] = useRecoilState(State.loading);
  const { data, loading, refetch } = useRoomHooks();
  const [, setTalk] = useRecoilState(State.talk);
  const [room, setRoom] = useRecoilState(State.room);

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

    setTalk(data.talk.talk as T_Talk[]);
    setRoom(data.talk.info as T_Room[]);

    if (data.talk.info != null && data.talk.info[0] != null) {
      if (rid.length === 0) {
        rid = data.talk.info[0].rid as string;
        firebase_event(refetch);
      }
    }
  }, [data, history, setTalk, setRoom, refetch]);

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

  if (room.length === 0) {
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
