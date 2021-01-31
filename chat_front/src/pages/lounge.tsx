import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Header } from '../components/lounge/header';
import { useLoungeHooks } from '../hooks/lounge';
import { Loading } from '../components/loading';
import { Constant } from '../constant';
import { Section } from '../components/lounge/section';
import { State } from '../recoil';
import { T_Lounge } from '../types';
import { firebase } from '../firebase';
import { uid } from '../';

export const Lounge = () => {
  const [global_loading, setGlobalLoading] = useRecoilState(State.loading);
  const history = useHistory();
  const { data, loading } = useLoungeHooks();
  const [, setLounge] = useRecoilState(State.lounge);

  React.useEffect(() => {
    if (data?.lounge == null) {
      return;
    }

    if (data.lounge.url !== Constant.place.lounge) {
      data.lounge.url === Constant.place.root
        ? history.push('/')
        : history.push(`/${Constant.place.room}`);
    }

    setLounge(data.lounge.lounge as T_Lounge[]);
  }, [data, history, setLounge]);

  React.useEffect(() => {
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

        if (val[key].b === 'join') {
          window.location.href = `/${Constant.place.room}`;
          return;
        }
      });
  }, [history]);

  React.useEffect(() => {
    return () => {
      setGlobalLoading(false);
    };
  }, [setGlobalLoading]);

  if (loading) {
    return <Loading />;
  }

  if (data?.lounge?.url !== Constant.place.lounge) {
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
    </>
  );
};
